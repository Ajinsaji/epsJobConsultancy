/**
 * Heuristic token counter for Version 1.0.
 * Can be replaced later with tiktoken or provider-specific tokenizer.
 */
export const estimateTokens = (text) => {
  if (!text || typeof text !== 'string') return 0;
  // Approximation: 1 word ~ 1.3 tokens
  const words = text.split(/\s+/).length;
  return Math.ceil(words * 1.3);
};
