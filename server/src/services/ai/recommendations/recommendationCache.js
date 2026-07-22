import NodeCache from 'node-cache';
import { recommendationConfig } from '../../../config/recommendation.config.js';

// Internal cache instance. Later can be swapped for Redis.
const cache = new NodeCache({ stdTTL: recommendationConfig.cache.ttlSeconds });

export const RecommendationCache = {
  /**
   * Generates a fully qualified cache key using entity versions.
   */
  generateKey: (candidateId, candidateVersion, datasetVersion, recommendationType, modelVersion) => {
    return `rec_${recommendationType}_c${candidateId}_cv${candidateVersion}_dv${datasetVersion}_m${modelVersion}`;
  },

  get: (key) => {
    return cache.get(key);
  },

  set: (key, data) => {
    cache.set(key, data);
  },

  clear: (key) => {
    cache.del(key);
  }
};
