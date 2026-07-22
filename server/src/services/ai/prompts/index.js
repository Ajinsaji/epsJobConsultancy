import { AI_TASKS } from '../../../constants/aiTasks.js';
import { buildResumeAnalysisPrompt } from './resumeAnalysis.v1.js';

export const getPromptBuilder = (task) => {
  switch (task) {
    case AI_TASKS.RESUME_ANALYSIS:
      return buildResumeAnalysisPrompt;
    case AI_TASKS.DIAGNOSTIC_TEST:
      return (payload) => `Diagnostic Test: ${payload?.message || 'Hello AI'}`;
    // Add future tasks here
    default:
      throw new Error(`No prompt builder found for task: ${task}`);
  }
};
