import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },

    // Keep existing field name
    read: { type: Boolean, default: false },

    // Phase-5 target fields (additive)
    type: { type: String },
    entityType: { type: String },
    entityId: { type: mongoose.Schema.Types.ObjectId },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

export const Notification = mongoose.model('Notification', NotificationSchema)


