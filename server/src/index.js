import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'

import { errorHandler } from './middleware/errorHandler.js'

import { authRoutes } from './routes/authRoutes.js'
import { meRoutes } from './routes/meRoutes.js'


import { candidateRoutes } from './routes/candidateRoutes.js'

import { companyRoutes } from './routes/companyRoutes.js'
import { jobRoutes } from './routes/jobRoutes.js'
import { applicationRoutes } from './routes/applicationRoutes.js'

import { interviewRoutes } from './routes/interviewRoutes.js'
import { notificationRoutes } from './routes/notificationRoutes.js'
import { adminRoutes } from './routes/adminRoutes.js'
import { publicRoutes } from './routes/publicRoutes.js'
import employerCommunicationRoutes from './routes/employerCommunicationRoutes.js'




dotenv.config()


const app = express()

// Security headers
app.use(helmet())

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
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false }))

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

// Routes
app.get('/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/auth/me', meRoutes)


app.use('/api/candidates', candidateRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/interviews', interviewRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/company', employerCommunicationRoutes)
app.use('/api/admin', adminRoutes)

app.use('/api/public', publicRoutes)

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

