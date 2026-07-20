import { asyncHandler } from '../utils/asyncHandler.js'
import { parseResumeText, evaluateMatch } from '../services/aiService.js'
import { Application } from '../models/Application.js'
import { Job } from '../models/Job.js'

export const parseResume = asyncHandler(async (req, res) => {
  const { resumeText } = req.body

  if (!resumeText) {
    return res.status(400).json({ message: 'resumeText is required' })
  }

  const structuredData = await parseResumeText(resumeText)
  res.json({ data: structuredData })
})

export const rankCandidatesForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params

  const job = await Job.findById(jobId)
  if (!job) return res.status(404).json({ message: 'Job not found' })

  const applications = await Application.find({ jobId }).populate('candidateId')
  if (!applications.length) {
    return res.json({ message: 'No applications to rank', rankings: [] })
  }

  const jobDescription = `Title: ${job.title}\nRequirements: ${job.requirements.join(', ')}\nDescription: ${job.description}`

  const rankings = []
  for (const app of applications) {
    // In a real production system, this should be done asynchronously/batched 
    // or using pre-computed embeddings. For now, we evaluate on-the-fly.
    
    // Only evaluate if not previously scored to save API costs
    if (app.matchScore === null || app.matchScore === undefined) {
      const candidateData = {
        skills: app.resumeSnapshot?.skills || [],
        experience: app.resumeSnapshot?.experience || '',
        education: '', // Can pull from candidate profile if available
      }

      try {
        const { score, reasoning } = await evaluateMatch(jobDescription, candidateData)
        app.matchScore = score
        app.aiRecommendation = reasoning
        await app.save()
      } catch (err) {
        console.error(`AI scoring failed for app ${app._id}:`, err)
        // Skip updating score if API fails
      }
    }

    rankings.push({
      applicationId: app._id,
      candidateName: app.candidateId?.fullName || app.resumeSnapshot?.fullName,
      score: app.matchScore,
      reasoning: app.aiRecommendation,
      status: app.status
    })
  }

  // Sort descending by score
  rankings.sort((a, b) => (b.score || 0) - (a.score || 0))

  res.json({ rankings })
})
