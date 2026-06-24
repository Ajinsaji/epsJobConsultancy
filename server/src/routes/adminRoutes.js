import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import { getSystemLogs } from '../controllers/adminController.js'

export const adminRoutes = express.Router()

adminRoutes.get('/system-logs', authenticate, authorizeRoles('eps_admin'), getSystemLogs)


