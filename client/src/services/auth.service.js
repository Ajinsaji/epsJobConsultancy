import axios from 'axios';

const API_URL = '/api/v1/auth';

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },
  
  register: async (data) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await axios.post(`${API_URL}/reset-password`, { token, password });
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await axios.post(`${API_URL}/verify-email`, { token });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  },
  
  logout: async () => {
    // In a real scenario, this might call a backend logout route to invalidate a refresh token
    // For now, client-side clearance is handled by Redux
    return true;
  }
};
