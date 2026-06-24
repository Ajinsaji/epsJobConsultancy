import { asyncHandler } from '../utils/asyncHandler.js'
import { Candidate } from '../models/Candidate.js'

function parseCsv(value) {
  if (value === undefined || value === null) return []
  if (Array.isArray(value)) return value
  const s = String(value).trim()
  if (!s) return []
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
}

function computeProfileScore(candidate) {
  // TEMPORARY NO-AI profile completion %
  // Fields from requirements (and new E.1 talent-search fields).
  const fields = [
    candidate?.title,
    candidate?.location,
    Array.isArray(candidate?.skills) ? candidate.skills : candidate?.skills,
    candidate?.education,
    candidate?.experience,
    candidate?.resume,
    Array.isArray(candidate?.projects) ? candidate.projects : candidate?.projects,
    Array.isArray(candidate?.certifications)
      ? candidate.certifications
      : candidate?.certifications,
  ]

  const filled = fields.reduce((acc, v) => {
    if (Array.isArray(v)) return acc + (v.length > 0 ? 1 : 0)
    return acc + (v !== undefined && v !== null && v !== '' ? 1 : 0)
  }, 0)

  return fields.length ? Math.round((filled / fields.length) * 100) : 0
}

export const talentSearch = asyncHandler(async (req, res) => {
  const {
    keyword,
    skills,
    location,
    experienceYears,
    availability,
    expectedSalary,
    jobCategory,
  } = req.query

  const keywordQ = typeof keyword === 'string' ? keyword.trim() : ''
  const skillsArr = parseCsv(skills)
  const availabilityQ = typeof availability === 'string' ? availability.trim() : ''
  const locationQ = typeof location === 'string' ? location.trim() : ''

  const expYearsNum =
    experienceYears !== undefined && experienceYears !== null && experienceYears !== ''
      ? Number(experienceYears)
      : undefined

  const maxSalary =
    expectedSalary !== undefined && expectedSalary !== null && expectedSalary !== ''
      ? Number(expectedSalary)
      : undefined

  const jobCategoryQ = typeof jobCategory === 'string' ? jobCategory.trim() : ''

  const filter = {}

  // keyword
  if (keywordQ) {
    const re = new RegExp(keywordQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$or = [
      { fullName: re },
      { title: re },
      { skills: re },
      { education: re },
      { experience: re },
    ]
  }

  // skills: use $in
  if (skillsArr.length) {
    filter.skills = { $in: skillsArr }
  }

  // location exact (case-insensitive)
  if (locationQ) {
    filter.location = { $regex: new RegExp(`^${locationQ}$`, 'i') }
  }

  // experienceYears exact
  if (typeof expYearsNum === 'number' && !Number.isNaN(expYearsNum)) {
    filter.experienceYears = expYearsNum
  }

  // availability
  if (availabilityQ) {
    filter.availability = availabilityQ
  }

  // expectedSalary <= maxSalary
  if (typeof maxSalary === 'number' && !Number.isNaN(maxSalary)) {
    filter.expectedSalary = { $lte: maxSalary }
  }

  // jobCategory matches any candidate.jobCategories entry
  if (jobCategoryQ) {
    filter.jobCategories = { $in: [jobCategoryQ] }
  }

  const candidates = await Candidate.find(filter).lean()

  const responseCandidates = candidates.map((c) => ({
    _id: c._id,
    fullName: c.fullName,
    title: c.title,
    location: c.location,
    experienceYears: c.experienceYears,
    availability: c.availability,
    expectedSalary: c.expectedSalary,
    skills: Array.isArray(c.skills) ? c.skills : [],
    photo: c.photo,
    profileScore: computeProfileScore(c),
  }))

  res.json({ candidates: responseCandidates })
})

