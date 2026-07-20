import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    strengths: [
      {
        type: String,
        trim: true
      }
    ],
    weaknesses: [
      {
        type: String,
        trim: true
      }
    ],
    recommendation: {
      type: String,
      enum: ['hire', 'reject', 'hold'],
      required: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

export const Feedback = mongoose.model('Feedback', feedbackSchema)
