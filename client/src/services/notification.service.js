import axios from 'axios';

const API_URL = '/api/v1/notifications';

export const notificationService = {
  getNotifications: async (page = 1, limit = 20) => {
    const response = await axios.get(API_URL, { params: { page, limit } });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axios.get(`${API_URL}/unread-count`);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await axios.put(`${API_URL}/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axios.put(`${API_URL}/read-all`);
    return response.data;
  }
};
