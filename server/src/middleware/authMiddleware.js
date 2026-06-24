import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

/**
 * JWT authentication middleware.
 * Attaches req.user.
 */
export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing authorization token' })
    }

    const token = header.split(' ')[1]

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // payload should contain userId
    const user = await User.findById(payload.userId).select('-password')
    if (!user) return res.status(401).json({ message: 'Invalid token user' })

    req.user = user
    return next()
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

/**
 * Role-based authorization middleware.
 */
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' })
    }

    return next()
  }
}

