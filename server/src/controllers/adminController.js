import mongoose from 'mongoose'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HomepageConfig } from '../models/HomepageConfig.js'
import { Placement } from '../models/Placement.js'
import { FAQ } from '../models/FAQ.js'
import { Service } from '../models/Service.js'
import { Company } from '../models/Company.js'
import { Testimonial } from '../models/Testimonial.js'
import { ActivityLog } from '../models/ActivityLog.js'
import { Job } from '../models/Job.js'
import { Candidate } from '../models/Candidate.js'
import { User } from '../models/User.js'

// System logs placeholder
export const getSystemLogs = asyncHandler(async (req, res) => {
  res.json({ logs: [] })
})

// Activity logs endpoint
export const getAdminActivities = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(10).lean()
  res.json(logs)
})

// Platform Health and system overview counters
export const getPlatformHealth = asyncHandler(async (req, res) => {
  const dbState = mongoose.connection.readyState
  const dbStatus = dbState === 1 ? 'Connected' : dbState === 2 ? 'Connecting' : 'Disconnected'
  
  let config = await HomepageConfig.findOne({ key: 'main' })
  let homepageConfigStatus = 'Default'
  let visibleSectionsCount = 0
  let lastConfigUpdate = null

  if (config) {
    homepageConfigStatus = 'Configured'
    lastConfigUpdate = config.updatedAt
    if (config.visibleSections) {
      if (config.visibleSections instanceof Map) {
        visibleSectionsCount = Array.from(config.visibleSections.values()).filter(Boolean).length
      } else {
        visibleSectionsCount = Object.values(config.visibleSections).filter(Boolean).length
      }
    }
  }

  // System overview counters
  const [
    totalPartners,
    totalJobs,
    totalCandidates,
    totalEmployers,
    totalPlacements,
    totalTestimonials,
    totalFAQs,
    totalServices
  ] = await Promise.all([
    Company.countDocuments({ isPartner: true }),
    Job.countDocuments({ status: 'Open', isActive: true }),
    Candidate.countDocuments(),
    Company.countDocuments(),
    Placement.countDocuments(),
    Testimonial.countDocuments(),
    FAQ.countDocuments(),
    Service.countDocuments()
  ])

  res.json({
    success: true,
    data: {
      health: {
        dbStatus,
        apiStatus: 'Healthy',
        homepageConfigStatus,
        visibleSectionsCount,
        lastConfigUpdate
      },
      overview: {
        totalPartners,
        totalJobs,
        totalCandidates,
        totalEmployers,
        totalPlacements,
        totalTestimonials,
        totalFAQs,
        totalServices
      }
    }
  })
})


// Homepage Config CMS
export const getAdminHomepageConfig = asyncHandler(async (req, res) => {
  let config = await HomepageConfig.findOne({ status: 'draft' })
  if (!config) {
    config = await HomepageConfig.create({ key: 'homepage', status: 'draft', version: 1 })
  }
  
  // Find current published configuration to get the current version and publisher metadata
  const publishedConfig = await HomepageConfig.findOne({ status: 'published' }).sort({ version: -1 })
  
  res.json({
    draft: config,
    publishedVersion: publishedConfig ? publishedConfig.version : null,
    lastPublishedBy: publishedConfig ? publishedConfig.publishedBy : null,
    lastPublishedAt: publishedConfig ? publishedConfig.publishedAt : null
  })
})

export const updateHomepageConfig = asyncHandler(async (req, res) => {
  const updateData = req.body

  let config = await HomepageConfig.findOne({ status: 'draft' })
  if (!config) {
    config = new HomepageConfig({ key: 'homepage', status: 'draft', version: 1 })
  }

  const editableFields = [
    'heroBadge', 'heroHeadline', 'heroSubheading', 'primaryCtaText', 'secondaryCtaText',
    'whyChooseCards', 'sectionOrder', 'visibleSections',
    'footerContactEmail', 'footerContactPhone', 'footerContactAddress', 'footerCopyright', 'footerNewsletterText', 'footerSocialLinks',
    'seoTitle', 'seoDescription', 'seoOgTitle', 'seoOgDescription', 'seoFavicon', 'seoSocialImage'
  ]

  editableFields.forEach(field => {
    if (updateData[field] !== undefined) {
      config[field] = updateData[field]
    }
  })

  config.draftLastUpdatedAt = new Date()
  await config.save()

  // Log activity
  await ActivityLog.create({
    action: 'Updated Homepage settings draft configuration',
    user: req.user?.email || 'System'
  })

  res.json(config)
})

export const publishHomepageConfig = asyncHandler(async (req, res) => {
  // 1. Get draft
  let draft = await HomepageConfig.findOne({ status: 'draft' })
  if (!draft) {
    return res.status(404).json({ success: false, message: 'Draft configuration not found' })
  }

  // 2. Find current published configuration to get the current version
  const currentPublished = await HomepageConfig.findOne({ status: 'published' }).sort({ version: -1 })
  const newVersion = currentPublished ? currentPublished.version + 1 : 1

  // 3. Mark the current published configurations as archived
  if (currentPublished) {
    await HomepageConfig.updateMany({ status: 'published' }, { $set: { status: 'archived' } })
  }

  // 4. Create new published document copying the draft data
  const publishedData = draft.toObject()
  delete publishedData._id
  delete publishedData.createdAt
  delete publishedData.updatedAt

  const publishedConfig = await HomepageConfig.create({
    ...publishedData,
    status: 'published',
    version: newVersion,
    publishedBy: req.user?.email || 'System',
    publishedAt: new Date()
  })

  // 5. Update draft metadata to match published details
  draft.version = newVersion
  draft.publishedBy = req.user?.email || 'System'
  draft.publishedAt = new Date()
  await draft.save()

  // 6. Write ActivityLog entry
  await ActivityLog.create({
    action: `Published Homepage Configuration Version ${newVersion}`,
    user: req.user?.email || 'System'
  })

  res.json({
    success: true,
    message: `Homepage Configuration Version ${newVersion} published successfully`,
    data: {
      version: newVersion,
      publishedBy: publishedConfig.publishedBy,
      publishedAt: publishedConfig.publishedAt
    }
  })
})


// Placements CMS
export const getAdminPlacements = asyncHandler(async (req, res) => {
  const list = await Placement.find().sort({ displayOrder: 1, createdAt: -1 })
  res.json(list)
})

export const createPlacement = asyncHandler(async (req, res) => {
  const { candidateName, candidatePhoto, companyName, companyLogo, position, salary, joiningDate, displayOrder, isActive } = req.body
  const placement = await Placement.create({
    candidateName,
    candidatePhoto,
    companyName,
    companyLogo,
    position,
    salary,
    joiningDate,
    displayOrder,
    isActive
  })

  // Log activity
  await ActivityLog.create({
    action: `Published Placement: ${candidateName} at ${companyName}`,
    user: req.user?.email || 'System'
  })

  res.status(201).json(placement)
})

export const updatePlacement = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const placement = await Placement.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
  if (!placement) return res.status(404).json({ message: 'Placement not found' })

  // Log activity
  await ActivityLog.create({
    action: `Updated Placement details for: ${placement.candidateName}`,
    user: req.user?.email || 'System'
  })

  res.json(placement)
})

export const deletePlacement = asyncHandler(async (req, res) => {
  const { id } = req.params
  const placement = await Placement.findById(id)
  if (!placement) return res.status(404).json({ message: 'Placement not found' })

  await Placement.findByIdAndDelete(id)

  // Log activity
  await ActivityLog.create({
    action: `Deleted Placement profile of: ${placement.candidateName}`,
    user: req.user?.email || 'System'
  })

  res.json({ message: 'Placement deleted successfully' })
})

// FAQs CMS
export const getAdminFAQs = asyncHandler(async (req, res) => {
  const list = await FAQ.find().sort({ displayOrder: 1, createdAt: -1 })
  res.json(list)
})

export const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, displayOrder, isActive } = req.body
  const faq = await FAQ.create({ question, answer, displayOrder, isActive })

  // Log activity
  await ActivityLog.create({
    action: `Created FAQ: "${question.substring(0, 30)}..."`,
    user: req.user?.email || 'System'
  })

  res.status(201).json(faq)
})

export const updateFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const faq = await FAQ.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
  if (!faq) return res.status(404).json({ message: 'FAQ not found' })

  // Log activity
  await ActivityLog.create({
    action: `Updated FAQ: "${faq.question.substring(0, 30)}..."`,
    user: req.user?.email || 'System'
  })

  res.json(faq)
})

export const deleteFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params
  const faq = await FAQ.findById(id)
  if (!faq) return res.status(404).json({ message: 'FAQ not found' })

  await FAQ.findByIdAndDelete(id)

  // Log activity
  await ActivityLog.create({
    action: `Deleted FAQ: "${faq.question.substring(0, 30)}..."`,
    user: req.user?.email || 'System'
  })

  res.json({ message: 'FAQ deleted successfully' })
})

// Services CMS
export const getAdminServices = asyncHandler(async (req, res) => {
  const list = await Service.find().sort({ displayOrder: 1, createdAt: -1 })
  res.json(list)
})

export const createService = asyncHandler(async (req, res) => {
  const { title, description, icon, displayOrder, isActive } = req.body
  const service = await Service.create({ title, description, icon, displayOrder, isActive })

  // Log activity
  await ActivityLog.create({
    action: `Created Service: ${title}`,
    user: req.user?.email || 'System'
  })

  res.status(201).json(service)
})

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const service = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
  if (!service) return res.status(404).json({ message: 'Service not found' })

  // Log activity
  await ActivityLog.create({
    action: `Updated Service: ${service.title}`,
    user: req.user?.email || 'System'
  })

  res.json(service)
})

export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params
  const service = await Service.findById(id)
  if (!service) return res.status(404).json({ message: 'Service not found' })

  await Service.findByIdAndDelete(id)

  // Log activity
  await ActivityLog.create({
    action: `Deleted Service: ${service.title}`,
    user: req.user?.email || 'System'
  })

  res.json({ message: 'Service deleted successfully' })
})

// Companies CMS Partner Info
export const getAdminCompanies = asyncHandler(async (req, res) => {
  const list = await Company.find().sort({ companyName: 1 })
  res.json(list)
})

export const updateCompanyHomepageProps = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { logo, companySize, isPartner, showOnHomepage, displayOrder, verified, companyName, industry, location, website } = req.body

  const company = await Company.findById(id)
  if (!company) return res.status(404).json({ message: 'Company not found' })

  if (logo !== undefined) company.logo = logo
  if (companySize !== undefined) company.companySize = companySize
  if (isPartner !== undefined) company.isPartner = isPartner
  if (showOnHomepage !== undefined) company.showOnHomepage = showOnHomepage
  if (displayOrder !== undefined) company.displayOrder = displayOrder
  if (verified !== undefined) company.verified = verified
  if (companyName !== undefined) company.companyName = companyName
  if (industry !== undefined) company.industry = industry
  if (location !== undefined) company.location = location
  if (website !== undefined) company.website = website

  await company.save()

  // Log activity
  await ActivityLog.create({
    action: `Updated Partner settings for: ${company.companyName}`,
    user: req.user?.email || 'System'
  })

  res.json(company)
})

// Testimonials CMS
export const getAdminTestimonials = asyncHandler(async (req, res) => {
  const list = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 })
  res.json(list)
})

export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, role, company, message, rating, isActive, displayOrder, type, featured } = req.body
  const testimonial = await Testimonial.create({
    name,
    role,
    company,
    message,
    rating,
    isActive,
    displayOrder,
    type,
    featured
  })

  // Log activity
  await ActivityLog.create({
    action: `Created Testimonial for: ${name} (${type})`,
    user: req.user?.email || 'System'
  })

  res.status(201).json(testimonial)
})

export const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' })

  // Log activity
  await ActivityLog.create({
    action: `Updated Testimonial for: ${testimonial.name}`,
    user: req.user?.email || 'System'
  })

  res.json(testimonial)
})

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params
  const testimonial = await Testimonial.findById(id)
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' })

  await Testimonial.findByIdAndDelete(id)

  // Log activity
  await ActivityLog.create({
    action: `Deleted Testimonial of: ${testimonial.name}`,
    user: req.user?.email || 'System'
  })

  res.json({ message: 'Testimonial deleted successfully' })
})
