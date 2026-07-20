import express from 'express'
import multer from 'multer'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import { analyzeResume } from '../controllers/resumeController.js'

export const resumeRoutes = express.Router()

// Setup multer for memory storage (file buffer passed to controller)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'))
    }
  }
})

// All routes require authentication and candidate role
resumeRoutes.use(authenticate)
resumeRoutes.use(authorizeRoles('candidate'))

resumeRoutes.post('/analyze', upload.single('resume'), analyzeResume)
