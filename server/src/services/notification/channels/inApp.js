import { Notification } from '../../../models/Notification.js';

export const inAppAdapter = {
  send: async (notificationData) => {
    try {
      const notification = new Notification({
        recipientId: notificationData.recipientId,
        recipientRole: notificationData.recipientRole,
        type: notificationData.type,
        channels: notificationData.channels,
        title: notificationData.title,
        message: notificationData.message,
        metadata: notificationData.metadata,
        status: 'Delivered', // For In-App, creation is delivery
      });

      await notification.save();
      return true;
    } catch (error) {
      console.error('[InApp Adapter] Error saving notification:', error);
      return false;
    }
  }
};
