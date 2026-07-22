import { MatchingService } from '../matching/matching.service.js';
import { RankingEngine } from './rankingEngine.js';
import { RecommendationExplanation } from './recommendationExplanation.js';
import { RecommendationNormalizer } from './recommendationNormalizer.js';
import { RecommendationTypes } from '../../../constants/recommendationTypes.js';
import { recommendationConfig } from '../../../config/recommendation.config.js';
import crypto from 'crypto';

export const CandidateRecommendationEngine = {
  /**
   * Generates a ranked list of candidate recommendations for a specific job.
   */
  generate: async (job, availableCandidates, options = {}) => {
    const recommendations = [];
    
    for (const candidate of availableCandidates) {
      const matchResult = await MatchingService.matchCandidateToJob(candidate, job, options);
      
      const semanticScore = matchResult.data.overallScore;
      // Mocking business factors for V1
      const experienceMatchScore = matchResult.data.experienceScore || 80;
      const skillCoverageScore = matchResult.data.matchedSkills.length * 10;
      const profileCompletenessScore = 90; // mock
      const businessPriorityScore = 50; // mock

      const finalScore = RankingEngine.rankCandidateRecommendation(
        semanticScore, 
        experienceMatchScore, 
        skillCoverageScore, 
        profileCompletenessScore, 
        businessPriorityScore,
        options.rankingProfile
      );

      if (finalScore >= recommendationConfig.thresholds.minMatchScore) {
        const explanation = RecommendationExplanation.generateCandidateExplanation(
          candidate, 
          finalScore, 
          matchResult.data.missingSkills,
          matchResult.data.matchedSkills
        );

        let category = 'Potential Matches';
        if (finalScore >= 85) category = 'Excellent Matches';
        else if (finalScore >= 70) category = 'Strong Matches';

        const metadata = {
          recommendationId: crypto.randomUUID(),
          confidence: matchResult.confidence,
          profileVersion: job.updatedAt ? new Date(job.updatedAt).getTime().toString() : 'v1',
          modelVersion: options.modelName || 'mock-embed-v1',
          cacheHit: false
        };

        const normalized = RecommendationNormalizer.normalize(RecommendationTypes.CANDIDATE, {
          score: finalScore,
          category,
          entity: candidate,
          explanation
        }, metadata);

        recommendations.push(normalized);
      }
    }

    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, recommendationConfig.limits.maxCandidateRecommendations);
  }
};
