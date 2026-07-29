import rateLimit from 'express-rate-limit'

// Strict rate limit for authentication endpoints (login, register, reset password, 2FA)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // 15 attempts per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many authentication attempts from this IP address. Please try again after 15 minutes.',
  },
})

// Rate limit for file upload endpoints
export const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 file uploads per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'File upload quota exceeded for this IP. Please try again later.',
  },
})

// Standard API rate limiter
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300, // 300 API requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Rate limit exceeded. Please slow down your requests.',
  },
})
