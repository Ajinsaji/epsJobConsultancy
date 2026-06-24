import mongoose from 'mongoose'

const EmployerCommunicationSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    type: {
      type: String,
      enum: ['contact_request', 'interview_invite', 'hiring_message'],
      required: true,
    },
    subject: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['sent', 'viewed', 'responded'],
      default: 'sent',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('EmployerCommunication', EmployerCommunicationSchema)



