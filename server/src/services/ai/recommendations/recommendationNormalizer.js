export const RecommendationNormalizer = {
  /**
   * Normalizes standard recommendation output payload.
   */
  normalize: (recommendationType, payload, metadata) => {
    return {
      recommendationId: metadata.recommendationId || require('crypto').randomUUID(),
      type: recommendationType,
      score: payload.score || 0,
      confidence: metadata.confidence || 0.90,
      category: payload.category || 'Potential Matches',
      generatedAt: new Date().toISOString(),
      profileVersion: metadata.profileVersion || 'v1',
      modelVersion: metadata.modelVersion || 'v1',
      cacheHit: metadata.cacheHit || false,
      entity: payload.entity, // The actual candidate or job object
      explanation: payload.explanation,
      learningPaths: payload.learningPaths || [], // For learning recs
      careerInsights: payload.careerInsights || {} // For career recs
    };
  }
};
