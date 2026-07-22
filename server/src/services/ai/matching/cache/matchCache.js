import NodeCache from 'node-cache';
import { matchingConfig } from '../../../../config/matchingConfig.js';

// Cache instance. In a real distributed system, we would wrap Redis here.
const cache = new NodeCache({ stdTTL: matchingConfig.cacheTTL });

export const MatchCache = {
  /**
   * Generates a unique cache key based on versions.
   */
  generateKey: (candidateId, candidateVersion, jobId, jobVersion, modelVersion) => {
    return `match_${candidateId}_v${candidateVersion}_${jobId}_v${jobVersion}_m${modelVersion}`;
  },

  get: (key) => {
    return cache.get(key);
  },

  set: (key, data) => {
    cache.set(key, data);
  },

  invalidateCandidate: (candidateId) => {
    // In node-cache, we'd have to iterate keys to find prefixes. 
    // For V1.0, we just rely on the version changing in the key.
  }
};
