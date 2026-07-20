import Razorpay from 'razorpay'
import crypto from 'crypto'

export const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    const error = new Error('Razorpay is not configured. Missing API keys.')
    error.statusCode = 503
    throw error
  }
  
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export const createOrder = async (amount, currency = 'INR', receiptId) => {
  const instance = getRazorpayInstance()
  const options = {
    amount: amount * 100, // Razorpay works in smallest currency subunit (paise)
    currency,
    receipt: receiptId,
  }
  
  return await instance.orders.create(options)
}

export const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error('Razorpay secret is missing.')
  
  const body = orderId + '|' + paymentId
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex')
    
  return expectedSignature === signature
}
