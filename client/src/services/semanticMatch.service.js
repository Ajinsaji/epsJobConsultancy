import axios from 'axios';

export const semanticMatchService = {
  getMatchScore: async (candidateId, jobId) => {
    try {
      const response = await axios.post('/api/v1/ai/semantic-match', { candidateId, jobId });
      return response.data;
    } catch (error) {
      console.error('Failed to get match score:', error);
      throw error;
    }
  }
};
