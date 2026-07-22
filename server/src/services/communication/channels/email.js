export const emailAdapter = {
  send: async (messageData) => {
    // Mock for V1.0
    console.log(`[Communication: Email] Sending message ${messageData._id} to ${messageData.recipientId}`);
    return true;
  }
};
