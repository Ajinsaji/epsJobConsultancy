import { useState, useCallback } from 'react';
import { uploadService } from '../services/upload.service';

export function useUpload() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file, category) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await uploadService.uploadFile(file, category, (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      setIsSuccess(true);
      return response.data; // The rich metadata object
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to upload file');
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setProgress(0);
    setIsUploading(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    uploadFile,
    progress,
    isUploading,
    isSuccess,
    error,
    reset,
  };
}
