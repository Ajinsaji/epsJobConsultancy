import { asyncHandler } from '../utils/asyncHandler.js'
import { Candidate } from '../models/Candidate.js'
import { Company } from '../models/Company.js'
import { Job } from '../models/Job.js'
import { Application } from '../models/Application.js'
import { Interview } from '../models/Interview.js'
import { Testimonial } from '../models/Testimonial.js'
import { Placement } from '../models/Placement.js'
import { FAQ } from '../models/FAQ.js'
import { Service } from '../models/Service.js'
import { HomepageConfig } from '../models/HomepageConfig.js'

// Fetch Homepage configuration
export const getHomepageConfig = asyncHandler(async (req, res) => {
  let config = await HomepageConfig.findOne({ status: 'published' }).lean()
  if (!config) {
    config = await HomepageConfig.findOne({ status: 'draft' }).lean()
    if (!config) {
      config = {
        key: 'homepage',
        status: 'published',
        version: 0,
        heroBadge: 'Trusted Recruitment Partner',
        heroHeadline: 'Find Jobs. Hire Talent. Grow Faster.',
        heroSubheading: 'EPS Job Consultancy is a hybrid recruitment platform that bridges the gap between top-tier talent and leading companies.',
        whyChooseCards: [
          { title: 'Verified Companies', description: 'Partner with verified employers hiring active tech professionals.', icon: 'ShieldCheck' },
          { title: 'Dedicated HR Support', description: 'Our experts guide candidate screening and coordinate interview processes.', icon: 'Users' },
          { title: 'AI Resume Scoring', description: 'Get direct feedback and match scores for your targeted role applications.', icon: 'Cpu' },
          { title: 'Fast & Efficient', description: 'Reduce hiring times by up to 40% with pre-screened shortlists.', icon: 'Zap' }
        ],
        sectionOrder: [
          'hero',
          'benefits_candidate',
          'benefits_employer',
          'statistics',
          'how_it_works',
          'testimonials',
          'featured_jobs',
          'partners',
          'placements',
          'faqs',
          'cta'
        ],
        visibleSections: {
          hero: true,
          benefits_candidate: true,
          benefits_employer: true,
          statistics: true,
          how_it_works: true,
          testimonials: true,
          featured_jobs: true,
          partners: true,
          placements: true,
          faqs: true,
          cta: true
        }
      }
    }
  }

  res.json({
    success: true,
    message: 'Homepage configuration fetched successfully',
    data: config
  })
})

// Public Platform Statistics
export const getPublicStats = asyncHandler(async (_req, res) => {
  const [candidates, companies, openJobs, interviews, placements] =
    await Promise.all([
      Candidate.countDocuments(),
      Company.countDocuments(),
      Job.countDocuments({ status: 'Open', isActive: true }),
      Interview.countDocuments(),
      Placement.countDocuments({ isActive: true })
    ])

  let hiringSuccessRate = 96
  const totalDecided = await Application.countDocuments({ status: { $in: ['Selected', 'Rejected'] } })
  if (totalDecided > 0) {
    const selected = await Application.countDocuments({ status: 'Selected' })
    hiringSuccessRate = Math.min(100, Math.max(70, Math.round((selected / totalDecided) * 100)))
  }

  res.json({
    success: true,
    message: 'Platform statistics fetched successfully',
    data: {
      candidates,
      companies,
      openJobs,
      interviews,
      placements,
      hiringSuccessRate
    }
  })
})

// Latest Open Jobs with pagination
export const getPublicJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 6
  const skip = (page - 1) * limit

  const query = { status: 'Open', isActive: true }
  const total = await Job.countDocuments(query)

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'companyId',
      select: 'companyName logo location' // Select only fields needed in UI
    })
    .lean()

  const mapped = jobs.map((job) => ({
    _id: job._id,
    title: job.title,
    companyName: job.companyId?.companyName || 'Unknown',
    companyLogo: job.companyId?.logo || '',
    location: job.location || job.companyId?.location || 'Remote',
    salary: job.salary || 'Competitive',
    jobType: job.jobType || 'Full-time',
    experience: job.experience || 'Not specified'
  }))

  res.json({
    success: true,
    message: 'Jobs fetched successfully',
    data: mapped,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Partner Companies with pagination
export const getPublicPartners = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const skip = (page - 1) * limit

  const query = { showOnHomepage: true }
  const total = await Company.countDocuments(query)

  const companies = await Company.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  const mapped = await Promise.all(
    companies.map(async (c) => {
      const openPositions = await Job.countDocuments({ companyId: c._id, status: 'Open', isActive: true })
      return {
        _id: c._id,
        companyName: c.companyName,
        industry: c.industry || 'Technology',
        location: c.location || 'Remote',
        logo: c.logo || '',
        companySize: c.companySize || '50-200',
        website: c.website || '',
        verified: c.verified || false,
        isPartner: c.isPartner || false,
        openPositions
      }
    })
  )

  res.json({
    success: true,
    message: 'Partner companies fetched successfully',
    data: mapped,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Partner Logo Marquee (lightweight)
export const getPublicPartnersMarquee = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 100
  const skip = (page - 1) * limit

  const query = { showOnHomepage: true }
  const total = await Company.countDocuments(query)

  const companies = await Company.find(query)
    .select('companyName logo verified displayOrder')
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  res.json({
    success: true,
    message: 'Marquee partners fetched successfully',
    data: companies,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Candidate Testimonials with pagination
export const getPublicCandidateTestimonials = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const query = { isActive: true, type: 'candidate' }
  const total = await Testimonial.countDocuments(query)

  const list = await Testimonial.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  res.json({
    success: true,
    message: 'Candidate testimonials fetched successfully',
    data: list,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Employer Testimonials with pagination
export const getPublicEmployerTestimonials = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const query = { isActive: true, type: 'employer' }
  const total = await Testimonial.countDocuments(query)

  const list = await Testimonial.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  res.json({
    success: true,
    message: 'Employer testimonials fetched successfully',
    data: list,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Recently Placed Candidates with pagination
export const getPublicPlacements = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 8
  const skip = (page - 1) * limit

  const query = { isActive: true }
  const total = await Placement.countDocuments(query)

  const list = await Placement.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  res.json({
    success: true,
    message: 'Placed candidates fetched successfully',
    data: list,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// FAQs list with pagination
export const getPublicFAQs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 12
  const skip = (page - 1) * limit

  const query = { isActive: true }
  const total = await FAQ.countDocuments(query)

  const list = await FAQ.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  res.json({
    success: true,
    message: 'FAQs fetched successfully',
    data: list,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})

// Services list with pagination
export const getPublicServices = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 8
  const skip = (page - 1) * limit

  const query = { isActive: true }
  const total = await Service.countDocuments(query)

  const list = await Service.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  res.json({
    success: true,
    message: 'Services fetched successfully',
    data: list,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
})
