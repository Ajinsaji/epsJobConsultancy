import React, { useState } from 'react';
import { useUpload } from '../../../hooks/useUpload';
import { useResumeIntelligence, PROCESS_STATES } from '../../../hooks/useResumeIntelligence';
import { FileUploader } from '../FileUploader';
import toast from 'react-hot-toast';

const ConfidenceBadge = ({ confidence }) => {
  if (confidence >= 0.9) return <span className="badge bg-success-subtle text-success">High Confidence</span>;
  if (confidence >= 0.7) return <span className="badge bg-warning-subtle text-warning">Review Recommended</span>;
  return <span className="badge bg-danger-subtle text-danger">Manual Confirmation Required</span>;
};

export const ResumeUploadFlow = ({ onComplete }) => {
  const { uploadFile, isUploading } = useUpload();
  const { processState, setProcessState, extractedData, error, processResumeUrl, saveProfile, reset } = useResumeIntelligence();

  const [editableProfile, setEditableProfile] = useState({});

  const handleUpload = async (file) => {
    setProcessState(PROCESS_STATES.UPLOADING);
    const result = await uploadFile(file, 'resume');
    if (result.success) {
      await processResumeUrl(result.data.url);
    } else {
      setProcessState(PROCESS_STATES.ERROR);
    }
  };

  const startReview = () => {
    // Flatten normalizedProfile into editable format matching PUT /profile expectations
    const profile = extractedData.normalizedProfile;
    setEditableProfile({
      fullName: profile.personalInformation?.value?.name || '',
      email: profile.personalInformation?.value?.email || '',
      phone: profile.personalInformation?.value?.phone || '',
      summary: profile.summary?.value || '',
      skills: profile.skills?.value || [],
      experience: profile.experience?.value || [],
      education: profile.education?.value || []
    });
  };

  // When transition to REVIEW, prep form state
  React.useEffect(() => {
    if (processState === PROCESS_STATES.REVIEW && extractedData) {
      startReview();
    }
  }, [processState, extractedData]);

  const handleSave = async () => {
    await saveProfile(editableProfile);
    toast.success('Resume processed and profile saved successfully!');
    if (onComplete) onComplete();
  };

  if (processState === PROCESS_STATES.IDLE || processState === PROCESS_STATES.ERROR) {
    return (
      <div className="resume-upload-flow card p-4">
        <h4>Upload Resume</h4>
        <p className="text-muted">Upload your resume to automatically extract and populate your profile.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <FileUploader 
          onFileSelect={handleUpload} 
          accept={{ 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] }} 
          maxSize={5 * 1024 * 1024} 
        />
      </div>
    );
  }

  if (processState === PROCESS_STATES.UPLOADING || processState === PROCESS_STATES.PROCESSING || processState === PROCESS_STATES.SAVING) {
    return (
      <div className="resume-upload-flow card p-4 text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>
          {processState === PROCESS_STATES.UPLOADING && 'Uploading Resume...'}
          {processState === PROCESS_STATES.PROCESSING && 'AI is Analyzing Resume...'}
          {processState === PROCESS_STATES.SAVING && 'Saving Profile...'}
        </h5>
        <p className="text-muted">This will just take a moment.</p>
      </div>
    );
  }

  if (processState === PROCESS_STATES.SUCCESS) {
    return (
      <div className="resume-upload-flow card p-4 text-center">
        <div className="text-success mb-3 display-4"><i className="bi bi-check-circle-fill"></i></div>
        <h5>Profile Updated!</h5>
        <button className="btn btn-primary mt-3" onClick={() => { reset(); if (onComplete) onComplete(); }}>Done</button>
      </div>
    );
  }

  // REVIEW STATE
  return (
    <div className="resume-upload-flow card p-4">
      <h4 className="mb-4">Review Extracted Profile</h4>
      <p className="text-muted mb-4">Please review and adjust the AI extracted information before saving.</p>

      {/* Basic Info Section */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Personal Information</h5>
          <ConfidenceBadge confidence={extractedData.rawAiData.personalInformation?.confidence || 1} />
        </div>
        <div className="card-body">
          <div className="mb-2">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value={editableProfile.fullName} onChange={(e) => setEditableProfile({...editableProfile, fullName: e.target.value})} />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={editableProfile.email} onChange={(e) => setEditableProfile({...editableProfile, email: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Skills</h5>
          <ConfidenceBadge confidence={extractedData.rawAiData.skills?.confidence || 1} />
        </div>
        <div className="card-body">
          <textarea className="form-control" rows="2" value={editableProfile.skills.join(', ')} onChange={(e) => setEditableProfile({...editableProfile, skills: e.target.value.split(',').map(s=>s.trim())})} />
          <small className="text-muted">Comma separated</small>
        </div>
      </div>

      {/* Summary */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Summary</h5>
          <ConfidenceBadge confidence={extractedData.rawAiData.summary?.confidence || 1} />
        </div>
        <div className="card-body">
          <textarea className="form-control" rows="3" value={editableProfile.summary} onChange={(e) => setEditableProfile({...editableProfile, summary: e.target.value})} />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-outline-secondary" onClick={reset}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
      </div>
    </div>
  );
};
