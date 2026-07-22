import { AIService } from '../ai.service.js';
import { EmbeddingRepository } from './embeddingRepository.js';
import crypto from 'crypto';

export const EmbeddingService = {
  /**
   * Generates a hash to serve as a 'version' for a given text if no explicit version exists.
   */
  _generateVersionHash: (text) => {
    return crypto.createHash('md5').update(text || '').digest('hex');
  },

  /**
   * Retrieves or generates an embedding for a specific entity text.
   */
  getOrGenerateEmbedding: async (entityType, entityId, text, version, options = {}) => {
    const textVersion = version || EmbeddingService._generateVersionHash(text);
    // Use configured model or fallback for cache keying
    const modelVersion = options.modelName || 'mock-embed-v1';

    let vector = await EmbeddingRepository.getEmbedding(entityType, entityId, textVersion, modelVersion);
    
    let generated = false;
    let generationTime = 0;

    if (!vector) {
      // Need to generate via AI Platform
      const response = await AIService.embedText(text, options);
      if (!response.success || !response.data?.vector) {
        throw new Error('Failed to generate embedding vector');
      }
      
      vector = response.data.vector;
      generationTime = response.executionTime || 0;
      generated = true;

      await EmbeddingRepository.saveEmbedding(entityType, entityId, textVersion, modelVersion, vector);
    }

    return { vector, generated, generationTime };
  }
};
