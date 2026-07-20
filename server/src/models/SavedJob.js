import mongoose from 'mongoose'

const SavedJobSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
  },
  { timestamps: true }
)

// A candidate can save a job only once
SavedJobSchema.index({ candidateId: 1, jobId: 1 }, { unique: true })

export const SavedJob = mongoose.model('SavedJob', SavedJobSchema)
