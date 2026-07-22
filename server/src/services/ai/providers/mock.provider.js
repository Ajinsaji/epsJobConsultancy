import { estimateTokens } from '../utils/tokenCounter.js';

export const MockProvider = {
  getProviderInfo: () => ({
    provider: 'mock',
    model: 'mock-v1'
  }),

  healthCheck: async () => {
    return {
      provider: 'mock',
      status: 'healthy',
      model: 'mock-v1',
      responseTime: 23 // mocked
    };
  },

  generate: async (prompt, options = {}) => {
    const startTime = Date.now();
    
    // Simulate API Latency (500ms - 2000ms)
    const delay = Math.floor(Math.random() * 1500) + 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulate token usage (prompt + generic response length)
    const estimatedTokens = estimateTokens(prompt) + 150;
    
    // Simulate error rate (e.g. 5% failure)
    if (Math.random() > 0.95) {
      throw new Error('Mock API Rate Limit Exceeded');
    }

    let responseData = {
      message: 'This is a mock AI response.',
      echoPromptLength: prompt.length
    };

    if (options.task === 'AI_RESUME_ANALYSIS') {
      responseData = {
        personalInformation: { value: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' }, confidence: 0.98 },
        summary: { value: 'Experienced software engineer with a passion for scalable systems.', confidence: 0.95 },
        skills: { value: ['React', 'Node.js', 'mongodb', 'typescript', 'aws'], confidence: 0.99 },
        experience: { 
          value: [{ title: 'Senior Developer', company: 'Tech Corp', startDate: '2020-01-01', endDate: 'Present', description: 'Led fullstack development.' }], 
          confidence: 0.92 
        },
        education: { 
          value: [{ degree: 'B.S. Computer Science', institution: 'State University', graduationYear: '2018' }], 
          confidence: 0.96 
        },
        projects: { value: [], confidence: 1.0 },
        certifications: { value: [], confidence: 1.0 },
        languages: { value: ['English', 'Spanish'], confidence: 0.85 },
        softSkills: { value: ['Leadership', 'Communication'], confidence: 0.75 }
      };
    }

    return {
      provider: 'mock',
      model: options.modelName || 'mock-v1',
      executionTimeMs: Date.now() - startTime,
      confidence: 0.95, // simulated high confidence
      estimatedTokens,
      data: responseData
    };
  },

  embed: async (text, options = {}) => {
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      provider: 'mock',
      model: options.embeddingModel || 'mock-embed-v1',
      executionTimeMs: Date.now() - startTime,
      confidence: 1.0,
      estimatedTokens: estimateTokens(text),
      data: {
        vector: new Array(1536).fill(0.01) // mock embedding vector
      }
    };
  }
};
