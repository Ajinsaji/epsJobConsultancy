import { asyncHandler } from '../utils/asyncHandler.js'
import { Placement } from '../models/Placement.js'
import { Application } from '../models/Application.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'

export const getMyPlacements = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findOne({ userId: req.user._id })
  if (!candidate) return res.json({ placements: [] })

  const placements = await Placement.find({ candidateId: candidate._id })
    .populate('jobId')
    .populate('companyId')
    .lean()

  res.json({ placements })
})

export const getCompanyPlacements = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ userId: req.user._id })
  if (!company) return res.json({ placements: [] })

  const placements = await Placement.find({ companyId: company._id })
    .populate('jobId')
    .populate('candidateId')
    .lean()

  res.json({ placements })
})

export const getAllPlacements = asyncHandler(async (req, res) => {
  const placements = await Placement.find({})
    .populate('jobId')
    .populate('candidateId')
    .populate('companyId')
    .lean()

  res.json({ placements })
})

export const updatePlacement = asyncHandler(async (req, res) => {
  const { status, offerLetterUrl, salary, joiningDate, remarks } = req.body

  const placement = await Placement.findById(req.params.id)
  if (!placement) return res.status(404).json({ message: 'Placement not found' })

  if (status) placement.status = status
  if (offerLetterUrl !== undefined) placement.offerLetterUrl = offerLetterUrl
  if (salary !== undefined) placement.salary = salary
  if (joiningDate !== undefined) placement.joiningDate = joiningDate
  if (remarks !== undefined) placement.remarks = remarks

  const updated = await placement.save()

  // Auto-cascade to Application
  const application = await Application.findById(placement.applicationId)
  if (application) {
    if (status === 'Joined') application.status = 'Joined'
    if (status === 'Placed') application.status = 'Placed'
    await application.save()
  }

  res.json({ placement: updated })
})
