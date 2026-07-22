export const RecommendationValidator = {
  validateJobRecommendationRequest: (candidateId) => {
    if (!candidateId) throw new Error('candidateId is required');
  },
  validateCandidateRecommendationRequest: (jobId) => {
    if (!jobId) throw new Error('jobId is required');
  }
};
