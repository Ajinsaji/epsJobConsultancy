import mongoose from 'mongoose'

const ActivityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    user: { type: String, required: true, trim: true }, // e.g. email of the admin who did the change
  },
  { timestamps: true }
)

export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema)
