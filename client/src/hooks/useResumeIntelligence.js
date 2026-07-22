import { useState } from 'react';
import axios from 'axios';

export const PROCESS_STATES = {
  IDLE: 'IDLE',
  UPLOADING: 'UPLOADING',
  PROCESSING: 'PROCESSING',
  REVIEW: 'REVIEW',
  SAVING: 'SAVING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export const useResumeIntelligence = () => {
  const [processState, setProcessState] = useState(PROCESS_STATES.IDLE);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);

  const processResumeUrl = async (fileUrl) => {
    try {
      setProcessState(PROCESS_STATES.PROCESSING);
      setError(null);
      
      const response = await axios.post('/api/v1/ai/resume/process', { fileUrl });
      
      setExtractedData(response.data);
      setProcessState(PROCESS_STATES.REVIEW);
    } catch (err) {
      console.error('Failed to process resume:', err);
      setError(err.response?.data?.error?.message || err.message || 'Failed to process resume');
      setProcessState(PROCESS_STATES.ERROR);
    }
  };

  const saveProfile = async (validatedProfile) => {
    try {
      setProcessState(PROCESS_STATES.SAVING);
      setError(null);

      // The frontend transforms the nested extractedData back into flat arrays/objects as needed for PUT /profile
      // validatedProfile should already be formatted by the Review UI.
      await axios.put('/api/v1/candidates/profile', validatedProfile);
      
      setProcessState(PROCESS_STATES.SUCCESS);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save profile');
      setProcessState(PROCESS_STATES.ERROR);
    }
  };

  const reset = () => {
    setProcessState(PROCESS_STATES.IDLE);
    setExtractedData(null);
    setError(null);
  };

  return {
    processState,
    setProcessState,
    extractedData,
    error,
    processResumeUrl,
    saveProfile,
    reset
  };
};
