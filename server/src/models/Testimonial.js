import mongoose from 'mongoose'

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    type: { type: String, enum: ['candidate', 'employer'], default: 'candidate' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Testimonial = mongoose.model('Testimonial', TestimonialSchema)
