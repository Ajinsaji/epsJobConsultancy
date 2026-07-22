export const messageSentTemplate = (payload) => {
  return {
    title: `New Message from ${payload.senderName}`,
    message: payload.messagePreview,
    metadata: {
      conversationId: payload.conversationId,
      actionUrl: `/communication/${payload.conversationId}`
    }
  };
};
