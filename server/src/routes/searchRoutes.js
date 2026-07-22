import express from 'express';
import { globalSearch, searchSuggestions } from '../controllers/search.controller.js';

const router = express.Router();

// Both endpoints are public (or can be restricted based on module needs)
router.get('/', globalSearch);
router.get('/suggestions', searchSuggestions);

export { router as searchRoutes };
