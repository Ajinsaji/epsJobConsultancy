import { validationResult } from 'express-validator'

import { asyncHandler } from '../utils/asyncHandler.js'
import { Candidate } from '../models/Candidate.js'
import { User } from '../models/User.js'

function normalizeArrayField(value) {
  if (value === undefined || value === null) return undefined
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return undefined
}

function calculateCompletion(profile) {
  const fields = [
    // Existing fields
    'fullName',
    'email',
    'phone',
    'dob',
    'gender',
    'address',
    'education',
    'experience',
    'skills',
    'languages',
    'resume',
    'photo',

    // Phase E.1 fields
    'title',
    'location',
    'experienceYears',
    'availability',
    'expectedSalary',
    'jobCategories',
    'projects',
    'certifications',
  ]

  let present = 0
  for (const f of fields) {
    const v = profile?.[f]

    if (Array.isArray(v)) {
      if (v.length > 0) present += 1
    } else if (typeof v === 'number') {
      if (!Number.isNaN(v)) present += 1
    } else if (v !== undefined && v !== null && v !== '') {
      present += 1
    }
  }

  return Math.round((present / fields.length) * 100)
}


export const getMyCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findOne({ userId: req.user._id }).lean()
  const profileCompletion = calculateCompletion(candidate)
  res.json({ candidate, profileCompletion })
})

export const updateCandidateProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
  }


  const user = await User.findById(req.user._id).select('name email phone role')
  if (!user) return res.status(404).json({ message: 'User not found' })

  const normalizeObjectArrayField = (value) => {
    if (value === undefined || value === null) return undefined
    if (Array.isArray(value)) return value.filter(Boolean)
    return undefined
  }

  const normalizePotentialJsonArray = (value) => {
    if (value === undefined || value === null) return undefined
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (!trimmed) return undefined
      try {
        const parsed = JSON.parse(trimmed)
        if (Array.isArray(parsed)) return parsed
      } catch (_) {
        // ignore parse errors; fall through
      }
    }
    return undefined
  }

  const normalizeNumberField = (value) => {
    if (value === undefined || value === null || value === '') return undefined
    const n = Number(value)
    if (Number.isNaN(n)) return undefined
    return n
  }


  const patch = {
    // Existing fields
    fullName: req.body.fullName ?? user.name,
    email: req.body.email ?? user.email,
    phone: req.body.phone ?? user.phone,
    dob: req.body.dob ? new Date(req.body.dob) : undefined,
    gender: req.body.gender,
    address: req.body.address,
    education: req.body.education,
    experience: req.body.experience,
    skills: normalizeArrayField(req.body.skills),
    languages: normalizeArrayField(req.body.languages),
    resume: req.body.resumePath,
    photo: req.body.photoPath,

    // Phase E.1 fields
    title: req.body.title,
    location: req.body.location,
    experienceYears: normalizeNumberField(req.body.experienceYears),
    availability: req.body.availability,
    expectedSalary: normalizeNumberField(req.body.expectedSalary),
    jobCategories: normalizeArrayField(req.body.jobCategories),

    // These are arrays of objects. Accept arrays or JSON stringified arrays.
    projects: normalizeObjectArrayField(normalizePotentialJsonArray(req.body.projects)),
    certifications: normalizeObjectArrayField(normalizePotentialJsonArray(req.body.certifications)),
  }



  // Remove undefined keys to avoid overwriting existing values unintentionally
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) delete patch[k]
  }

  const updated = await Candidate.findOneAndUpdate(
    { userId: req.user._id },
    { $set: patch },
    { new: true, upsert: true },
  ).lean()

  const profileCompletion = calculateCompletion(updated)

  return res.json({
    profileCompletion,
    profile: updated,
  })
})



