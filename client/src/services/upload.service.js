import axios from 'axios';

const API_URL = '/api/v1/uploads';

export const uploadService = {
  /**
   * Uploads a file to the universal file manager API.
   * @param {File} file - The file to upload
   * @param {string} category - e.g., 'resume', 'profile-image', 'company-logo'
   * @param {Function} onUploadProgress - Callback for tracking progress
   * @returns {Promise<Object>} The server response including metadata
   */
  uploadFile: async (file, category = 'document', onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    // Make sure we pass the JWT if the interceptor isn't catching it automatically for FormData
    const token = JSON.parse(localStorage.getItem('auth'))?.token;
    
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : '',
      },
      onUploadProgress,
    });
    return response.data;
  },
};
