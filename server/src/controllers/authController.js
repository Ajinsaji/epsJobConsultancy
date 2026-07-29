import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { validationResult } from 'express-validator'

import { User } from '../models/User.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'
import { PasswordHistory } from '../models/PasswordHistory.js'

import { signToken } from '../utils/generateToken.js'
import { apiResponse } from '../utils/apiResponse.js'
import { validatePasswordPolicy } from '../utils/passwordPolicy.js'
import {
  generateTOTPSecret,
  generateTOTPToken,
  verifyTOTPToken,
  generateOTPAuthURL,
  generateBackupCodes,
} from '../utils/totp.js'
import {
  generateAccessToken,
  createRefreshToken,
  rotateRefreshToken,
  revokeUserTokens,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../services/securityTokenService.js'
import { logAuditEvent } from '../middleware/auditMiddleware.js'

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from '../services/emailService.js'

/**
 * Register a new user.
 * Includes password policy check & audit log.
 */
export async function register(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const { name, email, phone, password, role } = req.body

    const policyCheck = validatePasswordPolicy(password)
    if (!policyCheck.isValid) {
      return res.status(400).json({
        message: 'Password does not meet enterprise security requirements',
        errors: policyCheck.errors,
      })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      await logAuditEvent({ action: 'REGISTER_FAILED', category: 'SECURITY', status: 'FAILURE', req, details: { email, reason: 'Duplicate email' } })
      return apiResponse({ res, status: 409, message: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    const user = await User.create({
      name,
      email,
      phone,
      password: passwordHash,
      role,
      isVerified: false,
      verificationToken,
      verificationExpires,
      passwordChangedAt: new Date(),
      status: 'Active',
    })

    // Store in password history
    await PasswordHistory.create({ userId: user._id, passwordHash })

    // Create role profile
    if (role === 'candidate') {
      await Candidate.create({ userId: user._id })
    } else if (role === 'company') {
      await Company.create({ userId: user._id, companyName: user.name })
    }

    // Send verification email
    await sendVerificationEmail(user, verificationToken)

    await logAuditEvent({ userId: user._id, action: 'USER_REGISTERED', category: 'SECURITY', status: 'SUCCESS', req, details: { role } })

    return apiResponse({
      res,
      status: 201,
      message: 'Registration successful. Please check your email to verify your account.',
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Verify User Email via Token
 */
export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.body

    if (!token) {
      return apiResponse({ res, status: 400, message: 'Verification token is required' })
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
    })

    if (!user) {
      await logAuditEvent({ action: 'EMAIL_VERIFICATION_FAILED', category: 'SECURITY', status: 'FAILURE', req })
      return apiResponse({ res, status: 400, message: 'Invalid or expired verification token' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationExpires = undefined
    await user.save()

    await sendWelcomeEmail(user)
    await logAuditEvent({ userId: user._id, action: 'EMAIL_VERIFIED', category: 'SECURITY', status: 'SUCCESS', req })

    return apiResponse({ res, status: 200, message: 'Email verified successfully. You can now log in.' })
  } catch (err) {
    return next(err)
  }
}

/**
 * Resend Email Verification Token
 */
export async function resendVerificationToken(req, res, next) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return apiResponse({ res, status: 200, message: 'If account exists, verification email has been resent.' })
    }

    if (user.isVerified) {
      return apiResponse({ res, status: 400, message: 'Account is already verified.' })
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')
    user.verificationToken = verificationToken
    user.verificationExpires = Date.now() + 24 * 60 * 60 * 1000
    await user.save()

    await sendVerificationEmail(user, verificationToken)

    return apiResponse({ res, status: 200, message: 'Verification email resent.' })
  } catch (err) {
    return next(err)
  }
}

/**
 * Login handler with 2FA Challenge support & Refresh Token Rotation
 */
export async function login(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const { email, password, totpCode } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      await logAuditEvent({ action: 'LOGIN_FAILED', category: 'SECURITY', status: 'FAILURE', req, details: { email, reason: 'User not found' } })
      return apiResponse({ res, status: 401, message: 'Invalid credentials' })
    }

    if (user.status === 'Suspended') {
      await logAuditEvent({ userId: user._id, action: 'LOGIN_SUSPENDED', category: 'SECURITY', status: 'FAILURE', req })
      return apiResponse({ res, status: 403, message: 'Your account has been suspended. Contact support.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      await logAuditEvent({ userId: user._id, action: 'LOGIN_FAILED', category: 'SECURITY', status: 'FAILURE', req, details: { reason: 'Incorrect password' } })
      return apiResponse({ res, status: 401, message: 'Invalid credentials' })
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: 'Please verify your email before logging in.',
        isVerified: false,
        email: user.email,
      })
    }

    // 2FA Challenge Check
    if (user.twoFactorEnabled) {
      if (!totpCode) {
        return res.status(200).json({
          requires2FA: true,
          message: 'Two-Factor Authentication is enabled. Please enter your 6-digit TOTP code.',
        })
      }

      const isValid2FA = verifyTOTPToken(user.twoFactorSecret, totpCode)
      if (!isValid2FA) {
        // Check backup codes
        const isBackupCode = user.twoFactorBackupCodes.includes(totpCode.toUpperCase())
        if (!isBackupCode) {
          await logAuditEvent({ userId: user._id, action: '2FA_VERIFY_FAILED', category: 'SECURITY', status: 'FAILURE', req })
          return apiResponse({ res, status: 401, message: 'Invalid Two-Factor Authentication code' })
        }
        // Consume backup code
        user.twoFactorBackupCodes = user.twoFactorBackupCodes.filter((c) => c !== totpCode.toUpperCase())
        await user.save()
      }
    }

    // Update last login metrics
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip || ''
    user.lastLogin = new Date()
    user.lastLoginIp = ipAddress
    await user.save()

    // Generate dual tokens
    const accessToken = generateAccessToken(user)
    const refreshTokenObj = await createRefreshToken(user, null, req)

    // Set Refresh Token in HttpOnly cookie
    setRefreshTokenCookie(res, refreshTokenObj.token)

    await logAuditEvent({ userId: user._id, action: 'AUTH_LOGIN_SUCCESS', category: 'SECURITY', status: 'SUCCESS', req })

    // Return backwards-compatible payload (token = accessToken)
    return res.json({
      token: accessToken,
      accessToken,
      refreshToken: refreshTokenObj.token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Handle Refresh Access Token endpoint
 */
export async function refreshTokenHandler(req, res, next) {
  try {
    const tokenString = req.cookies?.refreshToken || req.body?.refreshToken

    if (!tokenString) {
      return res.status(401).json({ message: 'Refresh token missing' })
    }

    const { accessToken, refreshToken: newRefreshToken, user } = await rotateRefreshToken(tokenString, req)
    setRefreshTokenCookie(res, newRefreshToken)

    return res.json({
      token: accessToken,
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    clearRefreshTokenCookie(res)
    return res.status(401).json({ message: err.message || 'Invalid or expired refresh token' })
  }
}

/**
 * Handle Logout
 */
export async function logout(req, res) {
  const tokenString = req.cookies?.refreshToken || req.body?.refreshToken
  if (tokenString) {
    await revokeUserTokens(null, tokenString)
  }
  if (req.user?._id) {
    await revokeUserTokens(req.user._id)
    await logAuditEvent({ userId: req.user._id, action: 'AUTH_LOGOUT', category: 'SECURITY', status: 'SUCCESS', req })
  }
  clearRefreshTokenCookie(res)
  return apiResponse({ res, status: 200, message: 'Logged out successfully' })
}

/**
 * Setup 2FA Handler (Generates Secret and OTPAuth URL)
 */
export async function setup2FA(req, res, next) {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return apiResponse({ res, status: 404, message: 'User not found' })

    const secret = generateTOTPSecret()
    user.twoFactorSecret = secret
    await user.save()

    const otpAuthUrl = generateOTPAuthURL({ label: user.email, secret })

    return res.json({
      secret,
      otpAuthUrl,
      message: 'Scan the OTPAuth URL with Google Authenticator or your 2FA application.',
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Verify & Enable 2FA Handler
 */
export async function verify2FA(req, res, next) {
  try {
    const { code } = req.body
    const user = await User.findById(req.user._id)

    if (!user || !user.twoFactorSecret) {
      return apiResponse({ res, status: 400, message: '2FA setup was not initiated' })
    }

    const isValid = verifyTOTPToken(user.twoFactorSecret, code)
    if (!isValid) {
      return apiResponse({ res, status: 400, message: 'Invalid 2FA code' })
    }

    const backupCodes = generateBackupCodes()
    user.twoFactorEnabled = true
    user.twoFactorBackupCodes = backupCodes
    await user.save()

    await logAuditEvent({ userId: user._id, action: '2FA_ENABLED', category: 'SECURITY', status: 'SUCCESS', req })

    return res.json({
      message: 'Two-Factor Authentication enabled successfully.',
      backupCodes,
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Disable 2FA Handler
 */
export async function disable2FA(req, res, next) {
  try {
    const { password, code } = req.body
    const user = await User.findById(req.user._id)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return apiResponse({ res, status: 401, message: 'Invalid password' })
    }

    const isValid = verifyTOTPToken(user.twoFactorSecret, code)
    if (!isValid) {
      return apiResponse({ res, status: 400, message: 'Invalid 2FA code' })
    }

    user.twoFactorEnabled = false
    user.twoFactorSecret = undefined
    user.twoFactorBackupCodes = []
    await user.save()

    await logAuditEvent({ userId: user._id, action: '2FA_DISABLED', category: 'SECURITY', status: 'SUCCESS', req })

    return apiResponse({ res, status: 200, message: 'Two-Factor Authentication disabled.' })
  } catch (err) {
    return next(err)
  }
}

export async function getCurrentUser(req, res) {
  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status,
      twoFactorEnabled: req.user.twoFactorEnabled,
    },
  })
}

/**
 * Request Password Reset
 */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return apiResponse({
        res,
        status: 200,
        message: 'If account exists, password reset instructions have been sent.',
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000 // 1 hour
    await user.save()

    await sendPasswordResetEmail(user, resetToken)
    await logAuditEvent({ userId: user._id, action: 'PASSWORD_RESET_REQUESTED', category: 'SECURITY', status: 'SUCCESS', req })

    return apiResponse({
      res,
      status: 200,
      message: 'If account exists, password reset instructions have been sent.',
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Reset Password using Token (with Password History & Policy check)
 */
export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return apiResponse({ res, status: 400, message: 'Token and new password are required' })
    }

    const policyCheck = validatePasswordPolicy(password)
    if (!policyCheck.isValid) {
      return res.status(400).json({
        message: 'Password does not meet enterprise security requirements',
        errors: policyCheck.errors,
      })
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return apiResponse({ res, status: 400, message: 'Invalid or expired reset token' })
    }

    // Check last 5 passwords history
    const pastPasswords = await PasswordHistory.find({ userId: user._id }).sort({ createdAt: -1 }).limit(5)
    for (const record of pastPasswords) {
      const matchesPast = await bcrypt.compare(password, record.passwordHash)
      if (matchesPast) {
        return res.status(400).json({
          message: 'You cannot reuse one of your last 5 passwords. Please choose a new password.',
        })
      }
    }

    const passwordHash = await bcrypt.hash(password, 12)
    user.password = passwordHash
    user.passwordChangedAt = new Date()
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    // Store in history
    await PasswordHistory.create({ userId: user._id, passwordHash })

    // Revoke existing sessions upon password reset
    await revokeUserTokens(user._id)

    await logAuditEvent({ userId: user._id, action: 'PASSWORD_RESET_SUCCESS', category: 'SECURITY', status: 'SUCCESS', req })

    return apiResponse({ res, status: 200, message: 'Password reset successful. You can now log in.' })
  } catch (err) {
    return next(err)
  }
}

/**
 * Get active user sessions
 */
export async function getUserSessionsHandler(req, res, next) {
  try {
    const { getUserSessions } = await import('../services/securityTokenService.js')
    const sessions = await getUserSessions(req.user._id)
    return res.json({ sessions })
  } catch (err) {
    return next(err)
  }
}

/**
 * Revoke specific session by ID
 */
export async function revokeSessionHandler(req, res, next) {
  try {
    const { sessionId } = req.params
    const { revokeSessionById } = await import('../services/securityTokenService.js')
    await revokeSessionById(req.user._id, sessionId)
    await logAuditEvent({ userId: req.user._id, action: 'SESSION_REVOKED', category: 'SECURITY', status: 'SUCCESS', req, details: { sessionId } })
    return apiResponse({ res, status: 200, message: 'Session revoked successfully' })
  } catch (err) {
    return next(err)
  }
}

/**
 * Revoke all active sessions (Logout all devices)
 */
export async function revokeAllSessionsHandler(req, res, next) {
  try {
    await revokeUserTokens(req.user._id)
    clearRefreshTokenCookie(res)
    await logAuditEvent({ userId: req.user._id, action: 'ALL_SESSIONS_REVOKED', category: 'SECURITY', status: 'SUCCESS', req })
    return apiResponse({ res, status: 200, message: 'All active sessions revoked across all devices' })
  } catch (err) {
    return next(err)
  }
}

