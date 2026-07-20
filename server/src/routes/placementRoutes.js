import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {
  getMyPlacements,
  getCompanyPlacements,
  getAllPlacements,
  updatePlacement,
} from '../controllers/placementController.js'

export const placementRoutes = express.Router()

// Candidate
placementRoutes.get('/me', authenticate, roleMiddleware('candidate'), getMyPlacements)

// Company
placementRoutes.get('/company', authenticate, roleMiddleware('company'), getCompanyPlacements)

// EPS Admin
placementRoutes.get('/', authenticate, roleMiddleware('eps_admin', 'super_admin'), getAllPlacements)
placementRoutes.put('/:id', authenticate, roleMiddleware('eps_admin', 'super_admin'), updatePlacement)
