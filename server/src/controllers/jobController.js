import { asyncHandler } from '../utils/asyncHandler.js'
import { Job } from '../models/Job.js'
import { Company } from '../models/Company.js'
import { Candidate } from '../models/Candidate.js'

export const listJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({})
    .populate('companyId', 'companyName location')
    .lean()

  res.json({ jobs })
})

export const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    salary,
    location,
    experience,
    skills,
    skillsRequired,
    jobType,
    workMode,
    openings,
    status,
    applicationDeadline,
  } = req.body

  let targetCompanyId = req.body.companyId

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id })
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found for this user.' })
    }
    targetCompanyId = company._id
  } else if (req.user.role === 'eps_admin') {
    if (!targetCompanyId) {
      return res.status(400).json({ message: 'companyId is required' })
    }
  } else {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const canonicalSkillsRequired =
    skillsRequired ?? (Array.isArray(skills) ? skills : undefined)

  const job = await Job.create({
    title,
    description,
    companyId: targetCompanyId,
    salary,
    location,
    experience,
    skills,
    skillsRequired: canonicalSkillsRequired,
    jobType,
    workMode,
    openings,
    status,
    applicationDeadline,
    createdBy: req.user?._id,
  })

  const populated = await job.populate('companyId', 'companyName location')
  res.status(201).json({ job: populated })
})

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate('companyId', 'companyName location')
    .lean()

  if (!job) return res.status(404).json({ message: 'Job not found' })
  res.json({ job })
})

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) return res.status(404).json({ message: 'Job not found' })

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id })
    if (!company || job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: cannot update other company jobs' })
    }
  }

  const {
    title,
    description,
    salary,
    location,
    experience,
    skills,
    skillsRequired,
    jobType,
    workMode,
    openings,
    status,
    applicationDeadline,
  } = req.body

  const canonicalSkillsRequired =
    skillsRequired ?? (Array.isArray(skills) ? skills : undefined)

  const updated = await Job.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      salary,
      location,
      experience,
      skills,
      skillsRequired: canonicalSkillsRequired,
      jobType,
      workMode,
      openings,
      status,
      applicationDeadline,
    },
    { new: true },
  ).populate('companyId', 'companyName location')

  res.json({ job: updated })
})

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) return res.status(404).json({ message: 'Job not found' })

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id })
    if (!company || job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: cannot delete other company jobs' })
    }
  }

  await Job.findByIdAndDelete(req.params.id)
  res.json({ message: 'Job deleted successfully' })
})

export const closeJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) return res.status(404).json({ message: 'Job not found' })

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id })
    if (!company || job.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: cannot close other company jobs' })
    }
  }

  const updated = await Job.findByIdAndUpdate(
    req.params.id,
    { status: 'Closed' },
    { new: true },
  ).populate('companyId', 'companyName location')

  res.json({ job: updated })
})

export const listCompanyJobs = asyncHandler(async (req, res) => {
  const { companyId } = req.params

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id }).lean()
    if (!company || company._id.toString() !== companyId) {
      return res.status(403).json({ message: 'Forbidden: access denied to other company jobs' })
    }
  }

  const jobs = await Job.find({ companyId })
    .populate('companyId', 'companyName location')
    .lean()

  res.json({ jobs })
})

export const getRecommendedJobs = asyncHandler(async (req, res) => {
  // Fetch current candidate's profile
  const candidate = await Candidate.findOne({ userId: req.user._id }).lean()
  
  if (!candidate || !candidate.skills || candidate.skills.length === 0) {
    // Fallback: Latest 6 open jobs
    const jobs = await Job.find({ status: 'Open' })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('companyId')
      .lean()
    return res.json({ jobs })
  }

  const userSkills = candidate.skills.map((s) => s.toLowerCase().trim())

  // Fetch all open jobs
  const openJobs = await Job.find({ status: 'Open' })
    .populate('companyId')
    .lean()

  // Match and score jobs
  const scored = openJobs.map((job) => {
    const jobSkills = (job.skillsRequired || job.skills || []).map((s) => s.toLowerCase().trim())
    const overlap = jobSkills.filter((s) => userSkills.includes(s))
    const score = jobSkills.length > 0 ? (overlap.length / jobSkills.length) * 100 : 0
    return { job, score }
  })

  // Sort by match score descending, filter out 0 matches
  const sorted = scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.job)

  if (sorted.length === 0) {
    // Default fallback to latest jobs if no skill overlaps exist
    const fallback = await Job.find({ status: 'Open' })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('companyId')
      .lean()
    return res.json({ jobs: fallback })
  }

  res.json({ jobs: sorted.slice(0, 6) })
})



