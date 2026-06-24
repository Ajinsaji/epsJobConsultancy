import { asyncHandler } from '../utils/asyncHandler.js'
import { EmployerCandidateInteraction } from '../models/EmployerCandidateInteraction.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'

const statusToResponse = asyncHandler(async (req, res) => {
  const { id } = req.params

  const company = await Company.findOne({ userId: req.user._id }).lean()
  if (!company) return res.status(404).json({ message: 'Company profile not found' })

  // Candidate ID is expected to be candidateId.
  // If frontend passes a different id, this will fail safely.
  const candidate = await Candidate.findById(id).lean()
  if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

  // Body may include optional notes
  const notes = typeof req.body.notes === 'string' ? req.body.notes : undefined

  const nextStatus = req.body.status
  if (!nextStatus) return res.status(400).json({ message: 'Missing interaction status' })


  const existing = await EmployerCandidateInteraction.findOne({
    companyId: company._id,
    candidateId: candidate._id,
  })

  if (existing) {
    existing.status = nextStatus
    if (notes !== undefined) existing.notes = notes
    await existing.save()

    return res.json({ interaction: existing })
  }

  const interaction = await EmployerCandidateInteraction.create({
    companyId: company._id,
    candidateId: candidate._id,
    status: nextStatus,
    notes,
  })

  return res.status(201).json({ interaction })
})

export const saveCandidate = asyncHandler(async (req, res) => {
  req.body.status = 'saved'
  return statusToResponse(req, res)
})

export const shortlistCandidate = asyncHandler(async (req, res) => {
  req.body.status = 'shortlisted'
  return statusToResponse(req, res)
})

export const contactCandidate = asyncHandler(async (req, res) => {
  req.body.status = 'contacted'
  return statusToResponse(req, res)
})

function buildCandidateSummary(candidate) {
  return {
    candidateId: candidate._id,
    photo: candidate.photo,
    name: candidate.fullName,
    title: candidate.title,
    location: candidate.location,
    skills: Array.isArray(candidate.skills) ? candidate.skills : [],
  }
}

export const getSavedCandidates = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ userId: req.user._id }).lean()
  if (!company) return res.status(404).json({ message: 'Company profile not found' })

  const interactions = await EmployerCandidateInteraction.find({
    companyId: company._id,
    status: 'saved',
  }).lean()

  const candidates = await Candidate.find({ _id: { $in: interactions.map((i) => i.candidateId) } }).lean()

  res.json({
    candidates: candidates.map(buildCandidateSummary),
  })
})

export const getShortlistedCandidates = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ userId: req.user._id }).lean()
  if (!company) return res.status(404).json({ message: 'Company profile not found' })

  const interactions = await EmployerCandidateInteraction.find({
    companyId: company._id,
    status: 'shortlisted',
  }).lean()

  const candidates = await Candidate.find({ _id: { $in: interactions.map((i) => i.candidateId) } }).lean()

  res.json({
    candidates: candidates.map(buildCandidateSummary),
  })
})

export const getInteractionHistory = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ userId: req.user._id }).lean()
  if (!company) return res.status(404).json({ message: 'Company profile not found' })

  const interactions = await EmployerCandidateInteraction.find({
    companyId: company._id,
  })
    .sort({ createdAt: -1 })
    .lean()

  const candidateIds = interactions.map((i) => i.candidateId)
  const candidates = await Candidate.find({ _id: { $in: candidateIds } }).lean()

  const candidateById = new Map(candidates.map((c) => [c._id.toString(), c]))

  const history = interactions.map((i) => {
    const c = candidateById.get(i.candidateId.toString())

    return {
      candidate: c
        ? {
            candidateId: c._id,
            photo: c.photo,
            name: c.fullName,
            title: c.title,
            location: c.location,
            skills: Array.isArray(c.skills) ? c.skills : [],
          }
        : { candidateId: i.candidateId },
      status: i.status,
      timestamp: i.createdAt,
      notes: i.notes,
    }
  })

  res.json({ history })
})

