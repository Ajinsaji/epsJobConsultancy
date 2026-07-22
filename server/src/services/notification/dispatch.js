import { inAppAdapter } from './channels/inApp.js';
import { emailAdapter } from './channels/email.js';
import { whatsappAdapter } from './channels/whatsapp.js';

export const dispatchNotification = async (notificationData) => {
  const { channels = ['in_app'] } = notificationData;
  const promises = [];

  // Route to requested channels
  if (channels.includes('in_app')) {
    promises.push(inAppAdapter.send(notificationData));
  }
  
  if (channels.includes('email')) {
    promises.push(emailAdapter.send(notificationData));
  }

  if (channels.includes('whatsapp')) {
    promises.push(whatsappAdapter.send(notificationData));
  }

  // Execute all channels in parallel
  await Promise.allSettled(promises);
};
