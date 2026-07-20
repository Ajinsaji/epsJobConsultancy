import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { parseResume, rankCandidatesForJob } from '../controllers/aiController.js'

export const aiRoutes = express.Router()

// Candidates can parse their resumes
aiRoutes.post('/parse-resume', authenticate, roleMiddleware('candidate'), parseResume)

// EPS Admins and Companies can rank candidates for a job
aiRoutes.get('/rank-candidates/:jobId', authenticate, roleMiddleware('eps_admin', 'company', 'super_admin'), rankCandidatesForJob)
