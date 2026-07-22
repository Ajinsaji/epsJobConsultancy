import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    type: { 
      type: String, 
      enum: ['Candidate-Company', 'Support', 'Recruitment', 'Company-EPS'], 
      required: true 
    },
    relatedEntity: {
      entityType: { type: String, enum: ['Application', 'Job', 'Ticket', 'Verification'] },
      entityId: { type: mongoose.Schema.Types.ObjectId }
    },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    lastActivity: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['Active', 'Archived', 'Closed', 'Blocked'],
      default: 'Active'
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  { timestamps: true }
);

// Create compound index for fast lookups
ConversationSchema.index({ participants: 1, "relatedEntity.entityId": 1 });

export const Conversation = mongoose.model('Conversation', ConversationSchema);
