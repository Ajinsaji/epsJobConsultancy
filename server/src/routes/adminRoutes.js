import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import {
  getSystemLogs,
  getAdminActivities,
  getPlatformHealth,
  getAdminHomepageConfig,
  updateHomepageConfig,
  publishHomepageConfig,
  getAdminPlacements,
  createPlacement,
  updatePlacement,
  deletePlacement,
  getAdminFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getAdminServices,
  createService,
  updateService,
  deleteService,
  getAdminCompanies,
  updateCompanyHomepageProps,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/adminController.js'

export const adminRoutes = express.Router()

// Secure all admin routes for eps_admin
adminRoutes.use(authenticate, authorizeRoles('eps_admin'))

adminRoutes.get('/system-logs', getSystemLogs)
adminRoutes.get('/activities', getAdminActivities)
adminRoutes.get('/health', getPlatformHealth)

// Homepage config
adminRoutes.get('/homepage-config', getAdminHomepageConfig)
adminRoutes.put('/homepage-config', updateHomepageConfig)
adminRoutes.put('/homepage-config/publish', publishHomepageConfig)


// Placements
adminRoutes.get('/placements', getAdminPlacements)
adminRoutes.post('/placements', createPlacement)
adminRoutes.put('/placements/:id', updatePlacement)
adminRoutes.delete('/placements/:id', deletePlacement)

// FAQs
adminRoutes.get('/faqs', getAdminFAQs)
adminRoutes.post('/faqs', createFAQ)
adminRoutes.put('/faqs/:id', updateFAQ)
adminRoutes.delete('/faqs/:id', deleteFAQ)

// Services
adminRoutes.get('/services', getAdminServices)
adminRoutes.post('/services', createService)
adminRoutes.put('/services/:id', updateService)
adminRoutes.delete('/services/:id', deleteService)

// Partner Companies management
adminRoutes.get('/companies', getAdminCompanies)
adminRoutes.put('/companies/:id/homepage', updateCompanyHomepageProps)

// Testimonials management
adminRoutes.get('/testimonials', getAdminTestimonials)
adminRoutes.post('/testimonials', createTestimonial)
adminRoutes.put('/testimonials/:id', updateTestimonial)
adminRoutes.delete('/testimonials/:id', deleteTestimonial)
