import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import { getMyCandidate, updateCandidateProfile } from '../controllers/candidateController.js'
import { candidateProfileValidation } from '../middleware/validators/candidateProfileValidation.js'

export const candidateRoutes = express.Router()

candidateRoutes.get(
  '/me',
  authenticate,
  authorizeRoles('candidate', 'eps_admin'),
  getMyCandidate,
)

candidateRoutes.get(
  '/profile',
  authenticate,
  authorizeRoles('candidate', 'eps_admin'),
  getMyCandidate,
)

candidateRoutes.put(
  '/profile',
  authenticate,
  authorizeRoles('candidate', 'eps_admin'),
  candidateProfileValidation,
  updateCandidateProfile,
)





