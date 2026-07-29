import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import xss from 'xss-clean'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'

import { errorHandler } from './middleware/errorHandler.js'

import { authRoutes } from './routes/authRoutes.js'
import { meRoutes } from './routes/meRoutes.js'


import { candidateRoutes } from './routes/candidateRoutes.js'
import { savedJobRoutes } from './routes/savedJobRoutes.js'
import { resumeRoutes } from './routes/resumeRoutes.js'

import { companyRoutes } from './routes/companyRoutes.js'
import { jobRoutes } from './routes/jobRoutes.js'
import { applicationRoutes } from './routes/applicationRoutes.js'

import { interviewRoutes } from './routes/interviewRoutes.js'
import { feedbackRoutes } from './routes/feedbackRoutes.js'
import { notificationRoutes } from './routes/notificationRoutes.js'
import { adminRoutes } from './routes/adminRoutes.js'
import { publicRoutes } from './routes/publicRoutes.js'
import { analyticsRoutes } from './routes/analyticsRoutes.js'
import { placementRoutes } from './routes/placementRoutes.js'
import { blogRoutes } from './routes/blogRoutes.js'
import { aiRoutes } from './routes/aiRoutes.js'
import { paymentRoutes } from './routes/paymentRoutes.js'
import employerCommunicationRoutes from './routes/employerCommunicationRoutes.js'
import { uploadRoutes } from './routes/uploadRoutes.js'
import { searchRoutes } from './routes/searchRoutes.js'
import { communicationRoutes } from './routes/communicationRoutes.js'



dotenv.config()


const app = express()

// Cookie Parser for HttpOnly refresh tokens
app.use(cookieParser())

// Enhanced Security HTTP headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'", 'http://localhost:5000', 'http://localhost:5173'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

import mongoSanitize from 'express-mongo-sanitize'
// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// CORS (configurable via env)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
)

// Logging
app.use(morgan('dev'))

// Body parsing
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/health', (req, res) => {
  res.json({ ok: true })
})

// Legacy routes (Temporary compatibility)
app.use('/api/auth', authRoutes)
app.use('/api/auth/me', meRoutes)
app.use('/api/candidates', candidateRoutes)
app.use('/api/saved-jobs', savedJobRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/interviews', interviewRoutes)
app.use('/api/placements', placementRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/companies', employerCommunicationRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/public', publicRoutes)

// v1 API Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/auth/me', meRoutes)
app.use('/api/v1/candidates', candidateRoutes)
app.use('/api/v1/saved-jobs', savedJobRoutes)
app.use('/api/v1/resume', resumeRoutes)
app.use('/api/v1/companies', companyRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/applications', applicationRoutes)
app.use('/api/v1/interviews', interviewRoutes)
app.use('/api/v1/placements', placementRoutes)
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/ai', aiRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1/companies', employerCommunicationRoutes)
app.use('/api/v1/feedback', feedbackRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/public', publicRoutes)
app.use('/api/v1/uploads', uploadRoutes)
app.use('/api/v1/search', searchRoutes)
app.use('/api/v1/communication', communicationRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})


// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Server failed to start:', err)
  process.exit(1)
})

