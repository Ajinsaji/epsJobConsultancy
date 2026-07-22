import { dispatchNotification } from './dispatch.js';
import { getTemplate } from './templates/index.js';
import { Notification } from '../../models/Notification.js';

export const NotificationService = {
  /**
   * Emits a platform event that resolves into notifications.
   * @param {Object} event { type, recipientId, recipientRole, channels, payload }
   */
  notify: async ({ type, recipientId, recipientRole, channels = ['in_app'], payload }) => {
    try {
      // 1. Resolve template
      const templateData = getTemplate(type, payload);
      
      // 2. Build Notification Data
      const notificationData = {
        recipientId,
        recipientRole,
        type,
        channels,
        title: templateData.title,
        message: templateData.message,
        metadata: templateData.metadata,
      };

      // 3. Dispatch to channels
      await dispatchNotification(notificationData);

    } catch (error) {
      console.error('[NotificationService] Failed to process notification event:', error);
    }
  },

  getNotifications: async (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const items = await Notification.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const totalResults = await Notification.countDocuments({ recipientId: userId });
    
    return { items, totalResults };
  },

  getUnreadCount: async (userId) => {
    return Notification.countDocuments({ recipientId: userId, read: false });
  },

  markAsRead: async (userId, notificationId) => {
    return Notification.findOneAndUpdate(
      { _id: notificationId, recipientId: userId },
      { read: true, readAt: new Date() },
      { new: true }
    );
  },

  markAllAsRead: async (userId) => {
    return Notification.updateMany(
      { recipientId: userId, read: false },
      { read: true, readAt: new Date() }
    );
  }
};
