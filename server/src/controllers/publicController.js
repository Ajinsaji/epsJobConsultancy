import { asyncHandler } from '../utils/asyncHandler.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'
import { Job } from '../models/Job.js'
import { Application } from '../models/Application.js'
import { Interview } from '../models/Interview.js'
import { Testimonial } from '../models/Testimonial.js'

export const getPublicStats = asyncHandler(async (_req, res) => {
  const [candidates, companies, openJobs, applications, interviews] =
    await Promise.all([
      Candidate.countDocuments(),
      Company.countDocuments(),
      Job.countDocuments({ status: 'Open' }),
      Application.countDocuments(),
      Interview.countDocuments(),
    ])

  res.json({
    candidates,
    companies,
    openJobs,
    applications,
    interviews,
  })
})

export const getPublicJobs = asyncHandler(async (_req, res) => {
  const jobs = await Job.find({ status: 'Open' })
    .sort({ createdAt: -1 })
    .limit(6)
    .populate('companyId')
    .lean()

  const mapped = jobs.map((job) => ({
    _id: job._id,
    title: job.title,
    companyName: job.companyId?.companyName || 'Unknown',
    location: job.companyId?.location || job.location || '',
    salary: job.salary,
    jobType: job.jobType,
  }))

  res.json(mapped)
})

export const getPublicTestimonials = asyncHandler(async (_req, res) => {
  let list = await Testimonial.find({ isActive: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean()

  if (list.length === 0) {
    // Auto-seed default testimonials if empty
    const defaults = [
      {
        name: 'Sarah Jenkins',
        role: 'Software Engineer',
        company: 'Betamind Solutions',
        message: 'Applied faster and got interviews quickly with EPS reviews.',
        rating: 5,
        isActive: true,
        displayOrder: 1,
      },
      {
        name: 'David Chen',
        role: 'Frontend Developer',
        company: 'Vercel',
        message: 'Match scores made it easy to focus on the right jobs.',
        rating: 5,
        isActive: true,
        displayOrder: 2,
      },
      {
        name: 'Elena Rostova',
        role: 'Recruiter',
        company: 'Linear',
        message: 'Shortlists were high-signal and saved us hours every week.',
        rating: 5,
        isActive: true,
        displayOrder: 3,
      },
    ]
    await Testimonial.insertMany(defaults)
    list = await Testimonial.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean()
  }

  res.json(list)
})

