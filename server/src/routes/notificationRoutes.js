import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import {
  listMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '../controllers/notificationController.js'

export const notificationRoutes = express.Router()

notificationRoutes.get('/me', authenticate, listMyNotifications)

notificationRoutes.patch('/:id/read', authenticate, markNotificationRead)
notificationRoutes.patch('/read-all', authenticate, markAllNotificationsRead)
notificationRoutes.delete('/:id', authenticate, deleteNotification)



