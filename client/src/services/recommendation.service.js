import axios from 'axios';

export const recommendationService = {
  getJobRecommendations: async (candidateId) => {
    const response = await axios.post('/api/v1/ai/job-recommendations', { candidateId });
    return response.data;
  },
  getCandidateRecommendations: async (jobId) => {
    const response = await axios.post('/api/v1/ai/candidate-recommendations', { jobId });
    return response.data;
  },
  getLearningRecommendations: async (candidateId) => {
    const response = await axios.post('/api/v1/ai/learning-recommendations', { candidateId });
    return response.data;
  },
  getCareerRecommendations: async (candidateId) => {
    const response = await axios.post('/api/v1/ai/career-recommendations', { candidateId });
    return response.data;
  }
};
