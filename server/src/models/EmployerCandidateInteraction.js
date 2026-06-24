import mongoose from 'mongoose'

const EmployerCandidateInteractionSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ['saved', 'shortlisted', 'contacted', 'downloaded'],
      required: true,
    },

    notes: { type: String, default: undefined },
  },
  { timestamps: true },
)

// Prevent duplicates per candidate+company.
EmployerCandidateInteractionSchema.index(
  { companyId: 1, candidateId: 1 },
  { unique: true },
)

export const EmployerCandidateInteraction = mongoose.model(
  'EmployerCandidateInteraction',
  EmployerCandidateInteractionSchema,
)

