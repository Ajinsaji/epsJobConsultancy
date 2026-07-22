export const MatchExplanation = {
  /**
   * Generates a structured explanation object for the matching results.
   */
  generate: (scores, overallScore, recommendationLevel, gapAnalysis) => {
    const strengths = [];
    const gaps = [];
    const recommendations = [];

    // Evaluate Skills
    if (scores.skills >= 85) strengths.push(`Strong alignment with required skills (${scores.skills}% match).`);
    else if (scores.skills < 60) gaps.push(`Significant skill gaps detected (${scores.skills}% match).`);

    if (gapAnalysis.missing.critical.length > 0) {
      gaps.push(`Missing critical skills: ${gapAnalysis.missing.critical.join(', ')}.`);
      recommendations.push(`Candidate should prioritize upskilling in: ${gapAnalysis.missing.critical.join(', ')}.`);
    }

    // Evaluate Experience
    if (scores.experience >= 85) strengths.push(`Experience level highly matches job requirements.`);
    else if (scores.experience < 60) gaps.push(`Experience level may be lower than expected.`);

    // Evaluate Education
    if (scores.education >= 80) strengths.push(`Education strongly aligns with requirements.`);

    return {
      summary: `Overall score of ${overallScore}% indicates a ${recommendationLevel.label}.`,
      strengths,
      gaps,
      recommendations
    };
  }
};
