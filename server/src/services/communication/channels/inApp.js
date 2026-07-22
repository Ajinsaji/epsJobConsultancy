export const inAppAdapter = {
  send: async (messageData) => {
    // Message is already saved to DB by communication.service.js
    // This adapter is reserved for WebSockets or realtime push in V2
    return true;
  }
};
