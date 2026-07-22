import { CommunicationService } from '../services/communication/communication.service.js';

export const startConversation = async (req, res, next) => {
  try {
    const { participants, type, relatedEntity } = req.body;
    const creatorId = req.user.id;
    
    const conversation = await CommunicationService.startConversation(
      participants, type, relatedEntity, creatorId
    );
    
    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

export const listConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));

    const { items, totalResults } = await CommunicationService.listConversations(
      userId, parsedPage, parsedLimit
    );
    
    res.status(200).json({ 
      success: true, 
      data: items,
      meta: {
        page: parsedPage,
        limit: parsedLimit,
        totalResults,
        hasNextPage: (parsedPage * parsedLimit) < totalResults
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));

    const { items, totalResults } = await CommunicationService.getMessages(
      userId, conversationId, parsedPage, parsedLimit
    );
    
    res.status(200).json({ 
      success: true, 
      data: items,
      meta: {
        page: parsedPage,
        limit: parsedLimit,
        totalResults,
        hasNextPage: (parsedPage * parsedLimit) < totalResults
      }
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { id: conversationId } = req.params;
    const { body, attachments } = req.body;

    const message = await CommunicationService.sendMessage(
      conversationId, senderId, body, attachments
    );
    
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: conversationId } = req.params;
    
    await CommunicationService.markAsRead(userId, conversationId);
    
    res.status(200).json({ success: true, message: 'Conversation marked as read' });
  } catch (error) {
    next(error);
  }
};
