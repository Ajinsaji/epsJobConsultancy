import mongoose from 'mongoose'

const PlacementSchema = new mongoose.Schema(
  {
    candidateName: { type: String, required: true, trim: true },
    candidatePhoto: { type: String, trim: true }, // Unsplash profile photo or custom image path
    companyName: { type: String, required: true, trim: true },
    companyLogo: { type: String, trim: true },
    position: { type: String, required: true, trim: true },
    salary: { type: String, required: true, trim: true }, // e.g. "₹18 LPA" or "$120k/yr"
    joiningDate: { type: Date, required: true },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Placement = mongoose.model('Placement', PlacementSchema)
