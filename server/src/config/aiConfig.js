import dotenv from 'dotenv';
dotenv.config();

export const aiConfig = {
  provider: process.env.AI_PROVIDER || 'mock',
  modelName: process.env.AI_MODEL_NAME || 'mock-v1',
  temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2000', 10),
  embeddingModel: process.env.AI_EMBEDDING_MODEL || 'mock-embed-v1',
  timeoutMs: parseInt(process.env.AI_TIMEOUT_MS || '30000', 10)
};
