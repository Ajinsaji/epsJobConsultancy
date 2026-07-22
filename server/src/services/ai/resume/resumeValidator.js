export const validateResumeStructure = (data) => {
  if (!data || typeof data !== 'object') throw new Error('AI output is not a JSON object');

  const requiredSections = ['personalInformation', 'summary', 'skills', 'experience', 'education'];
  const optionalSections = ['projects', 'certifications', 'languages', 'softSkills'];

  const validatedData = {};

  [...requiredSections, ...optionalSections].forEach(section => {
    if (data[section]) {
      // Must have value and confidence
      if (!data[section].hasOwnProperty('value') || !data[section].hasOwnProperty('confidence')) {
        throw new Error(`Section ${section} missing value or confidence`);
      }
      validatedData[section] = data[section];
    } else if (requiredSections.includes(section)) {
      throw new Error(`Missing required section: ${section}`);
    } else {
      // Provide default empty for optional
      validatedData[section] = { value: Array.isArray(data[section]?.value) ? [] : null, confidence: 1.0 };
    }
  });

  return validatedData;
};

export const businessValidateResume = (data) => {
  // Business validation checks
  const warnings = [];

  // Check email
  const email = data.personalInformation?.value?.email;
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    warnings.push('Invalid email format detected');
  }

  // Check future graduation dates
  if (data.education?.value) {
    const currentYear = new Date().getFullYear();
    data.education.value.forEach(edu => {
      if (edu.graduationYear && parseInt(edu.graduationYear) > currentYear + 5) {
        warnings.push(`Suspicious graduation year: ${edu.graduationYear}`);
      }
    });
  }

  // Identify low confidence sections
  Object.keys(data).forEach(key => {
    if (data[key] && data[key].confidence < 0.7) {
      warnings.push(`Low confidence on section: ${key}`);
    }
  });

  return { isValid: true, warnings, data };
};
