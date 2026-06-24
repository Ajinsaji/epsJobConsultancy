import { asyncHandler } from '../utils/asyncHandler.js'
import { Interview } from '../models/Interview.js'
import { Application } from '../models/Application.js'
import { Company } from '../models/Company.js'

const STATUS_TRANSITIONS = {
  Scheduled: ['Rescheduled', 'Completed', 'Cancelled'],
  Rescheduled: ['Completed', 'Cancelled'],
  Completed: [],
  Cancelled: [],
}

const getNextStatus = (status) => (status && typeof status === 'string' ? status : undefined)

export const createInterview = asyncHandler(async (req, res) => {
  const { applicationId, interviewDate, time, mode, meetingLink, location, remarks } = req.body

  if (!applicationId) return res.status(400).json({ message: 'applicationId is required' })

  const application = await Application.findById(applicationId).lean()
  if (!application) return res.status(404).json({ message: 'Application not found' })

  if (application.status !== 'Interview Scheduled') {
    return res.status(400).json({
      message: 'Interview can only be scheduled for applications in Interview Scheduled status.',
    })
  }

  const interview = await Interview.create({
    applicationId,
    epsAdminId: req.user._id,
    scheduledBy: req.user._id,

    candidateId: application.candidateId,
    companyId: application.companyId,

    // Backward-compatible fields
    date: interviewDate || new Date(),
    time,
    mode,
    feedback: undefined,

    // New fields
    interviewDate: interviewDate || new Date(),
    meetingLink,
    location,
    remarks,
    status: 'Scheduled',
  })

  res.status(201).json({ interview })
})

export const updateInterview = asyncHandler(async (req, res) => {
  const { status, interviewDate, time, mode, meetingLink, location, remarks } = req.body
  const nextStatus = getNextStatus(status)

  const interview = await Interview.findById(req.params.id)
  if (!interview) return res.status(404).json({ message: 'Interview not found' })

  // Allowed status transitions for updates
  if (nextStatus) {
    const allowed = STATUS_TRANSITIONS[interview.status] || []
    if (!allowed.includes(nextStatus)) {
      return res.status(403).json({ message: 'Invalid interview status transition' })
    }
    interview.status = nextStatus
  }

  if (interviewDate !== undefined) {
    interview.interviewDate = interviewDate
    interview.date = interviewDate
  }
  if (time !== undefined) interview.time = time
  if (mode !== undefined) interview.mode = mode
  if (meetingLink !== undefined) interview.meetingLink = meetingLink
  if (location !== undefined) interview.location = location
  if (remarks !== undefined) interview.remarks = remarks

  const updated = await interview.save()
  res.json({ interview: updated })
})

export const deleteInterview = asyncHandler(async (req, res) => {
  const deleted = await Interview.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ message: 'Interview not found' })
  res.json({ message: 'Interview deleted successfully' })
})

export const listAllInterviews = asyncHandler(async (req, res) => {
  const interviews = await Interview.find({})
    .populate('applicationId')
    .populate('candidateId')
    .populate('companyId')
    .lean()

  res.json({ interviews })
})

export const listMyInterviews = asyncHandler(async (req, res) => {
  const { Candidate } = await import('../models/Candidate.js')
  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) return res.json({ interviews: [] })

  const interviews = await Interview.find({ candidateId: candidate._id })
    .populate('applicationId')
    .lean()

  res.json({ interviews })
})

export const getCompanyInterviews = asyncHandler(async (req, res) => {
  const { companyId } = req.params

  if (req.user.role === 'company') {
    const company = await Company.findOne({ userId: req.user._id }).lean()
    if (!company || company._id.toString() !== companyId) {
      return res.status(403).json({ message: 'Forbidden: access denied to other company interviews' })
    }
  }

  const interviews = await Interview.find({ companyId })
    .populate('applicationId')
    .lean()

  res.json({ interviews })
})



