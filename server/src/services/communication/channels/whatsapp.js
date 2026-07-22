export const whatsappAdapter = {
  send: async (messageData) => {
    // Mock for V1.0
    console.log(`[Communication: WhatsApp] Sending message ${messageData._id} to ${messageData.recipientId}`);
    return true;
  }
};
