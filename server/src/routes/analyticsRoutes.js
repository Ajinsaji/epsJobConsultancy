import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import { getDashboardAnalytics } from '../controllers/analyticsController.js'

export const analyticsRoutes = express.Router()

// Secure analytics routes for eps_admin
analyticsRoutes.use(authenticate, authorizeRoles('eps_admin'))

analyticsRoutes.get('/dashboard', getDashboardAnalytics)
