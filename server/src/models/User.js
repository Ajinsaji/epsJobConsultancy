import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true },

    // Role-based access
    role: {
      type: String,
      required: true,
      enum: ['candidate', 'company', 'eps_admin', 'super_admin'],
    },


    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    mustChangePassword: { type: Boolean, default: false },

    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      default: 'Active',
      enum: ['Active', 'Suspended'],
    },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', UserSchema)

