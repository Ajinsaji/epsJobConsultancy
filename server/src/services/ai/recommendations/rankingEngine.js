import { recommendationConfig } from '../../../config/recommendation.config.js';

export const RankingEngine = {
  /**
   * Calculates the final ranking score for a Job Recommendation based on profile configuration.
   * Inputs range from 0-100, output is 0-100.
   */
  rankJobRecommendation: (semanticScore, skillGapScore, jobFreshnessScore, candidatePrefScore, businessPriorityScore, profile = 'DEFAULT') => {
    const weights = recommendationConfig.profiles.JOB_RECOMMENDATION[profile] || recommendationConfig.profiles.JOB_RECOMMENDATION.DEFAULT;
    
    let totalScore = 0;
    totalScore += (semanticScore || 0) * weights.semanticMatch;
    totalScore += (skillGapScore || 0) * weights.skillGap;
    totalScore += (jobFreshnessScore || 0) * weights.jobFreshness;
    totalScore += (candidatePrefScore || 0) * weights.candidatePreferences;
    totalScore += (businessPriorityScore || 0) * weights.businessPriority;

    return Math.round(totalScore);
  },

  /**
   * Calculates the final ranking score for a Candidate Recommendation.
   */
  rankCandidateRecommendation: (semanticScore, experienceMatch, skillCoverage, profileCompleteness, businessPriority, profile = 'DEFAULT') => {
    const weights = recommendationConfig.profiles.CANDIDATE_RECOMMENDATION[profile] || recommendationConfig.profiles.CANDIDATE_RECOMMENDATION.DEFAULT;
    
    let totalScore = 0;
    totalScore += (semanticScore || 0) * weights.semanticMatch;
    totalScore += (experienceMatch || 0) * weights.experienceMatch;
    totalScore += (skillCoverage || 0) * weights.skillCoverage;
    totalScore += (profileCompleteness || 0) * weights.profileCompleteness;
    totalScore += (businessPriority || 0) * weights.businessPriority;

    return Math.round(totalScore);
  }
};
