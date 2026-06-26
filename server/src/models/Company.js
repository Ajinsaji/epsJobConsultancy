import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, required: true },
    industry: { type: String },
    location: { type: String },
    contactPerson: { type: String },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String },
    website: { type: String },

    verified: { type: Boolean, default: false },

    // Landing page & partner program additions
    logo: { type: String },
    companySize: { type: String },
    isPartner: { type: Boolean, default: false },
    showOnHomepage: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const Company = mongoose.model('Company', CompanySchema)

