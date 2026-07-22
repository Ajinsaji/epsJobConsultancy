import axios from 'axios';

const API_URL = '/api/v1/ai';

export const aiService = {
  healthCheck: async () => {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  },

  executeTask: async (task, payload) => {
    // Current generic endpoint (we only have /test mapped to runDiagnosticTest right now)
    // Future: map to /resume-analysis, /semantic-match, etc. based on task
    let endpoint = `${API_URL}/test`;
    
    // For V1.0 generic testing
    const response = await axios.post(endpoint, { task, ...payload });
    return response.data;
  }
};
