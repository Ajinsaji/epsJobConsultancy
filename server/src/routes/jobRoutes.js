import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {
  listJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  closeJob,
  listCompanyJobs,
  getRecommendedJobs,
} from '../controllers/jobController.js'

export const jobRoutes = express.Router()

// Enforce authentication on all job routes
jobRoutes.use(authenticate)

jobRoutes.get('/recommended', roleMiddleware('candidate'), getRecommendedJobs)


// View jobs
jobRoutes.get('/', roleMiddleware('candidate', 'company', 'eps_admin'), listJobs)
jobRoutes.get(
  '/company/:companyId',
  roleMiddleware('company', 'eps_admin'),
  listCompanyJobs,
)
jobRoutes.get(
  '/:id',
  roleMiddleware('candidate', 'company', 'eps_admin'),
  getJobById,
)

// EPS Admin & Company CRUD
jobRoutes.post('/', roleMiddleware('company', 'eps_admin'), createJob)
jobRoutes.put('/:id', roleMiddleware('company', 'eps_admin'), updateJob)
jobRoutes.delete('/:id', roleMiddleware('company', 'eps_admin'), deleteJob)
jobRoutes.patch('/:id/close', roleMiddleware('company', 'eps_admin'), closeJob)




