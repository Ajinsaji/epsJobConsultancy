import mongoose from 'mongoose'

const PasswordHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

PasswordHistorySchema.index({ userId: 1, createdAt: -1 })

export const PasswordHistory = mongoose.model('PasswordHistory', PasswordHistorySchema)
