import { Message } from '../../models/Message.js';
import { Conversation } from '../../models/Conversation.js';
import { dispatchMessage } from './dispatch.js';
import { NotificationService } from '../notification/notification.service.js';
import { NOTIFICATION_TYPES } from '../../utils/notificationTypes.js';
import { User } from '../../models/User.js';

export const CommunicationService = {
  /**
   * Start a deterministic conversation. Returns existing if it matches exactly.
   */
  startConversation: async (participants, type, relatedEntity, creatorId) => {
    // Validate participants
    if (!participants.includes(creatorId.toString())) {
      throw new Error('Creator must be a participant');
    }

    // Try to find an existing deterministic conversation
    // Same participants (size and content) and same relatedEntity
    const existing = await Conversation.findOne({
      participants: { $all: participants, $size: participants.length },
      'relatedEntity.entityType': relatedEntity.entityType,
      'relatedEntity.entityId': relatedEntity.entityId
    });

    if (existing) {
      return existing;
    }

    const unreadCounts = {};
    participants.forEach(p => { unreadCounts[p] = 0; });

    const conversation = await Conversation.create({
      participants,
      type,
      relatedEntity,
      unreadCounts
    });

    return conversation;
  },

  listConversations: async (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    
    const items = await Conversation.find({ participants: userId, status: { $ne: 'Archived' } })
      .populate('lastMessage')
      .populate('participants', 'fullName email') // Assuming Users have fullName. If it's on Candidate/Company, we might need aggregation or 2 passes.
      .sort({ lastActivity: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalResults = await Conversation.countDocuments({ participants: userId, status: { $ne: 'Archived' } });

    return { items, totalResults };
  },

  sendMessage: async (conversationId, senderId, body, attachments = []) => {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    if (!conversation.participants.some(p => p.toString() === senderId.toString())) {
      throw new Error('Forbidden: Not a participant');
    }

    const recipientId = conversation.participants.find(p => p.toString() !== senderId.toString());

    // 1. Create the message
    const message = await Message.create({
      conversationId,
      senderId,
      recipientId,
      body,
      attachments,
      channel: 'in_app'
    });

    // 2. Update the conversation
    conversation.lastMessage = message._id;
    conversation.lastActivity = new Date();
    
    // Increment unread count for recipient
    const currentUnread = conversation.unreadCounts.get(recipientId.toString()) || 0;
    conversation.unreadCounts.set(recipientId.toString(), currentUnread + 1);
    
    await conversation.save();

    // 3. Dispatch external channels (WhatsApp/Email mocks)
    await dispatchMessage(message);

    // 4. Trigger Notification Platform
    const senderUser = await User.findById(senderId).lean();
    // In our system, if it's candidate, their name might be in Candidate collection. 
    // For V1.0, we'll try to get it, or fallback.
    
    await NotificationService.notify({
      type: NOTIFICATION_TYPES.MESSAGE_SENT,
      recipientId,
      recipientRole: 'User', // Generic or lookup based on actual role
      channels: ['in_app'], // The external dispatch is handled by communication, or notification handles it?
      // Wait, User said: "Keep communication and notifications decoupled... Message Sent -> Comm Service -> MESSAGE_SENT event -> Notif Service -> Notif Bell".
      payload: {
        conversationId,
        senderName: senderUser?.email || 'User', // Needs better lookup if time allows
        messagePreview: body.substring(0, 50) + (body.length > 50 ? '...' : '')
      }
    });

    return message;
  },

  getMessages: async (userId, conversationId, page = 1, limit = 50) => {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new Error('Conversation not found');
    
    if (!conversation.participants.some(p => p.toString() === userId.toString())) {
      throw new Error('Forbidden: Not a participant');
    }

    const skip = (page - 1) * limit;
    
    const items = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('senderId', 'email role')
      .lean();

    const totalResults = await Message.countDocuments({ conversationId });

    // Messages are fetched newest first for pagination, usually UI reverses them.
    return { items, totalResults };
  },

  markAsRead: async (userId, conversationId) => {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    if (!conversation.participants.some(p => p.toString() === userId.toString())) {
      throw new Error('Forbidden: Not a participant');
    }

    // Reset unread count for this user
    conversation.unreadCounts.set(userId.toString(), 0);
    await conversation.save();

    // Optionally mark all messages as read
    await Message.updateMany(
      { conversationId, recipientId: userId, status: { $ne: 'Read' } },
      { status: 'Read' }
    );

    return true;
  }
};
