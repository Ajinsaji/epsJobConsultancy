/**
 * Native cosine similarity implementation.
 * Compares two vectors (arrays of numbers) and returns a similarity score [-1, 1].
 * For positive-only embeddings (like OpenAI), range is [0, 1].
 */
export const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) {
    return 0; // fallback if invalid
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

export const MatchingEngine = {
  /**
   * Compares two embedding vectors.
   * Scales output to 0-100 score.
   */
  compareVectors: (vecA, vecB) => {
    const similarity = cosineSimilarity(vecA, vecB);
    // Convert to percentage, floor at 0
    return Math.max(0, Math.round(similarity * 100));
  }
};
