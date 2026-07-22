import { AIService } from '../ai.service.js';
import { RecommendationTypes } from '../../../constants/recommendationTypes.js';
import { recommendationConfig } from '../../../config/recommendation.config.js';
import crypto from 'crypto';

export const CareerAdvisorEngine = {
  /**
   * Generates career path suggestions and profile improvements.
   */
  generate: async (candidate, options = {}) => {
    const prompt = `Generate career advisor insights for candidate with current title: ${candidate.title}`;
    
    // Route through Provider Factory
    await AIService.generateResponse(prompt, { ...options, providerName: 'mock' });
    
    // Mock structured AI response
    const careerInsights = {
      careerPath: ['Senior Software Engineer', 'Engineering Manager', 'Director of Engineering'],
      resumeImprovements: [
        'Quantify achievements in your last two roles',
        'Add links to your public open-source contributions'
      ],
      nextRoles: ['Tech Lead', 'Staff Engineer'],
      profileCompleteness: 82
    };

    const metadata = {
      recommendationId: crypto.randomUUID(),
      confidence: 0.88,
      profileVersion: candidate.updatedAt ? new Date(candidate.updatedAt).getTime().toString() : 'v1',
      modelVersion: 'mock-gen-v1',
      cacheHit: false
    };

    return {
      recommendationId: metadata.recommendationId,
      type: RecommendationTypes.CAREER,
      score: 100,
      confidence: metadata.confidence,
      category: 'Career Growth',
      generatedAt: new Date().toISOString(),
      profileVersion: metadata.profileVersion,
      modelVersion: metadata.modelVersion,
      cacheHit: metadata.cacheHit,
      entity: candidate,
      careerInsights
    };
  }
};
