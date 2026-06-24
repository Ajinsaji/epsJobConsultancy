import mongoose from 'mongoose'

const CandidateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Existing profile fields
    fullName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },

    dob: { type: Date },
    gender: { type: String, trim: true },
    address: { type: String, trim: true },

    education: { type: String, trim: true },
    experience: { type: String, trim: true },

    skills: [{ type: String, trim: true }],
    languages: [{ type: String, trim: true }],

    resume: { type: String },
    photo: { type: String },

    // Phase E.1 additions (Talent Search preparation)
    title: { type: String, trim: true },
    location: { type: String, trim: true },

    // Store numeric experience years for filtering
    experienceYears: { type: Number, min: 0 },

    availability: {
      type: String,
      enum: ['Immediate', '15 Days', '30 Days', '60+ Days'],
      default: undefined,
    },

    expectedSalary: { type: Number, min: 0 },

    jobCategories: [{ type: String, trim: true }],

    projects: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        technologies: [{ type: String, trim: true }],
      },
    ],

    certifications: [
      {
        title: { type: String, trim: true },
        issuer: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true },
)

export const Candidate = mongoose.model('Candidate', CandidateSchema)


