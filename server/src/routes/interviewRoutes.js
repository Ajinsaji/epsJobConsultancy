import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {
  createInterview,
  updateInterview,
  deleteInterview,
  listAllInterviews,
  listMyInterviews,
  getCompanyInterviews,
} from '../controllers/interviewController.js'

export const interviewRoutes = express.Router()

// EPS Admin
interviewRoutes.post('/', authenticate, roleMiddleware('eps_admin'), createInterview)
interviewRoutes.get('/', authenticate, roleMiddleware('eps_admin'), listAllInterviews)
interviewRoutes.put('/:id', authenticate, roleMiddleware('eps_admin'), updateInterview)
interviewRoutes.delete('/:id', authenticate, roleMiddleware('eps_admin'), deleteInterview)

// Candidate
interviewRoutes.get('/me', authenticate, roleMiddleware('candidate'), listMyInterviews)

// Company
interviewRoutes.get(
  '/company/:companyId',
  authenticate,
  roleMiddleware('company'),
  getCompanyInterviews,
)


