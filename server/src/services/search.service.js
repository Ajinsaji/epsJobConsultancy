import { SearchRepository } from '../repositories/search.repository.js';

export const SearchService = {
  /**
   * Executes a unified search across multiple domains.
   * @param {string} query - The search text
   * @param {Array<string>} types - Array of types (jobs, candidates, companies)
   * @param {Object} filters - Extracted filters
   * @param {number} page - Current page
   * @param {number} limit - Results per page
   * @returns {Object} Search results and pagination metadata
   */
  executeSearch: async (query, types, filters, page, limit) => {
    const skip = (page - 1) * limit;
    
    // We run queries in parallel using Promise.all for better performance
    const promises = [];
    const resultKeys = [];

    const searchJobs = types.includes('jobs') || types.includes('all');
    const searchCandidates = types.includes('candidates') || types.includes('all');
    const searchCompanies = types.includes('companies') || types.includes('all');

    if (searchJobs) {
      promises.push(SearchRepository.searchJobs(query, filters, limit, skip));
      promises.push(SearchRepository.countJobs(query, filters));
      resultKeys.push('jobs', 'jobsCount');
    }

    if (searchCandidates) {
      promises.push(SearchRepository.searchCandidates(query, filters, limit, skip));
      promises.push(SearchRepository.countCandidates(query, filters));
      resultKeys.push('candidates', 'candidatesCount');
    }

    if (searchCompanies) {
      promises.push(SearchRepository.searchCompanies(query, filters, limit, skip));
      promises.push(SearchRepository.countCompanies(query, filters));
      resultKeys.push('companies', 'companiesCount');
    }

    const resultsArray = await Promise.all(promises);

    const data = {
      jobs: [],
      candidates: [],
      companies: []
    };

    let totalResults = 0;

    // Map resolved promises back to their keys
    for (let i = 0; i < resultKeys.length; i += 2) {
      const typeKey = resultKeys[i];
      const countKey = resultKeys[i + 1];
      
      data[typeKey] = resultsArray[i];
      totalResults += resultsArray[i + 1];
    }

    return {
      data,
      totalResults,
    };
  }
};
