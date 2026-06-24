import express from 'express'
import {
  getPublicStats,
  getPublicJobs,
  getPublicTestimonials,
} from '../controllers/publicController.js'

export const publicRoutes = express.Router()

publicRoutes.get('/stats', getPublicStats)
publicRoutes.get('/jobs', getPublicJobs)
publicRoutes.get('/testimonials', getPublicTestimonials)

