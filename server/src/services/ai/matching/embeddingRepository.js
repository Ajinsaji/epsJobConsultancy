// In memory map for V1.0. 
// Future: This will connect to Pinecone, Weaviate, or MongoDB Atlas Vector Search
const embeddingStorage = new Map();

export const EmbeddingRepository = {
  /**
   * Generates a storage key.
   */
  _getKey: (entityType, entityId, textVersion, modelVersion) => {
    return `${entityType}_${entityId}_v${textVersion}_m${modelVersion}`;
  },

  getEmbedding: async (entityType, entityId, textVersion, modelVersion) => {
    const key = EmbeddingRepository._getKey(entityType, entityId, textVersion, modelVersion);
    return embeddingStorage.get(key) || null;
  },

  saveEmbedding: async (entityType, entityId, textVersion, modelVersion, vector) => {
    const key = EmbeddingRepository._getKey(entityType, entityId, textVersion, modelVersion);
    embeddingStorage.set(key, vector);
  }
};
