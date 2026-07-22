export const whatsappAdapter = {
  send: async (notificationData) => {
    // Mock for V1.0
    console.log(`[WhatsApp Adapter] Sending message to ${notificationData.recipientRole} (${notificationData.recipientId})`);
    console.log(`[WhatsApp Adapter] Content: ${notificationData.title} - ${notificationData.message}`);
    return true;
  }
};
