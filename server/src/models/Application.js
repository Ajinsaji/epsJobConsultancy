import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },

    status: {
      type: String,
      enum: [
        'Applied',
        'Under Review',
        'Shortlisted',
        'Forwarded',
        'Interview Scheduled',
        'Selected',
        'Rejected',
      ],
      default: 'Applied',
    },

    remarks: { type: String },

    // Snapshot at time of application
    resumeSnapshot: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      skills: [{ type: String }],
      experience: { type: String },
    },

    appliedAt: { type: Date },

    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },

    // Future AI fields
    matchScore: { type: Number, default: null },
    aiRecommendation: { type: String, default: null },
  },
  { timestamps: true },
)

// A candidate should have at most one application per job
ApplicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true })

export const Application = mongoose.model('Application', ApplicationSchema)


