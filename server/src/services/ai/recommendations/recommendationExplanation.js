export const RecommendationExplanation = {
  /**
   * Generates a structured explanation for a Job Recommendation based on match details.
   */
  generateJobExplanation: (job, score, missingSkills, matchedSkills) => {
    const strengths = [];
    if (matchedSkills?.length > 0) strengths.push(`Strong overlap with core skills: ${matchedSkills.slice(0, 3).join(', ')}.`);
    if (score >= 80) strengths.push('High overall semantic alignment with job description.');

    const gaps = [];
    if (missingSkills?.critical?.length > 0) {
      gaps.push(`Missing critical skills: ${missingSkills.critical.join(', ')}`);
    }

    const improvements = [];
    if (missingSkills?.critical?.length > 0) {
      improvements.push(`Upskill in ${missingSkills.critical[0]} to increase match probability significantly.`);
    }

    return {
      summary: `Recommended due to a ${score}% AI rank score indicating strong potential fit.`,
      strengths,
      gaps,
      improvements,
      nextSteps: ['Review missing skills', 'Apply if interested']
    };
  },

  /**
   * Generates a structured explanation for a Candidate Recommendation.
   */
  generateCandidateExplanation: (candidate, score, missingSkills, matchedSkills) => {
    const strengths = [];
    if (matchedSkills?.length > 0) strengths.push(`Candidate possesses ${matchedSkills.length} requested skills.`);
    if (score >= 80) strengths.push('Candidate profile strongly mirrors job requirements.');

    const gaps = [];
    if (missingSkills?.critical?.length > 0) {
      gaps.push(`Lacks critical skills: ${missingSkills.critical.join(', ')}`);
    }

    return {
      summary: `Candidate ranked at ${score}% suitability based on AI semantic matching.`,
      strengths,
      gaps,
      improvements: [],
      nextSteps: ['Review full profile', 'Schedule screening']
    };
  }
};
