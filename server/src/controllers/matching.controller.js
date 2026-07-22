import { MatchingService } from '../services/ai/matching/matching.service.js';
import { Candidate } from '../models/Candidate.js';
import { Job } from '../models/Job.js';

export const semanticMatch = async (req, res, next) => {
  try {
    const { candidateId, jobId } = req.body;

    if (!candidateId || !jobId) {
      return res.status(400).json({ success: false, message: 'candidateId and jobId are required' });
    }

    const candidate = await Candidate.findById(candidateId).lean();
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

    const job = await Job.findById(jobId).lean();
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const result = await MatchingService.matchCandidateToJob(candidate, job);
    
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
