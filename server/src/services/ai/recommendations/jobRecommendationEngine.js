import { MatchingService } from '../matching/matching.service.js';
import { RankingEngine } from './rankingEngine.js';
import { RecommendationExplanation } from './recommendationExplanation.js';
import { RecommendationNormalizer } from './recommendationNormalizer.js';
import { RecommendationTypes } from '../../../constants/recommendationTypes.js';
import { recommendationConfig } from '../../../config/recommendation.config.js';
import crypto from 'crypto';

export const JobRecommendationEngine = {
  /**
   * Generates a ranked list of job recommendations for a specific candidate.
   * Pipeline: Match -> Rank -> Explain -> Normalize
   */
  generate: async (candidate, availableJobs, options = {}) => {
    const recommendations = [];
    
    // Process each job through semantic matching
    for (const job of availableJobs) {
      const matchResult = await MatchingService.matchCandidateToJob(candidate, job, options);
      
      const semanticScore = matchResult.data.overallScore;
      // Mocking business factors for V1
      const skillGapScore = matchResult.data.matchedSkills.length * 10; // rough proxy
      const jobFreshnessScore = 80; // mock
      const candidatePrefScore = 70; // mock
      const businessPriorityScore = 50; // mock

      // Rank
      const finalScore = RankingEngine.rankJobRecommendation(
        semanticScore, 
        skillGapScore, 
        jobFreshnessScore, 
        candidatePrefScore, 
        businessPriorityScore,
        options.rankingProfile
      );

      if (finalScore >= recommendationConfig.thresholds.minMatchScore) {
        // Explain
        const explanation = RecommendationExplanation.generateJobExplanation(
          job, 
          finalScore, 
          matchResult.data.missingSkills,
          matchResult.data.matchedSkills
        );

        // Categorize
        let category = 'Potential Matches';
        if (finalScore >= 85) category = 'Excellent Matches';
        else if (finalScore >= 70) category = 'Strong Matches';

        // Normalize
        const metadata = {
          recommendationId: crypto.randomUUID(),
          confidence: matchResult.confidence,
          profileVersion: candidate.updatedAt ? new Date(candidate.updatedAt).getTime().toString() : 'v1',
          modelVersion: options.modelName || 'mock-embed-v1',
          cacheHit: false
        };

        const normalized = RecommendationNormalizer.normalize(RecommendationTypes.JOB, {
          score: finalScore,
          category,
          entity: job,
          explanation
        }, metadata);

        recommendations.push(normalized);
      }
    }

    // Sort descending by score
    recommendations.sort((a, b) => b.score - a.score);

    // Limit
    return recommendations.slice(0, recommendationConfig.limits.maxJobRecommendations);
  }
};
