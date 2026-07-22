import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true }
}, { _id: false });

const MessageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    channel: { type: String, enum: ['in_app', 'whatsapp', 'email', 'sms'], default: 'in_app' },
    
    body: { type: String, required: true },
    attachments: [AttachmentSchema],
    
    status: { type: String, enum: ['Sent', 'Delivered', 'Read'], default: 'Sent' },
    
    metadata: {
      edited: { type: Boolean, default: false },
      replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
      priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' }
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', MessageSchema);
