import express from 'express'
import {
  getHomepageConfig,
  getPublicStats,
  getPublicJobs,
  getPublicPartners,
  getPublicPartnersMarquee,
  getPublicCandidateTestimonials,
  getPublicEmployerTestimonials,
  getPublicPlacements,
  getPublicFAQs,
  getPublicServices,
} from '../controllers/publicController.js'

export const publicRoutes = express.Router()

publicRoutes.get('/config', getHomepageConfig)
publicRoutes.get('/stats', getPublicStats)
publicRoutes.get('/jobs', getPublicJobs)
publicRoutes.get('/partners', getPublicPartners)
publicRoutes.get('/partners/marquee', getPublicPartnersMarquee)
publicRoutes.get('/testimonials/candidates', getPublicCandidateTestimonials)
publicRoutes.get('/testimonials/employers', getPublicEmployerTestimonials)
publicRoutes.get('/placements', getPublicPlacements)
publicRoutes.get('/faqs', getPublicFAQs)
publicRoutes.get('/services', getPublicServices)
