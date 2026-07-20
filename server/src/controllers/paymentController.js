import { asyncHandler } from '../utils/asyncHandler.js'
import { Subscription } from '../models/Subscription.js'
import { Company } from '../models/Company.js'
import { createOrder, verifyPaymentSignature } from '../services/paymentService.js'

const PLANS = {
  'Pro': { amount: 5000, features: ['Unlimited Job Posts', 'Featured Listings'] },
  'Enterprise': { amount: 15000, features: ['Dedicated Account Manager', 'Custom Workflows'] },
}

export const createSubscriptionOrder = asyncHandler(async (req, res) => {
  const { planName } = req.body
  
  if (!planName || !PLANS[planName]) {
    return res.status(400).json({ message: 'Invalid plan selected.' })
  }
  
  const company = await Company.findOne({ userId: req.user._id })
  if (!company) return res.status(404).json({ message: 'Company profile not found' })

  const planDetails = PLANS[planName]

  // Create Razorpay Order
  const order = await createOrder(planDetails.amount, 'INR', `rcpt_${company._id}`)

  // Create Pending Subscription Record
  const subscription = await Subscription.create({
    companyId: company._id,
    planName,
    amount: planDetails.amount,
    features: planDetails.features,
    razorpayOrderId: order.id,
    status: 'Pending'
  })

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    subscriptionId: subscription._id
  })
})

export const verifySubscriptionPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({ message: 'Missing payment verification details.' })
  }

  const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)
  
  if (!isValid) {
    return res.status(400).json({ message: 'Invalid payment signature.' })
  }

  const subscription = await Subscription.findOne({ razorpayOrderId })
  if (!subscription) return res.status(404).json({ message: 'Subscription order not found.' })

  // Update subscription to active
  subscription.status = 'Active'
  subscription.razorpayPaymentId = razorpayPaymentId
  subscription.razorpaySignature = razorpaySignature
  
  // Set end date to 30 days from now
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 30)
  subscription.endDate = endDate

  await subscription.save()

  // Update Company with active subscription
  await Company.findByIdAndUpdate(subscription.companyId, {
    activeSubscription: subscription._id
  })

  res.json({ message: 'Payment verified successfully', subscription })
})

export const getMySubscription = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ userId: req.user._id })
  if (!company) return res.status(404).json({ message: 'Company profile not found' })

  const subscriptions = await Subscription.find({ companyId: company._id }).sort({ createdAt: -1 })
  
  res.json({ subscriptions })
})

// Webhook endpoint (simplified for this stage)
export const handleWebhook = asyncHandler(async (req, res) => {
  // In production, you would verify req.headers['x-razorpay-signature']
  const event = req.body.event
  const payload = req.body.payload

  if (event === 'payment.captured') {
    const payment = payload.payment.entity
    const orderId = payment.order_id
    
    // Auto-fulfill if not already verified by frontend
    const sub = await Subscription.findOne({ razorpayOrderId: orderId })
    if (sub && sub.status === 'Pending') {
      sub.status = 'Active'
      sub.razorpayPaymentId = payment.id
      
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30)
      sub.endDate = endDate
      
      await sub.save()
    }
  }

  res.json({ status: 'ok' })
})
