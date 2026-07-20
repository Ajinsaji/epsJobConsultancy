import { Placement } from '../models/Placement.js'
import { Application } from '../models/Application.js'
import { Job } from '../models/Job.js'
import { Company } from '../models/Company.js'
import { Candidate } from '../models/Candidate.js'
import { Interview } from '../models/Interview.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  // Aggregate KPIs
  const [
    totalPlacements,
    totalJobs,
    totalApplications,
    totalCandidates,
    totalCompanies,
    totalInterviews
  ] = await Promise.all([
    Placement.countDocuments(),
    Job.countDocuments(),
    Application.countDocuments(),
    Candidate.countDocuments(),
    Company.countDocuments(),
    Interview.countDocuments()
  ])

  // Application Status Distribution
  const applicationStatusRaw = await Application.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ])
  const applicationStatusDistribution = applicationStatusRaw.reduce((acc, curr) => {
    acc[curr._id] = curr.count
    return acc
  }, {})

  // Recent Placements
  const recentPlacements = await Placement.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean()

  res.json({
    kpis: {
      totalPlacements,
      totalJobs,
      totalApplications,
      totalCandidates,
      totalCompanies,
      totalInterviews,
      successRate: totalApplications > 0 ? Math.round((totalPlacements / totalApplications) * 100) : 0
    },
    applicationStatusDistribution,
    recentPlacements
  })
})
