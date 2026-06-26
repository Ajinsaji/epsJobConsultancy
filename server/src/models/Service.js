import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true }, // Name of the icon (e.g. Briefcase, ShieldCheck, etc.)
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Service = mongoose.model('Service', ServiceSchema)
