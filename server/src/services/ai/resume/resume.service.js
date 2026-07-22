import { parseResume } from './resumeParser.js';
import { validateResumeStructure, businessValidateResume } from './resumeValidator.js';
import { normalizeResumeData } from './resumeNormalizer.js';
import { AIService } from '../ai.service.js';
import { AI_TASKS } from '../../../constants/aiTasks.js';

export const ResumeIntelligenceService = {
  /**
   * Processes a resume file through the intelligence pipeline.
   * Upload -> Parse -> AI -> Validate -> Normalize
   */
  processResume: async (fileUrl) => {
    try {
      // 1. Text Extraction
      const text = await parseResume(fileUrl);
      
      // 2. AI Processing
      const aiResponse = await AIService.executeTask(AI_TASKS.RESUME_ANALYSIS, { resumeText: text });
      
      if (!aiResponse.success || !aiResponse.data) {
        throw new Error('AI processing failed to return data');
      }

      const rawAiData = aiResponse.data;

      // 3. Structural Validation
      const structurallyValid = validateResumeStructure(rawAiData);

      // 4. Normalization
      const normalizedData = normalizeResumeData(structurallyValid);

      // 5. Business Validation
      const { isValid, warnings, data: finalData } = businessValidateResume(normalizedData);

      // 6. Return Structured Package
      return {
        success: true,
        metadata: {
          schemaVersion: "1.0",
          analysisVersion: "1.0",
          provider: aiResponse.provider,
          model: aiResponse.model,
          requestId: aiResponse.requestId,
          generatedAt: new Date().toISOString(),
          warnings
        },
        rawAiData,
        normalizedProfile: finalData
      };
      
    } catch (error) {
      console.error('[ResumeIntelligence] Processing failed:', error);
      throw error;
    }
  }
};
