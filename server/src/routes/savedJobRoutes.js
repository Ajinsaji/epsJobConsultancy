import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import {
  saveJob,
  unsaveJob,
  getSavedJobs,
  checkIfSaved,
} from '../controllers/savedJobController.js'

export const savedJobRoutes = express.Router()

// All routes require authentication and candidate role
savedJobRoutes.use(authenticate)
savedJobRoutes.use(authorizeRoles('candidate'))

savedJobRoutes.post('/', saveJob)
savedJobRoutes.get('/', getSavedJobs)
savedJobRoutes.delete('/:jobId', unsaveJob)
savedJobRoutes.get('/check/:jobId', checkIfSaved)
