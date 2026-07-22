export const emailAdapter = {
  send: async (notificationData) => {
    // Mock for V1.0
    console.log(`[Email Adapter] Sending email to ${notificationData.recipientRole} (${notificationData.recipientId})`);
    console.log(`[Email Adapter] Subject: ${notificationData.title}`);
    console.log(`[Email Adapter] Body: ${notificationData.message}`);
    return true;
  }
};
