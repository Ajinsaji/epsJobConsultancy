export const RECOMMENDATION_LEVELS = {
  EXCELLENT: {
    code: 'EXCELLENT',
    label: 'Excellent Match',
    minScore: 95
  },
  STRONG: {
    code: 'STRONG',
    label: 'Strong Match',
    minScore: 80
  },
  POTENTIAL: {
    code: 'POTENTIAL',
    label: 'Potential Match',
    minScore: 65
  },
  WEAK: {
    code: 'WEAK',
    label: 'Weak Match',
    minScore: 0
  }
};

export const getRecommendationLevel = (score) => {
  if (score >= RECOMMENDATION_LEVELS.EXCELLENT.minScore) return RECOMMENDATION_LEVELS.EXCELLENT;
  if (score >= RECOMMENDATION_LEVELS.STRONG.minScore) return RECOMMENDATION_LEVELS.STRONG;
  if (score >= RECOMMENDATION_LEVELS.POTENTIAL.minScore) return RECOMMENDATION_LEVELS.POTENTIAL;
  return RECOMMENDATION_LEVELS.WEAK;
};
