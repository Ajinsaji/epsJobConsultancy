import express from 'express';
import { checkHealth, runDiagnosticTest, processResume } from '../controllers/ai.controller.js';
import { semanticMatch } from '../controllers/matching.controller.js';
import { 
  getJobRecommendations, 
  getCandidateRecommendations, 
  getLearningRecommendations, 
  getCareerRecommendations 
} from '../controllers/recommendation.controller.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public / Internal Diagnostic (no auth required for simple health)
router.get('/health', checkHealth);

// Authenticated Diagnostic
router.use(authenticate);
router.post('/test', authorizeRoles('admin'), runDiagnosticTest); // Only admin for now

// Resume Processing
router.post('/resume/process', processResume);

// Semantic Matching
router.post('/semantic-match', semanticMatch);

// Recommendations
router.post('/job-recommendations', getJobRecommendations);
router.post('/candidate-recommendations', getCandidateRecommendations);
router.post('/learning-recommendations', getLearningRecommendations);
router.post('/career-recommendations', getCareerRecommendations);


export { router as aiRoutes };
