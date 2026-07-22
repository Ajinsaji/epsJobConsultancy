import crypto from 'crypto';

export const formatAiError = (error, provider, task) => {
  // Extract provider-specific error details
  let message = error.message || 'Unknown AI Provider Error';
  let code = error.code || 'AI_ERROR';

  if (error.response?.data?.error) {
    // Typical OpenAI error structure
    message = error.response.data.error.message;
    code = error.response.data.error.code;
  }

  return {
    success: false,
    requestId: `req_ai_${crypto.randomBytes(8).toString('hex')}`,
    task,
    provider,
    error: {
      code,
      message
    }
  };
};
