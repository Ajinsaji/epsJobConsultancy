import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { uploadFile } from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// All uploads must be authenticated.
// The upload.single('file') middleware handles the multipart parsing and validation
router.post('/', upload.single('file'), uploadFile);

export { router as uploadRoutes };
