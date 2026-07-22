export const buildResumeAnalysisPrompt = (payload) => {
  return `
    Analyze the following resume and extract structured data:
    ---
    ${payload.resumeText}
    ---
  `;
};
