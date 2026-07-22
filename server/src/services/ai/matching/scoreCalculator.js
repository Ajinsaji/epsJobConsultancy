export const ScoreCalculator = {
  /**
   * Calculates the overall weighted score based on individual similarity scores.
   * Scores should be 0-100.
   */
  calculateWeightedScore: (scores, weights) => {
    let totalScore = 0;
    let totalWeight = 0;

    for (const [key, score] of Object.entries(scores)) {
      if (weights[key] !== undefined) {
        totalScore += score * weights[key];
        totalWeight += weights[key];
      }
    }

    if (totalWeight === 0) return 0;
    
    // Normalize in case weights don't exactly equal 1
    return Math.round(totalScore / totalWeight);
  }
};
