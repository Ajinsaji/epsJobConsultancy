import express from 'express';
import { 
  startConversation, 
  listConversations, 
  getMessages, 
  sendMessage, 
  markAsRead 
} from '../controllers/communication.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', startConversation);
router.get('/', listConversations);
router.get('/:id/messages', getMessages);
router.post('/:id/messages', sendMessage);
router.put('/:id/read', markAsRead);

export { router as communicationRoutes };
