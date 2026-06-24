import mongoose from 'mongoose'

const InterviewSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },

    // Existing fields (kept for backward compatibility)
    date: { type: Date, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
    feedback: { type: String },

    // New Phase-4 fields
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    epsAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    interviewDate: { type: Date, required: true },
    meetingLink: { type: String },
    location: { type: String },

    status: {
      type: String,
      enum: ['Scheduled', 'Rescheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },

    remarks: { type: String },
  },
  { timestamps: true },
)

export const Interview = mongoose.model('Interview', InterviewSchema)


