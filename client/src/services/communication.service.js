import axios from 'axios';

const API_URL = '/api/v1/communication';

export const communicationService = {
  startConversation: async (participants, type, relatedEntity) => {
    const response = await axios.post(API_URL, { participants, type, relatedEntity });
    return response.data;
  },

  listConversations: async (page = 1, limit = 20) => {
    const response = await axios.get(API_URL, { params: { page, limit } });
    return response.data;
  },

  getMessages: async (conversationId, page = 1, limit = 50) => {
    const response = await axios.get(`${API_URL}/${conversationId}/messages`, { params: { page, limit } });
    return response.data;
  },

  sendMessage: async (conversationId, body, attachments = []) => {
    const response = await axios.post(`${API_URL}/${conversationId}/messages`, { body, attachments });
    return response.data;
  },

  markAsRead: async (conversationId) => {
    const response = await axios.put(`${API_URL}/${conversationId}/read`);
    return response.data;
  }
};
