import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import { submitFeedback, getFeedback, getCompanyFeedbacks } from '../controllers/feedbackController.js'

export const feedbackRoutes = express.Router()

// All routes require authentication
feedbackRoutes.use(authenticate)

// Company routes
feedbackRoutes.post('/', authorizeRoles('company'), submitFeedback)
feedbackRoutes.get('/company', authorizeRoles('company'), getCompanyFeedbacks)

// Mixed access (admin/eps can also view)
feedbackRoutes.get('/:id', getFeedback)
