import { asyncHandler } from '../utils/asyncHandler.js'
import { Notification } from '../models/Notification.js'

export const listMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .lean()

  res.json({ notifications })
})

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    userId: req.user._id,
  })

  if (!notification) return res.status(404).json({ message: 'Notification not found' })

  notification.read = true
  await notification.save()

  res.json({ notification })
})

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user._id }, { $set: { read: true } })
  res.json({ message: 'All notifications marked as read' })
})

export const deleteNotification = asyncHandler(async (req, res) => {
  const result = await Notification.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  })

  if (!result) return res.status(404).json({ message: 'Notification not found' })

  res.json({ message: 'Notification deleted successfully' })
})


