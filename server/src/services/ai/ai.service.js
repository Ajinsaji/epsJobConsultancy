import { ProviderFactory } from './providerFactory.js';
import { getPromptBuilder } from './prompts/index.js';
import { formatAiResponse } from './utils/aiResponseFormatter.js';
import { formatAiError } from './utils/aiErrorFormatter.js';
import { aiConfig } from '../../config/aiConfig.js';
import { AI_TASKS } from '../../constants/aiTasks.js';

export const AIService = {
  /**
   * Executes a specific AI task securely.
   * 
   * @param {string} task - Defined in aiTasks.js
   * @param {object} payload - The input data needed for the prompt
   * @param {object} options - Optional overrides for provider, model, etc.
   */
  executeTask: async (task, payload, options = {}) => {
    const providerName = options.provider || aiConfig.provider;
    const provider = ProviderFactory.getProvider(providerName);
    const model = options.modelName || aiConfig.modelName;
    
    try {
      const promptBuilder = getPromptBuilder(task);
      const promptText = promptBuilder(payload);
      
      const providerResponse = await provider.generate(promptText, {
        ...aiConfig,
        ...options,
        modelName: model,
        task // Pass task so mock can branch on it
      });

      // Provider response format is expected to have { executionTimeMs, confidence, estimatedTokens, data }
      return formatAiResponse({
        task,
        provider: providerName,
        model,
        executionTimeMs: providerResponse.executionTimeMs,
        confidence: providerResponse.confidence,
        estimatedTokens: providerResponse.estimatedTokens,
        data: providerResponse.data
      });
      
    } catch (error) {
      // Create unified error format
      const formattedError = formatAiError(error, providerName, task);
      console.error(`[AIService] Task ${task} failed via ${providerName}`, formattedError);
      throw formattedError;
    }
  },

  /**
   * Generates embeddings for the provided text.
   */
  embedText: async (text, options = {}) => {
    const providerName = options.provider || aiConfig.provider;
    const provider = ProviderFactory.getProvider(providerName);
    
    try {
      const response = await provider.embed(text, options);
      return formatAiResponse({
        task: 'EMBEDDING',
        provider: providerName,
        model: response.model,
        executionTimeMs: response.executionTimeMs,
        confidence: response.confidence,
        estimatedTokens: response.estimatedTokens,
        data: response.data
      });
    } catch (error) {
      throw formatAiError(error, providerName, 'EMBEDDING');
    }
  },

  /**
   * Get health and diagnostics of active provider
   */
  healthCheck: async () => {
    const provider = ProviderFactory.getProvider();
    return await provider.healthCheck();
  }
};
