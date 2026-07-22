import { RecommendationService } from '../services/ai/recommendations/recommendation.service.js';
import { Candidate } from '../models/Candidate.js';
import { Job } from '../models/Job.js';

export const getJobRecommendations = async (req, res, next) => {
  try {
    const { candidateId } = req.body;
    if (!candidateId) return res.status(400).json({ success: false, message: 'candidateId is required' });

    const candidate = await Candidate.findById(candidateId).lean();
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

    // Mock fetching available jobs for demo purposes. In real scenarios, query active jobs based on some filters
    const availableJobs = await Job.find({ isActive: true }).lean();

    const result = await RecommendationService.getJobRecommendations(candidate, availableJobs);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCandidateRecommendations = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ success: false, message: 'jobId is required' });

    const job = await Job.findById(jobId).lean();
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const availableCandidates = await Candidate.find({}).lean(); // Mock fetching

    const result = await RecommendationService.getCandidateRecommendations(job, availableCandidates);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getLearningRecommendations = async (req, res, next) => {
  try {
    const { candidateId } = req.body;
    if (!candidateId) return res.status(400).json({ success: false, message: 'candidateId is required' });

    const candidate = await Candidate.findById(candidateId).lean();
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

    const result = await RecommendationService.getLearningRecommendations(candidate);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCareerRecommendations = async (req, res, next) => {
  try {
    const { candidateId } = req.body;
    if (!candidateId) return res.status(400).json({ success: false, message: 'candidateId is required' });

    const candidate = await Candidate.findById(candidateId).lean();
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

    const result = await RecommendationService.getCareerRecommendations(candidate);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
