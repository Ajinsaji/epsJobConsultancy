import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { RefreshToken } from '../models/RefreshToken.js'
import { Session } from '../models/Session.js'
import { parseUserAgent } from '../utils/deviceParser.js'

const ACCESS_TOKEN_EXPIRY = '15m'
const REFRESH_TOKEN_EXPIRY_DAYS = 7

/**
 * Sign short-lived Access Token (JWT)
 */
export function generateAccessToken(user) {
  const payload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  }

  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_jwt_secret', {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })
}

/**
 * Generate Refresh Token, save to DB with family UUID & active Session
 */
export async function createRefreshToken(user, family = null, req = null) {
  const tokenString = crypto.randomBytes(40).toString('hex')
  const tokenFamily = family || crypto.randomUUID()
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

  const ipAddress = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || req?.ip || '0.0.0.0'
  const rawUserAgent = req?.headers['user-agent'] || 'Unknown'
  const { browser, os, deviceType } = parseUserAgent(rawUserAgent)

  const refreshToken = await RefreshToken.create({
    userId: user._id,
    token: tokenString,
    family: tokenFamily,
    isRevoked: false,
    expiresAt,
    ipAddress,
    userAgent: rawUserAgent,
  })

  const sessionId = crypto.randomUUID()
  await Session.create({
    userId: user._id,
    sessionId,
    refreshToken: tokenString,
    ipAddress,
    userAgent: rawUserAgent,
    deviceType,
    browser,
    os,
    lastActivity: new Date(),
    expiresAt,
    isRevoked: false,
  })

  return {
    token: refreshToken.token,
    family: refreshToken.family,
    sessionId,
    expiresAt: refreshToken.expiresAt,
  }
}

/**
 * Rotate Refresh Token with Family Revocation on Breach
 */
export async function rotateRefreshToken(tokenString, req = null) {
  const existingToken = await RefreshToken.findOne({ token: tokenString }).populate('userId')

  if (!existingToken) {
    throw new Error('Invalid refresh token')
  }

  if (existingToken.isRevoked) {
    await RefreshToken.updateMany({ family: existingToken.family }, { isRevoked: true })
    await Session.updateMany({ userId: existingToken.userId }, { isRevoked: true })
    throw new Error('Refresh token reuse detected! All active sessions revoked for security.')
  }

  if (existingToken.expiresAt < new Date()) {
    existingToken.isRevoked = true
    await existingToken.save()
    await Session.updateOne({ refreshToken: tokenString }, { isRevoked: true })
    throw new Error('Refresh token expired')
  }

  existingToken.isRevoked = true
  await existingToken.save()
  await Session.updateOne({ refreshToken: tokenString }, { isRevoked: true })

  const newAccessToken = generateAccessToken(existingToken.userId)
  const newRefreshTokenObj = await createRefreshToken(existingToken.userId, existingToken.family, req)

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshTokenObj.token,
    user: existingToken.userId,
  }
}

/**
 * Revoke specific refresh token or all user tokens/sessions
 */
export async function revokeUserTokens(userId, tokenString = null) {
  if (tokenString) {
    await RefreshToken.updateOne({ token: tokenString }, { isRevoked: true })
    await Session.updateOne({ refreshToken: tokenString }, { isRevoked: true })
  } else if (userId) {
    await RefreshToken.updateMany({ userId }, { isRevoked: true })
    await Session.updateMany({ userId }, { isRevoked: true })
  }
}

/**
 * List active user sessions
 */
export async function getUserSessions(userId) {
  return await Session.find({ userId, isRevoked: false, expiresAt: { $gt: new Date() } }).sort({ lastActivity: -1 })
}

/**
 * Revoke specific session by ID
 */
export async function revokeSessionById(userId, sessionId) {
  const session = await Session.findOne({ userId, sessionId })
  if (session) {
    session.isRevoked = true
    await session.save()
    await RefreshToken.updateOne({ token: session.refreshToken }, { isRevoked: true })
  }
}

/**
 * Set HTTP-Only Refresh Token Cookie
 */
export function setRefreshTokenCookie(res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  })
}

/**
 * Clear Refresh Token Cookie
 */
export function clearRefreshTokenCookie(res) {
  res.cookie('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
  })
}
