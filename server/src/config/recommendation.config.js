export const recommendationConfig = {
  limits: {
    maxJobRecommendations: 20,
    maxCandidateRecommendations: 30,
    maxLearningSuggestions: 10,
    maxCareerSuggestions: 5
  },
  cache: {
    ttlSeconds: 3600 // 1 hour
  },
  thresholds: {
    minMatchScore: 40 // don't recommend if below this
  },
  profiles: {
    JOB_RECOMMENDATION: {
      DEFAULT: {
        semanticMatch: 0.50,
        skillGap: 0.20,
        jobFreshness: 0.15,
        candidatePreferences: 0.10,
        businessPriority: 0.05
      },
      ENTRY_LEVEL: {
        semanticMatch: 0.40,
        skillGap: 0.10,
        jobFreshness: 0.20,
        candidatePreferences: 0.15,
        businessPriority: 0.15
      }
    },
    CANDIDATE_RECOMMENDATION: {
      DEFAULT: {
        semanticMatch: 0.55,
        experienceMatch: 0.20,
        skillCoverage: 0.15,
        profileCompleteness: 0.05,
        businessPriority: 0.05
      },
      EXPERIENCED: {
        semanticMatch: 0.45,
        experienceMatch: 0.35,
        skillCoverage: 0.15,
        profileCompleteness: 0.05,
        businessPriority: 0.00
      }
    }
  }
};
