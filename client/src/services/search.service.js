import axios from 'axios';

const API_URL = '/api/v1/search';

export const searchService = {
  /**
   * Executes a global search.
   * @param {Object} params - { q, type, page, limit, ...filters }
   */
  executeSearch: async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  /**
   * Fetches search suggestions.
   * @param {string} q - The partial query string
   */
  getSuggestions: async (q) => {
    const response = await axios.get(`${API_URL}/suggestions`, { params: { q } });
    return response.data;
  }
};
