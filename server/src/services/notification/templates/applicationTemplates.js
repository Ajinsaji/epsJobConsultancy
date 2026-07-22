export const applicationSubmittedTemplate = (payload) => {
  return {
    title: 'Application Submitted',
    message: `You have successfully applied for ${payload.jobTitle} at ${payload.companyName}.`,
    metadata: {
      jobId: payload.jobId,
      applicationId: payload.applicationId,
      companyId: payload.companyId,
      actionUrl: `/candidate/applications/${payload.applicationId}`
    }
  };
};

export const newApplicantTemplate = (payload) => {
  return {
    title: 'New Job Applicant',
    message: `${payload.candidateName} has applied for ${payload.jobTitle}.`,
    metadata: {
      jobId: payload.jobId,
      applicationId: payload.applicationId,
      candidateId: payload.candidateId,
      actionUrl: `/company/applications/${payload.applicationId}`
    }
  };
};
