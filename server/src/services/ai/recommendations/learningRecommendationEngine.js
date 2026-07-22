import { AIService } from '../ai.service.js';
import { RecommendationTypes } from '../../../constants/recommendationTypes.js';
import { recommendationConfig } from '../../../config/recommendation.config.js';
import crypto from 'crypto';

export const LearningRecommendationEngine = {
  /**
   * Evaluates missing skills for a candidate and proposes learning paths.
   */
  generate: async (candidate, options = {}) => {
    // Determine missing skills from their profile vs a generic ideal profile or recent matches.
    // In V1, we simulate an AI learning path generation.
    const prompt = `Generate learning paths for candidate with skills: ${candidate.skills?.join(', ')}`;
    
    // We route through the Provider Factory
    const aiResponse = await AIService.generateResponse(prompt, { ...options, providerName: 'mock' });
    
    // Mock the structured JSON we'd normally parse from the LLM
    const structuredLearningPaths = [
      {
        skill: 'AWS Cloud',
        priority: 'Critical',
        estimatedLearningTime: '4 weeks',
        expectedImpact: 'High'
      },
      {
        skill: 'Docker & Kubernetes',
        priority: 'Important',
        estimatedLearningTime: '3 weeks',
        expectedImpact: 'Medium'
      }
    ];

    const metadata = {
      recommendationId: crypto.randomUUID(),
      confidence: 0.92,
      profileVersion: candidate.updatedAt ? new Date(candidate.updatedAt).getTime().toString() : 'v1',
      modelVersion: 'mock-gen-v1',
      cacheHit: false
    };

    return {
      recommendationId: metadata.recommendationId,
      type: RecommendationTypes.LEARNING,
      score: 100, // N/A for learning paths in the same way
      confidence: metadata.confidence,
      category: 'Learning Opportunities',
      generatedAt: new Date().toISOString(),
      profileVersion: metadata.profileVersion,
      modelVersion: metadata.modelVersion,
      cacheHit: metadata.cacheHit,
      entity: candidate,
      learningPaths: structuredLearningPaths.slice(0, recommendationConfig.limits.maxLearningSuggestions)
    };
  }
};
