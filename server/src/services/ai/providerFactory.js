import { MockProvider } from './providers/mock.provider.js';
import { OpenAIProvider } from './providers/openai.provider.js';
import { aiConfig } from '../../config/aiConfig.js';

export const ProviderFactory = {
  getProvider: (providerName = aiConfig.provider) => {
    switch (providerName.toLowerCase()) {
      case 'mock':
        return MockProvider;
      case 'openai':
        return OpenAIProvider;
      // Add 'claude', 'gemini', 'local' as needed
      default:
        console.warn(`[ProviderFactory] Unknown provider '${providerName}'. Falling back to mock.`);
        return MockProvider;
    }
  }
};
