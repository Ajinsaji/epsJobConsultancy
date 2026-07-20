import mongoose from 'mongoose'

const PlacementSchema = new mongoose.Schema(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    
    status: {
      type: String,
      enum: ['Draft', 'Offer Generated', 'Offer Accepted', 'Joined', 'Placed', 'Cancelled'],
      default: 'Draft',
    },
    
    offerLetterUrl: { type: String }, // Cloudinary URL
    salary: { type: String, trim: true },
    joiningDate: { type: Date },
    remarks: { type: String },
    
    // Legacy fields for public UI backward compatibility
    candidateName: { type: String, trim: true },
    candidatePhoto: { type: String, trim: true },
    companyName: { type: String, trim: true },
    companyLogo: { type: String, trim: true },
    position: { type: String, trim: true },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Placement = mongoose.model('Placement', PlacementSchema)
