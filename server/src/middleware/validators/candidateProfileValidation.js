import { body } from 'express-validator'

export const candidateProfileValidation = [
  body('fullName')
    .exists({ checkFalsy: true })
    .withMessage('fullName is required')
    .isString()
    .trim()
    .notEmpty(),

  body('email')
    .exists({ checkFalsy: true })
    .withMessage('email is required')
    .isEmail()
    .normalizeEmail(),

  body('phone')
    .exists({ checkFalsy: true })
    .withMessage('phone is required')
    .isString()
    .trim()
    .notEmpty(),

  body('dob')
    .exists({ checkFalsy: true })
    .withMessage('dob is required')
    .isISO8601()
    .withMessage('dob must be a valid date'),

  body('gender')
    .exists({ checkFalsy: true })
    .withMessage('gender is required')
    .isString()
    .trim()
    .notEmpty(),

  body('address')
    .exists({ checkFalsy: true })
    .withMessage('address is required')
    .isString()
    .trim()
    .notEmpty(),

  // Optional fields (used for profile completion)
  body('education').optional().isString().trim(),
  body('experience').optional().isString().trim(),

  // Phase E.1 (Talent Search prep) optional fields
  body('title').optional().isString().trim(),
  body('location').optional().isString().trim(),
  body('experienceYears').optional().isNumeric(),
  body('availability').optional().isIn(['Immediate', '15 Days', '30 Days', '60+ Days']),
  body('expectedSalary').optional().isNumeric(),

  body('jobCategories')
    .optional()
    .custom((v) => {
      if (Array.isArray(v)) return true
      if (typeof v === 'string') return true
      return false
    })
    .withMessage('jobCategories must be an array or comma-separated string'),

  body('projects').optional(),
  body('certifications').optional(),


  body('skills')
    .optional()
    .custom((v) => {
      if (Array.isArray(v)) return true
      if (typeof v === 'string') return true // allow comma-separated string
      return false
    })
    .withMessage('skills must be an array or comma-separated string'),

  body('languages')
    .optional()
    .custom((v) => {
      if (Array.isArray(v)) return true
      if (typeof v === 'string') return true
      return false
    })
    .withMessage('languages must be an array or comma-separated string'),

  // Multer will set resume/photo paths separately.
  body('resumePath').optional().isString(),
  body('photoPath').optional().isString(),
]

