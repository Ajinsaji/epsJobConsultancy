import express from 'express'
import { body } from 'express-validator'

import {
  register,
  login,
  logout,
  refreshTokenHandler,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationToken,
  setup2FA,
  verify2FA,
  disable2FA,
  getUserSessionsHandler,
  revokeSessionHandler,
  revokeAllSessionsHandler,
} from '../controllers/authController.js'
import { authenticate } from '../middleware/authMiddleware.js'
import { authRateLimiter } from '../middleware/rateLimiters.js'

export const authRoutes = express.Router()

authRoutes.post(
  '/register',
  authRateLimiter,
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('phone').optional().isString(),
    body('password').isLength({ min: 8 }),
    body('role').isIn(['candidate', 'company', 'recruiter', 'eps_admin', 'super_admin', 'developer']),
  ],
  register,
)

authRoutes.post(
  '/login',
  authRateLimiter,
  [
    body('email').isEmail(),
    body('password').isString().notEmpty(),
    body('totpCode').optional().isString(),
  ],
  login,
)

authRoutes.post('/refresh-token', refreshTokenHandler)
authRoutes.post('/logout', logout)

authRoutes.post('/forgot-password', authRateLimiter, [body('email').isEmail()], forgotPassword)
authRoutes.post('/reset-password', authRateLimiter, resetPassword)
authRoutes.post('/verify-email', verifyEmail)
authRoutes.post('/resend-verification', authRateLimiter, [body('email').isEmail()], resendVerificationToken)

// Authenticated 2FA Management Endpoints
authRoutes.post('/2fa/setup', authenticate, setup2FA)
authRoutes.post('/2fa/verify', authenticate, [body('code').isString().notEmpty()], verify2FA)
authRoutes.post('/2fa/disable', authenticate, [body('password').isString(), body('code').isString()], disable2FA)

// Authenticated Session Management Endpoints
authRoutes.get('/sessions', authenticate, getUserSessionsHandler)
authRoutes.delete('/sessions/:sessionId', authenticate, revokeSessionHandler)
authRoutes.delete('/sessions', authenticate, revokeAllSessionsHandler)
