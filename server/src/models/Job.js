import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    salary: { type: String },
    location: { type: String },
    experience: { type: String },

    skills: [{ type: String }],
    skillsRequired: [{ type: String }],

    jobType: { type: String },
    workMode: { type: String },

    openings: { type: Number, default: 1 },

    status: {
      type: String,
      enum: ['Open', 'Closed', 'Paused'],
      default: 'Open',
    },

    applicationDeadline: { type: Date },

    // Soft delete / future workflow control
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

JobSchema.index({ companyId: 1 })
JobSchema.index({ status: 1 })
JobSchema.index({
  title: 'text',
  description: 'text',
  skills: 'text',
  skillsRequired: 'text',
  location: 'text'
})

export const Job = mongoose.model('Job', JobSchema)

