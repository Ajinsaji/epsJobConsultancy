export const normalizeSkill = (skill) => {
  if (!skill) return '';
  const cleaned = skill.trim();
  
  // Example normalization mappings
  const mappings = {
    'reactjs': 'React',
    'react.js': 'React',
    'react': 'React',
    'node.js': 'Node.js',
    'nodejs': 'Node.js',
    'vuejs': 'Vue.js',
    'vue': 'Vue.js',
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'typescript': 'TypeScript',
    'ts': 'TypeScript'
  };

  const key = cleaned.toLowerCase();
  return mappings[key] || cleaned;
};

export const normalizeResumeData = (data) => {
  const normalized = JSON.parse(JSON.stringify(data)); // Deep copy

  // 1. Normalize Skills (deduplicate & map)
  if (normalized.skills?.value && Array.isArray(normalized.skills.value)) {
    const rawSkills = normalized.skills.value;
    const mappedSkills = rawSkills.map(normalizeSkill).filter(Boolean);
    // Deduplicate
    normalized.skills.value = [...new Set(mappedSkills)];
  }

  // 2. Format names/titles (basic capitalization)
  if (normalized.personalInformation?.value?.name) {
    const name = normalized.personalInformation.value.name;
    normalized.personalInformation.value.name = name.replace(/\b\w/g, l => l.toUpperCase());
  }

  return normalized;
};
