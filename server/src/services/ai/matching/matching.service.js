import { matchingConfig } from '../../../config/matchingConfig.js';
import { getRecommendationLevel } from '../../../constants/recommendationLevels.js';
import { MatchCache } from './cache/matchCache.js';
import { EmbeddingService } from './embedding.service.js';
import { MatchingEngine } from './matchingEngine.js';
import { ScoreCalculator } from './scoreCalculator.js';
import { SkillGapAnalyzer } from './skillGapAnalyzer.js';
import { MatchExplanation } from './matchExplanation.js';
import crypto from 'crypto';

export const MatchingService = {
  /**
   * Main orchestrator to compute semantic similarity between candidate and job.
   */
  matchCandidateToJob: async (candidateProfile, jobProfile, options = {}) => {
    const startTime = Date.now();
    let embeddingTime = 0;
    
    // 1. Generate Cache Key
    // Rely on updated timestamps or hashes if explicit version is missing
    const candidateVersion = candidateProfile.updatedAt ? new Date(candidateProfile.updatedAt).getTime() : '1';
    const jobVersion = jobProfile.updatedAt ? new Date(jobProfile.updatedAt).getTime() : '1';
    const modelVersion = options.modelName || 'mock-embed-v1';

    const cacheKey = MatchCache.generateKey(candidateProfile._id, candidateVersion, jobProfile._id, jobVersion, modelVersion);
    const cachedResult = MatchCache.get(cacheKey);

    if (cachedResult) {
      return {
        ...cachedResult,
        executionTime: Date.now() - startTime,
        metadata: { ...cachedResult.metadata, cacheHit: true }
      };
    }

    // 2. Obtain Embeddings
    // Note: We stringify the structured data for embedding. In production we'd embed fields independently.
    
    // Skills
    const candidateSkillsText = (candidateProfile.skills || []).join(', ');
    const jobSkillsText = (jobProfile.requiredSkills || []).map(s => typeof s === 'string' ? s : s.name).join(', ');
    const embCandSkills = await EmbeddingService.getOrGenerateEmbedding('candidate_skills', candidateProfile._id, candidateSkillsText, candidateVersion, options);
    const embJobSkills = await EmbeddingService.getOrGenerateEmbedding('job_skills', jobProfile._id, jobSkillsText, jobVersion, options);
    
    // Experience
    const candidateExpText = JSON.stringify(candidateProfile.experience || []);
    const jobExpText = jobProfile.description || '';
    const embCandExp = await EmbeddingService.getOrGenerateEmbedding('candidate_exp', candidateProfile._id, candidateExpText, candidateVersion, options);
    const embJobExp = await EmbeddingService.getOrGenerateEmbedding('job_exp', jobProfile._id, jobExpText, jobVersion, options);
    
    // Education
    const candidateEduText = JSON.stringify(candidateProfile.education || []);
    const jobEduText = jobProfile.educationRequirements || 'Bachelor Degree';
    const embCandEdu = await EmbeddingService.getOrGenerateEmbedding('candidate_edu', candidateProfile._id, candidateEduText, candidateVersion, options);
    const embJobEdu = await EmbeddingService.getOrGenerateEmbedding('job_edu', jobProfile._id, jobEduText, jobVersion, options);

    embeddingTime = (embCandSkills.generationTime || 0) + (embJobSkills.generationTime || 0) + 
                    (embCandExp.generationTime || 0) + (embJobExp.generationTime || 0) +
                    (embCandEdu.generationTime || 0) + (embJobEdu.generationTime || 0);

    const simCalcStartTime = Date.now();

    // 3. Compute Semantic Similarities
    const scores = {
      skills: MatchingEngine.compareVectors(embCandSkills.vector, embJobSkills.vector),
      experience: MatchingEngine.compareVectors(embCandExp.vector, embJobExp.vector),
      education: MatchingEngine.compareVectors(embCandEdu.vector, embJobEdu.vector),
      certifications: 100, // Mocked for V1
      languages: 100 // Mocked for V1
    };

    const simCalcTime = Date.now() - simCalcStartTime;

    // 4. Weighted Scoring
    const weights = matchingConfig.profiles.default.weights;
    const overallScore = ScoreCalculator.calculateWeightedScore(scores, weights);
    const recommendationLevel = getRecommendationLevel(overallScore);

    // 5. Gap Analysis
    const gapAnalysis = SkillGapAnalyzer.analyzeGaps(jobProfile.requiredSkills, candidateProfile.skills);

    // 6. Explainability
    const structuredExplanation = MatchExplanation.generate(scores, overallScore, recommendationLevel, gapAnalysis);

    const result = {
      success: true,
      requestId: crypto.randomUUID(),
      provider: 'mock', // from AI platform
      model: modelVersion,
      executionTime: Date.now() - startTime,
      confidence: 0.95, // AI confidence baseline
      metadata: {
        matchId: crypto.randomUUID(),
        candidateVersion,
        jobVersion,
        embeddingModel: modelVersion,
        cacheHit: false,
        timings: {
          embeddingTime,
          similarityCalcTime: simCalcTime
        }
      },
      data: {
        overallScore,
        recommendation: recommendationLevel,
        matchedSkills: gapAnalysis.matched,
        missingSkills: gapAnalysis.missing,
        experienceScore: scores.experience,
        educationScore: scores.education,
        certificationScore: scores.certifications,
        languageScore: scores.languages,
        explanation: structuredExplanation,
        candidateSuggestions: structuredExplanation.recommendations,
        recruiterInsights: structuredExplanation.gaps
      }
    };

    // Cache the result
    MatchCache.set(cacheKey, result);

    return result;
  }
};
