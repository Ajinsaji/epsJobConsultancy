import { emailAdapter } from './channels/email.js';
import { whatsappAdapter } from './channels/whatsapp.js';
import { inAppAdapter } from './channels/inApp.js';

export const dispatchMessage = async (messageData) => {
  const promises = [];
  
  // As per recommendation, inApp handles local persistence (we already saved the Message in DB in communication.service.js)
  // But we'll call inApp adapter if we want to do any extra logging or real-time pushes later.
  promises.push(inAppAdapter.send(messageData));
  promises.push(emailAdapter.send(messageData));
  promises.push(whatsappAdapter.send(messageData));

  await Promise.allSettled(promises);
};
