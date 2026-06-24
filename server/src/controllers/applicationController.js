import { asyncHandler } from '../utils/asyncHandler.js'
import { Application } from '../models/Application.js'
import { Job } from '../models/Job.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'

const getCanonicalStatus = (s) => (s && typeof s === 'string' ? s : undefined)

const EPS_ALLOWED_TRANSITIONS = {
  'Applied': ['Under Review'],
  'Under Review': ['Shortlisted'],
  'Shortlisted': ['Forwarded'],
  'Forwarded': ['Interview Scheduled'],
  'Interview Scheduled': [], // company controls selection/rejection
  'Selected': [],
  'Rejected': [],
}

const COMPANY_ALLOWED_TRANSITIONS = {
  'Interview Scheduled': ['Selected', 'Rejected'],
}

export const applyJob = asyncHandler(async (req, res) => {
  const { jobId, remarks } = req.body

  if (!jobId) return res.status(400).json({ message: 'jobId is required' })

  // Candidate is derived from authenticated user
  const candidate = await Candidate.findOne({ userId: req.user._id }).lean()
  if (!candidate) return res.status(404).json({ message: 'Candidate profile not found' })

  const job = await Job.findById(jobId).lean()
  if (!job) return res.status(404).json({ message: 'Job not found' })

  const companyId = job.companyId

  const existing = await Application.findOne({ candidateId: candidate._id, jobId }).lean()
  if (existing) {
    return res
      .status(409)
      .json({ message: 'You have already applied for this job.' })
  }

  const resumeSnapshot = {
    fullName: candidate.fullName,
    email: candidate.email,
    phone: candidate.phone,
    skills: candidate.skills ?? [],
    experience: candidate.experience,
  }

  const application = await Application.create({
    candidateId: candidate._id,
    jobId,
    companyId,
    status: 'Applied',
    remarks,
    resumeSnapshot,
    appliedAt: new Date(),
  })

  res.status(201).json({ application })
})

export const getMyApplications = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) return res.json({ applications: [] })

  const applications = await Application.find({ candidateId: candidate._id })
    .populate('jobId')
    .lean()

  res.json({ applications })
})

export const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({})
    .populate('jobId')
    .populate('candidateId')
    .lean()

  res.json({ applications })
})

export const getApplicationsByJob = asyncHandler(async (req, res) => {
  const applications = await Application.find({ jobId: req.params.jobId })
    .populate('candidateId')
    .lean()

  res.json({ applications })
})

const canEPSUpdate = (currentStatus, nextStatus) => {
  const allowed = EPS_ALLOWED_TRANSITIONS[currentStatus] || []
  return allowed.includes(nextStatus)
}

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body
  const nextStatus = getCanonicalStatus(status)

  if (!nextStatus)
    return res.status(400).json({ message: 'status is required' })

  const application = await Application.findById(req.params.id)
  if (!application) return res.status(404).json({ message: 'Application not found' })

  const currentStatus = application.status

  if (!canEPSUpdate(currentStatus, nextStatus)) {
    return res.status(403).json({ message: 'Invalid EPS status transition' })
  }

  application.status = nextStatus

  if (nextStatus === 'Under Review' || nextStatus === 'Shortlisted') {
    // no-op timestamps for now
  }

  // Company will handle interview scheduled onward.
  if (remarks !== undefined) application.remarks = remarks

  const updated = await application.save()
  res.json({ application: updated })
})

export const getCompanyApplications = asyncHandler(async (req, res) => {
  const { companyId } = req.params

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id }).lean()
    if (!company || company._id.toString() !== companyId) {
      return res.status(403).json({ message: 'Forbidden: access denied to other company applications' })
    }
  }

  const applications = await Application.find({ companyId })
    .populate('jobId')
    .populate('candidateId')
    .lean()

  res.json({ applications })
})

export const applicationDecision = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body
  const nextStatus = getCanonicalStatus(status)

  if (!nextStatus)
    return res.status(400).json({ message: 'status is required' })

  const application = await Application.findById(req.params.id)
  if (!application) return res.status(404).json({ message: 'Application not found' })

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id }).lean()
    if (!company || application.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: access denied to other company applications' })
    }
  }

  const currentStatus = application.status

  const allowedNext = COMPANY_ALLOWED_TRANSITIONS[currentStatus] || []
  if (!allowedNext.includes(nextStatus)) {
    return res.status(403).json({ message: 'Invalid company decision transition' })
  }

  application.status = nextStatus
  if (remarks !== undefined) application.remarks = remarks
  application.reviewedBy = req.user._id
  application.reviewedAt = new Date()

  const updated = await application.save()
  res.json({ application: updated })
})


