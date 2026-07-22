import { asyncHandler } from '../utils/asyncHandler.js'
import { EmployerCandidateInteraction } from '../models/EmployerCandidateInteraction.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'

// Helper to resolve companyId
const getCompanyId = async (req) => {
  if (req.params.companyId === 'me') {
    const company = await Company.findOne({ userId: req.user._id }).lean()
    if (!company) throw new Error('Company profile not found')
    return company._id
  }
  return req.params.companyId
}

const statusToResponse = asyncHandler(async (req, res) => {
  const companyId = await getCompanyId(req)
  const candidateId = req.params.candidateId

  const candidate = await Candidate.findById(candidateId).lean()
  if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

  const notes = typeof req.body.notes === 'string' ? req.body.notes : undefined
  const nextStatus = req.body.status
  if (!nextStatus) return res.status(400).json({ message: 'Missing interaction status' })

  const existing = await EmployerCandidateInteraction.findOne({
    companyId,
    candidateId,
  })

  if (existing) {
    existing.status = nextStatus
    if (notes !== undefined) existing.notes = notes
    await existing.save()
    return res.json({ interaction: existing })
  }

  const interaction = await EmployerCandidateInteraction.create({
    companyId,
    candidateId,
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
  const companyId = await getCompanyId(req)

  const interactions = await EmployerCandidateInteraction.find({
    companyId,
    status: 'saved',
  }).lean()

  const candidates = await Candidate.find({ _id: { $in: interactions.map((i) => i.candidateId) } }).lean()

  res.json({
    candidates: candidates.map(buildCandidateSummary),
  })
})

export const getShortlistedCandidates = asyncHandler(async (req, res) => {
  const companyId = await getCompanyId(req)

  const interactions = await EmployerCandidateInteraction.find({
    companyId,
    status: 'shortlisted',
  }).lean()

  const candidates = await Candidate.find({ _id: { $in: interactions.map((i) => i.candidateId) } }).lean()

  res.json({
    candidates: candidates.map(buildCandidateSummary),
  })
})

export const getInteractionHistory = asyncHandler(async (req, res) => {
  const companyId = await getCompanyId(req)

  const interactions = await EmployerCandidateInteraction.find({
    companyId,
  })
    .sort({ createdAt: -1 })
    .lean()

  const candidateIds = interactions.map((i) => i.candidateId)
  const candidates = await Candidate.find({ _id: { $in: candidateIds } }).lean()
  const candidateById = new Map(candidates.map((c) => [c._id.toString(), c]))

  const history = interactions.map((i) => {
    const c = candidateById.get(i.candidateId.toString())
    return {
      candidate: c ? buildCandidateSummary(c) : { candidateId: i.candidateId },
      status: i.status,
      timestamp: i.createdAt,
      notes: i.notes,
    }
  })

  res.json({ history })
})

export const getCandidateProfileForEmployer = asyncHandler(async (req, res) => {
  const companyId = await getCompanyId(req)
  const candidateId = req.params.candidateId

  const candidate = await Candidate.findById(candidateId)
    .select('-user -createdAt -updatedAt') // hide internal details
    .lean()

  if (!candidate) return res.status(404).json({ message: 'Candidate not found' })

  const interaction = await EmployerCandidateInteraction.findOne({
    companyId,
    candidateId,
  }).lean()

  res.json({
    candidate,
    interactionStatus: interaction ? interaction.status : null,
    interactionNotes: interaction ? interaction.notes : null
  })
})
