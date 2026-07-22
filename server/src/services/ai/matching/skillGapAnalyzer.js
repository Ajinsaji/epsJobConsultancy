export const SkillGapAnalyzer = {
  /**
   * Identifies matched and missing skills between a job's required skills and a candidate's skills.
   * Categorizes missing skills based on job definition.
   * 
   * @param {Array} jobSkills - Array of objects or strings: [{ name: 'React', priority: 'Critical' }, ...]
   * @param {Array} candidateSkills - Array of strings: ['React', 'Node']
   */
  analyzeGaps: (jobSkills = [], candidateSkills = []) => {
    const candidateSet = new Set(candidateSkills.map(s => s.toLowerCase()));
    
    const matched = [];
    const missing = {
      critical: [],
      important: [],
      optional: []
    };

    jobSkills.forEach(skillDef => {
      const skillName = typeof skillDef === 'string' ? skillDef : skillDef.name;
      const priority = typeof skillDef === 'string' ? 'important' : (skillDef.priority || 'important').toLowerCase();
      
      if (candidateSet.has(skillName.toLowerCase())) {
        matched.push(skillName);
      } else {
        if (priority === 'critical') missing.critical.push(skillName);
        else if (priority === 'optional') missing.optional.push(skillName);
        else missing.important.push(skillName);
      }
    });

    return { matched, missing };
  }
};
