import express from 'express'
import { body } from 'express-validator'

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from '../controllers/authController.js'

export const authRoutes = express.Router()

authRoutes.post(
  '/register',
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('phone').optional().isString(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['candidate', 'company']), // Allow company registration too if role validation exists
  ],
  register,
)


authRoutes.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isString().notEmpty(),
  ],
  login,
)

authRoutes.post('/logout', logout)

authRoutes.post('/forgot-password', [body('email').isEmail()], forgotPassword)

authRoutes.post('/reset-password', resetPassword)

authRoutes.post('/verify-email', verifyEmail)

