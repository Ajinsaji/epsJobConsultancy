import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { getCurrentUser } from '../controllers/authController.js'

export const meRoutes = express.Router()

meRoutes.get('/', authenticate, getCurrentUser)

