import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { validationResult } from 'express-validator'

import { User } from '../models/User.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'

import { signToken } from '../utils/generateToken.js'
import { apiResponse } from '../utils/apiResponse.js'
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from '../services/emailService.js'

/**
 * Register a new user.
 * - Creates User document with verification tokens
 * - Creates role-specific profile collections
 * - Sends verification email
 */
export async function register(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const { name, email, phone, password, role } = req.body

    const exists = await User.findOne({ email })
    if (exists) return apiResponse({ res, status: 409, message: 'Email already registered' })

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
      status: 'Active',
    })

    // Create role profile
    if (role === 'candidate') {
      await Candidate.create({ userId: user._id })
    } else if (role === 'company') {
      await Company.create({ userId: user._id, companyName: user.name })
    }

    // Send verification email
    await sendVerificationEmail(user, verificationToken)

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
      return apiResponse({ res, status: 400, message: 'Invalid or expired verification token' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationExpires = undefined
    await user.save()

    // Send welcome email
    await sendWelcomeEmail(user)

    return apiResponse({ res, status: 200, message: 'Email verified successfully. You can now log in.' })
  } catch (err) {
    return next(err)
  }
}

/**
 * Login handler
 */
export async function login(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return apiResponse({ res, status: 401, message: 'Invalid credentials' })

    // Check status
    if (user.status === 'Suspended') {
      return apiResponse({ res, status: 403, message: 'Your account has been suspended. Contact support.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return apiResponse({ res, status: 401, message: 'Invalid credentials' })

    // Enforce email verification (optional bypass in dev environment if configured)
    if (!user.isVerified) {
      return res.status(403).json({
        message: 'Please verify your email before logging in.',
        isVerified: false,
        email: user.email,
      })
    }

    // Update lastLogin if applicable
    user.lastLogin = new Date()
    await user.save()

    const token = signToken(user)

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export async function logout(req, res) {
  return apiResponse({ res, status: 200, message: 'Logged out' })
}

export async function getCurrentUser(req, res) {
  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status,
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
    // Return success to avoid email enumeration attacks, but send email only if user exists
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
 * Reset Password using Token
 */
export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return apiResponse({ res, status: 400, message: 'Token and new password are required' })
    }

    if (password.length < 6) {
      return apiResponse({ res, status: 400, message: 'Password must be at least 6 characters long' })
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return apiResponse({ res, status: 400, message: 'Invalid or expired reset token' })
    }

    user.password = await bcrypt.hash(password, 12)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return apiResponse({ res, status: 200, message: 'Password reset successful. You can now log in.' })
  } catch (err) {
    return next(err)
  }
}
