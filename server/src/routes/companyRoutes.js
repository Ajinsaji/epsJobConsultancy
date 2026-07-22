import express from 'express'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import {
  getMyCompany,
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompanyProfile,
  deleteCompany,
} from '../controllers/companyController.js'
import { talentSearch } from '../controllers/talentSearchController.js'

import {
  saveCandidate,
  shortlistCandidate,
  contactCandidate,
  getSavedCandidates,
  getShortlistedCandidates,
  getInteractionHistory,
  getCandidateProfileForEmployer
} from '../controllers/employerCandidateController.js'

export const companyRoutes = express.Router()

// All routes require authentication
companyRoutes.use(authenticate)

companyRoutes.get('/me', authorizeRoles('company', 'eps_admin'), getMyCompany)

// EPS Admin company CRUD
companyRoutes.post('/', authorizeRoles('eps_admin'), createCompany)
companyRoutes.get('/', authorizeRoles('eps_admin'), getAllCompanies)
companyRoutes.delete('/:id', authorizeRoles('eps_admin'), deleteCompany)

// Phase E.2 — Employer <-> Candidate interactions (job-independent)

// GET /api/companies/:companyId/candidates/saved
companyRoutes.get(
  '/:companyId/candidates/saved',
  authorizeRoles('company'),
  getSavedCandidates,
)

// GET /api/companies/:companyId/candidates/shortlisted
companyRoutes.get(
  '/:companyId/candidates/shortlisted',
  authorizeRoles('company'),
  getShortlistedCandidates,
)

// GET /api/companies/:companyId/candidates/history
companyRoutes.get(
  '/:companyId/candidates/history',
  authorizeRoles('company'),
  getInteractionHistory,
)

// GET /api/companies/:companyId/talent-search
companyRoutes.get(
  '/:companyId/talent-search',
  authorizeRoles('company'),
  talentSearch,
)

// GET /api/companies/:companyId/candidates/:candidateId
companyRoutes.get(
  '/:companyId/candidates/:candidateId',
  authorizeRoles('company'),
  getCandidateProfileForEmployer,
)

// POST /api/companies/:companyId/candidates/:candidateId/save
companyRoutes.post(
  '/:companyId/candidates/:candidateId/save',
  authorizeRoles('company'),
  saveCandidate,
)

// POST /api/companies/:companyId/candidates/:candidateId/shortlist
companyRoutes.post(
  '/:companyId/candidates/:candidateId/shortlist',
  authorizeRoles('company'),
  shortlistCandidate,
)

// POST /api/companies/:companyId/candidates/:candidateId/contact
companyRoutes.post(
  '/:companyId/candidates/:candidateId/contact',
  authorizeRoles('company'),
  contactCandidate,
)

// Both EPS Admin and the Company itself can access/update details
// Put these at the bottom so they don't catch the /candidates routes if anything is malformed
companyRoutes.get('/:id', authorizeRoles('company', 'eps_admin'), getCompanyById)
companyRoutes.put('/:id', authorizeRoles('company', 'eps_admin'), updateCompanyProfile)
