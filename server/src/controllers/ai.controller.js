import { AIService } from '../services/ai/ai.service.js';
import { ResumeIntelligenceService } from '../services/ai/resume/resume.service.js';
import { AI_TASKS } from '../constants/aiTasks.js';

export const checkHealth = async (req, res, next) => {
  try {
    const health = await AIService.healthCheck();
    res.status(200).json({ success: true, data: health });
  } catch (error) {
    next(error);
  }
};

export const runDiagnosticTest = async (req, res, next) => {
  try {
    const { message } = req.body;
    const response = await AIService.executeTask(AI_TASKS.DIAGNOSTIC_TEST, { message });
    res.status(200).json(response);
  } catch (error) {
    if (error.requestId) return res.status(500).json(error);
    next(error);
  }
};

export const processResume = async (req, res, next) => {
  try {
    const { fileUrl } = req.body;
    if (!fileUrl) {
      return res.status(400).json({ message: 'fileUrl is required' });
    }

    const structuredProfile = await ResumeIntelligenceService.processResume(fileUrl);
    
    res.status(200).json(structuredProfile);
  } catch (error) {
    // Determine if it's an AI error or standard
    if (error.requestId) return res.status(500).json(error);
    next(error);
  }
};
