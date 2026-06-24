import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {
  applyJob,
  getMyApplications,
  getAllApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  getCompanyApplications,
  applicationDecision,
} from '../controllers/applicationController.js'

export const applicationRoutes = express.Router()

// Candidate
applicationRoutes.post('/', authenticate, roleMiddleware('candidate'), applyJob)
applicationRoutes.get('/me', authenticate, roleMiddleware('candidate'), getMyApplications)

// EPS Admin
applicationRoutes.get('/', authenticate, roleMiddleware('eps_admin'), getAllApplications)
applicationRoutes.get(
  '/job/:jobId',
  authenticate,
  roleMiddleware('eps_admin'),
  getApplicationsByJob,
)
applicationRoutes.patch(
  '/:id/status',
  authenticate,
  roleMiddleware('eps_admin'),
  updateApplicationStatus,
)

// Company
applicationRoutes.get(
  '/company/:companyId',
  authenticate,
  roleMiddleware('company'),
  getCompanyApplications,
)
applicationRoutes.patch(
  '/:id/decision',
  authenticate,
  roleMiddleware('company'),
  applicationDecision,
)


