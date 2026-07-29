import mongoose from 'mongoose'

const AuditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['SECURITY', 'USER_MANAGEMENT', 'DATA_ACCESS', 'SYSTEM', 'FINANCIAL'],
      default: 'SECURITY',
      index: true,
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILURE', 'WARNING'],
      default: 'SUCCESS',
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
)

AuditLogSchema.index({ createdAt: -1 })

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema)
