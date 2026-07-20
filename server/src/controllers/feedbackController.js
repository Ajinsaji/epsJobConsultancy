import { Feedback } from '../models/Feedback.js'
import { Interview } from '../models/Interview.js'
import { Application } from '../models/Application.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const submitFeedback = asyncHandler(async (req, res) => {
  const { interviewId, candidateId, rating, strengths, weaknesses, recommendation, notes } = req.body
  const companyId = req.user.companyId

  if (!companyId) {
    return res.status(403).json({ message: 'Only companies can submit feedback' })
  }

  // Check if feedback already exists for this interview
  const existingFeedback = await Feedback.findOne({ interviewId })
  if (existingFeedback) {
    return res.status(400).json({ message: 'Feedback already submitted for this interview' })
  }

  const feedback = await Feedback.create({
    interviewId,
    companyId,
    candidateId,
    rating,
    strengths,
    weaknesses,
    recommendation,
    notes
  })

  // Update interview status to completed if feedback is submitted
  await Interview.findByIdAndUpdate(interviewId, { status: 'completed', feedback: feedback._id })

  // Optionally update application status based on recommendation
  const interview = await Interview.findById(interviewId)
  if (interview && recommendation === 'hire') {
    // You could automatically move application to 'selected'
    // await Application.findByIdAndUpdate(interview.applicationId, { status: 'selected' })
  } else if (interview && recommendation === 'reject') {
    // await Application.findByIdAndUpdate(interview.applicationId, { status: 'rejected' })
  }

  res.status(201).json({
    message: 'Feedback submitted successfully',
    feedback
  })
})

export const getFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params

  const feedback = await Feedback.findById(id)
    .populate('candidateId', 'firstName lastName email')
    .populate('companyId', 'companyName')
    .populate('interviewId')

  if (!feedback) {
    return res.status(404).json({ message: 'Feedback not found' })
  }

  res.json({ feedback })
})

export const getCompanyFeedbacks = asyncHandler(async (req, res) => {
  const companyId = req.user.companyId

  if (!companyId) {
    return res.status(403).json({ message: 'Only companies can view their feedback history' })
  }

  const feedbacks = await Feedback.find({ companyId })
    .populate('candidateId', 'firstName lastName')
    .populate('interviewId', 'date time role')
    .sort('-createdAt')

  res.json({ feedbacks })
})
