import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {
  createSubscriptionOrder,
  verifySubscriptionPayment,
  getMySubscription,
  handleWebhook,
} from '../controllers/paymentController.js'

export const paymentRoutes = express.Router()

// Company routes
paymentRoutes.post('/create-order', authenticate, roleMiddleware('company'), createSubscriptionOrder)
paymentRoutes.post('/verify', authenticate, roleMiddleware('company'), verifySubscriptionPayment)
paymentRoutes.get('/me', authenticate, roleMiddleware('company'), getMySubscription)

// Webhooks
paymentRoutes.post('/webhook', handleWebhook)
