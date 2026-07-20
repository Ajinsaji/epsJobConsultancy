import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    planName: { type: String, required: true }, // e.g., 'Free', 'Pro', 'Enterprise'
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'Expired', 'Cancelled', 'Failed'],
      default: 'Pending',
    },
    features: [{ type: String }],
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
)

export const Subscription = mongoose.model('Subscription', SubscriptionSchema)
