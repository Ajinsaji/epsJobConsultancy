import { asyncHandler } from '../utils/asyncHandler.js'
import { SavedJob } from '../models/SavedJob.js'
import { Candidate } from '../models/Candidate.js'
import { Job } from '../models/Job.js'

// Save a job
export const saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body

  if (!jobId) {
    return res.status(400).json({ message: 'jobId is required' })
  }

  // Check if job exists
  const job = await Job.findById(jobId)
  if (!job) {
    return res.status(404).json({ message: 'Job not found' })
  }

  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) {
    return res.status(404).json({ message: 'Candidate profile not found' })
  }

  try {
    const saved = await SavedJob.create({
      candidateId: candidate._id,
      jobId,
    })
    res.status(201).json({ message: 'Job saved successfully', saved })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Job is already saved' })
    }
    throw err
  }
})

// Unsave a job
export const unsaveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params

  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) {
    return res.status(404).json({ message: 'Candidate profile not found' })
  }

  const result = await SavedJob.findOneAndDelete({
    candidateId: candidate._id,
    jobId,
  })

  if (!result) {
    return res.status(404).json({ message: 'Saved job not found' })
  }

  res.json({ message: 'Job unsaved successfully' })
})

// Get all saved jobs for current candidate
export const getSavedJobs = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) {
    return res.status(404).json({ message: 'Candidate profile not found' })
  }

  const savedList = await SavedJob.find({ candidateId: candidate._id })
    .populate({
      path: 'jobId',
      populate: {
        path: 'companyId',
        select: 'companyName logo location industry',
      },
    })
    .sort({ createdAt: -1 })
    .lean()

  // Filter out any entries where the job might have been deleted
  const jobs = savedList
    .filter((item) => item.jobId)
    .map((item) => ({
      savedId: item._id,
      savedAt: item.createdAt,
      ...item.jobId,
    }))

  res.json({ jobs })
})

// Check if a job is saved by current candidate
export const checkIfSaved = asyncHandler(async (req, res) => {
  const { jobId } = req.params

  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) {
    return res.json({ isSaved: false })
  }

  const exists = await SavedJob.findOne({
    candidateId: candidate._id,
    jobId,
  })

  res.json({ isSaved: !!exists })
})
