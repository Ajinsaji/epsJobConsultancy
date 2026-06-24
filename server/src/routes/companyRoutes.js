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
} from '../controllers/employerCandidateController.js'

export const companyRoutes = express.Router()

// All routes require authentication
companyRoutes.use(authenticate)

companyRoutes.get('/me', authorizeRoles('company', 'eps_admin'), getMyCompany)

// EPS Admin company CRUD
companyRoutes.post('/', authorizeRoles('eps_admin'), createCompany)
companyRoutes.get('/', authorizeRoles('eps_admin'), getAllCompanies)
companyRoutes.delete('/:id', authorizeRoles('eps_admin'), deleteCompany)

// Both EPS Admin and the Company itself can access/update details
companyRoutes.get('/:id', authorizeRoles('company', 'eps_admin'), getCompanyById)
companyRoutes.put('/:id', authorizeRoles('company', 'eps_admin'), updateCompanyProfile)

// Phase E.2 — Employer <-> Candidate interactions (job-independent)
// Company should manage candidates even without creating jobs.

// POST /api/company/candidates/:id/save
companyRoutes.post(
  '/candidates/:id/save',
  authorizeRoles('company'),
  saveCandidate,
)

// POST /api/company/candidates/:id/shortlist
companyRoutes.post(
  '/candidates/:id/shortlist',
  authorizeRoles('company'),
  shortlistCandidate,
)

// POST /api/company/candidates/:id/contact
companyRoutes.post(
  '/candidates/:id/contact',
  authorizeRoles('company'),
  contactCandidate,
)

// GET /api/company/candidates/saved
companyRoutes.get(
  '/candidates/saved',
  authorizeRoles('company'),
  getSavedCandidates,
)

// GET /api/company/candidates/shortlisted
companyRoutes.get(
  '/candidates/shortlisted',
  authorizeRoles('company'),
  getShortlistedCandidates,
)

// GET /api/company/candidates/history
companyRoutes.get(
  '/candidates/history',
  authorizeRoles('company'),
  getInteractionHistory,
)

// Phase E.3 — Talent search (job-independent)
// GET /api/company/talent-search
companyRoutes.get(
  '/talent-search',
  authorizeRoles('company'),
  talentSearch,
)


