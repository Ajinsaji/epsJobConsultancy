import { JobRecommendationEngine } from './jobRecommendationEngine.js';
import { CandidateRecommendationEngine } from './candidateRecommendationEngine.js';
import { LearningRecommendationEngine } from './learningRecommendationEngine.js';
import { CareerAdvisorEngine } from './careerAdvisor.js';
import { RecommendationCache } from './recommendationCache.js';
import { RecommendationValidator } from './recommendationValidator.js';
import { RecommendationTypes } from '../../../constants/recommendationTypes.js';
import { EventEmitter } from 'events';
import crypto from 'crypto';

export const recommendationEvents = new EventEmitter();

export const RecommendationService = {
  /**
   * Generates Job Recommendations for a Candidate
   */
  getJobRecommendations: async (candidate, availableJobs, options = {}) => {
    RecommendationValidator.validateJobRecommendationRequest(candidate._id);
    
    const startTime = Date.now();
    const candidateVersion = candidate.updatedAt ? new Date(candidate.updatedAt).getTime() : '1';
    const datasetVersion = availableJobs.length; // rough proxy for dataset version
    const modelVersion = options.modelName || 'mock-embed-v1';

    const cacheKey = RecommendationCache.generateKey(candidate._id, candidateVersion, datasetVersion, RecommendationTypes.JOB, modelVersion);
    const cached = RecommendationCache.get(cacheKey);

    if (cached) {
      recommendationEvents.emit('recommendation_viewed', { type: RecommendationTypes.JOB, candidateId: candidate._id });
      return {
        ...cached,
        executionTime: Date.now() - startTime,
        cacheHit: true
      };
    }

    const recommendations = await JobRecommendationEngine.generate(candidate, availableJobs, options);

    const response = {
      success: true,
      requestId: crypto.randomUUID(),
      provider: 'mock',
      model: modelVersion,
      executionTime: Date.now() - startTime,
      confidence: 0.94,
      cacheHit: false,
      data: {
        recommendationType: RecommendationTypes.JOB,
        recommendations
      }
    };

    RecommendationCache.set(cacheKey, response);
    recommendationEvents.emit('recommendation_generated', { type: RecommendationTypes.JOB, candidateId: candidate._id, count: recommendations.length });

    return response;
  },

  /**
   * Generates Candidate Recommendations for a Job
   */
  getCandidateRecommendations: async (job, availableCandidates, options = {}) => {
    RecommendationValidator.validateCandidateRecommendationRequest(job._id);

    const startTime = Date.now();
    const jobVersion = job.updatedAt ? new Date(job.updatedAt).getTime() : '1';
    const datasetVersion = availableCandidates.length;
    const modelVersion = options.modelName || 'mock-embed-v1';

    const cacheKey = RecommendationCache.generateKey(job._id, jobVersion, datasetVersion, RecommendationTypes.CANDIDATE, modelVersion);
    const cached = RecommendationCache.get(cacheKey);

    if (cached) {
      recommendationEvents.emit('recommendation_viewed', { type: RecommendationTypes.CANDIDATE, jobId: job._id });
      return {
        ...cached,
        executionTime: Date.now() - startTime,
        cacheHit: true
      };
    }

    const recommendations = await CandidateRecommendationEngine.generate(job, availableCandidates, options);

    const response = {
      success: true,
      requestId: crypto.randomUUID(),
      provider: 'mock',
      model: modelVersion,
      executionTime: Date.now() - startTime,
      confidence: 0.94,
      cacheHit: false,
      data: {
        recommendationType: RecommendationTypes.CANDIDATE,
        recommendations
      }
    };

    RecommendationCache.set(cacheKey, response);
    recommendationEvents.emit('recommendation_generated', { type: RecommendationTypes.CANDIDATE, jobId: job._id, count: recommendations.length });

    return response;
  },

  /**
   * Generates Learning Recommendations for a Candidate
   */
  getLearningRecommendations: async (candidate, options = {}) => {
    const startTime = Date.now();
    const candidateVersion = candidate.updatedAt ? new Date(candidate.updatedAt).getTime() : '1';
    const modelVersion = options.modelName || 'mock-gen-v1';

    const cacheKey = RecommendationCache.generateKey(candidate._id, candidateVersion, 'static', RecommendationTypes.LEARNING, modelVersion);
    const cached = RecommendationCache.get(cacheKey);

    if (cached) return { ...cached, executionTime: Date.now() - startTime, cacheHit: true };

    const recommendation = await LearningRecommendationEngine.generate(candidate, options);
    const response = {
      success: true,
      requestId: crypto.randomUUID(),
      provider: 'mock',
      model: modelVersion,
      executionTime: Date.now() - startTime,
      confidence: 0.92,
      cacheHit: false,
      data: {
        recommendationType: RecommendationTypes.LEARNING,
        recommendations: [recommendation]
      }
    };

    RecommendationCache.set(cacheKey, response);
    return response;
  },

  /**
   * Generates Career Recommendations for a Candidate
   */
  getCareerRecommendations: async (candidate, options = {}) => {
    const startTime = Date.now();
    const candidateVersion = candidate.updatedAt ? new Date(candidate.updatedAt).getTime() : '1';
    const modelVersion = options.modelName || 'mock-gen-v1';

    const cacheKey = RecommendationCache.generateKey(candidate._id, candidateVersion, 'static', RecommendationTypes.CAREER, modelVersion);
    const cached = RecommendationCache.get(cacheKey);

    if (cached) return { ...cached, executionTime: Date.now() - startTime, cacheHit: true };

    const recommendation = await CareerAdvisorEngine.generate(candidate, options);
    const response = {
      success: true,
      requestId: crypto.randomUUID(),
      provider: 'mock',
      model: modelVersion,
      executionTime: Date.now() - startTime,
      confidence: 0.88,
      cacheHit: false,
      data: {
        recommendationType: RecommendationTypes.CAREER,
        recommendations: [recommendation]
      }
    };

    RecommendationCache.set(cacheKey, response);
    return response;
  }
};
