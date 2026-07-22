import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientRole: { type: String, enum: ['Candidate', 'Company', 'Admin'], required: true },
    
    type: { type: String, required: true },
    channels: [{ type: String, enum: ['in_app', 'email', 'whatsapp', 'push', 'sms'] }],
    
    title: { type: String, required: true },
    message: { type: String, required: true },
    
    status: { 
      type: String, 
      enum: ['Pending', 'Queued', 'Sent', 'Delivered', 'Failed'], 
      default: 'Pending' 
    },
    
    read: { type: Boolean, default: false },
    readAt: { type: Date },
    
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },

  },
  { timestamps: true },
)

export const Notification = mongoose.model('Notification', NotificationSchema)


