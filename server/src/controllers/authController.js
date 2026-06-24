import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

import { User } from '../models/User.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'

import { signToken } from '../utils/generateToken.js'
import { apiResponse } from '../utils/apiResponse.js'

/**
 * Register a new user.
 * - Creates User document
 * - Creates role-specific profile collections
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

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      phone,
      password: passwordHash,
      role,
      isVerified: false,
      status: 'Active',
    })

    // Create role profile
    if (role === 'candidate') {
      await Candidate.create({ userId: user._id })
    }

    if (role === 'company') {
      await Company.create({ userId: user._id, companyName: user.name })
    }

    return apiResponse({ res, status: 201, message: 'Registered successfully' })
  } catch (err) {
    return next(err)
  }
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return apiResponse({ res, status: 401, message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return apiResponse({ res, status: 401, message: 'Invalid credentials' })

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

export async function forgotPassword(req, res) {
  return apiResponse({ res, status: 200, message: 'If account exists, reset instructions will be sent.' })
}

export async function resetPassword(req, res) {
  return apiResponse({ res, status: 200, message: 'Password reset (scaffold).' })
}

