import crypto from 'crypto';

export const formatAiResponse = ({
  task,
  provider,
  model,
  executionTimeMs,
  confidence,
  estimatedTokens,
  data
}) => {
  return {
    success: true,
    requestId: `req_ai_${crypto.randomBytes(8).toString('hex')}`,
    task,
    provider,
    model,
    executionTime: executionTimeMs,
    confidence,
    usage: {
      estimatedTokens
    },
    data
  };
};
