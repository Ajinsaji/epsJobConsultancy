import { NOTIFICATION_TYPES } from '../../../utils/notificationTypes.js';
import { applicationSubmittedTemplate, newApplicantTemplate } from './applicationTemplates.js';
import { messageSentTemplate } from './messageTemplates.js';

export const getTemplate = (type, payload) => {
  switch (type) {
    case NOTIFICATION_TYPES.APPLICATION_SUBMITTED:
      return applicationSubmittedTemplate(payload);
    case NOTIFICATION_TYPES.NEW_APPLICANT:
      return newApplicantTemplate(payload);
    case NOTIFICATION_TYPES.MESSAGE_SENT:
      return messageSentTemplate(payload);
    // Expand for other types later
    default:
      return {
        title: payload.title || 'Notification',
        message: payload.message || 'You have a new notification.',
        metadata: payload.metadata || {}
      };
  }
};
