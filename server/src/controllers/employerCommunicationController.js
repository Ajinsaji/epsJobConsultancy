import { asyncHandler } from '../utils/asyncHandler.js'

import EmployerCommunication from '../models/EmployerCommunication.js'
import { Notification } from '../models/Notification.js'

// Helper: build notification message based on communication type
function notificationText(type, companyName) {
  switch (type) {
    case 'contact_request':
      return `${companyName || 'The company'} wants to contact you.`
    case 'interview_invite':
      return 'You have received an interview invitation.'
    case 'hiring_message':
      return 'You received a message from an employer.'
    default:
      return `${companyName || 'The company'} sent you an update.`
  }
}

// POST: contact-request
export const createContactRequest = asyncHandler(async (req, res) => {
  const companyId = req.user?.companyId
  const candidateId = req.params.id

  const { subject = '', message = '' } = req.body || {}

  const comm = await EmployerCommunication.create({
    companyId,
    candidateId,
    type: 'contact_request',
    subject,
    message,
    status: 'sent',
  })

  // notification
  const companyName = req.user?.companyName || req.user?.name || 'Company'
  await Notification.create({
    candidateId,
    type: 'employer_communication',
    title: 'New contact request',
    message: notificationText('contact_request', companyName),
    status: 'unread',
    metadata: { communicationId: comm._id, type: 'contact_request' },
  })

  res.status(201).json({ communication: comm })
})

// POST: interview-invite
export const createInterviewInvite = asyncHandler(async (req, res) => {
  const companyId = req.user?.companyId
  const candidateId = req.params.id

  const { subject = '', message = '' } = req.body || {}

  const comm = await EmployerCommunication.create({
    companyId,
    candidateId,
    type: 'interview_invite',
    subject,
    message,
    status: 'sent',
  })

  const companyName = req.user?.companyName || req.user?.name || 'Company'
  await Notification.create({
    candidateId,
    type: 'employer_communication',
    title: 'Interview invitation',
    message: notificationText('interview_invite', companyName),
    status: 'unread',
    metadata: { communicationId: comm._id, type: 'interview_invite' },
  })

  res.status(201).json({ communication: comm })
})

// POST: message
export const createHiringMessage = asyncHandler(async (req, res) => {
  const companyId = req.user?.companyId
  const candidateId = req.params.id

  const { subject = '', message = '' } = req.body || {}

  const comm = await EmployerCommunication.create({
    companyId,
    candidateId,
    type: 'hiring_message',
    subject,
    message,
    status: 'sent',
  })

  const companyName = req.user?.companyName || req.user?.name || 'Company'
  await Notification.create({
    candidateId,
    type: 'employer_communication',
    title: 'New message',
    message: notificationText('hiring_message', companyName),
    status: 'unread',
    metadata: { communicationId: comm._id, type: 'hiring_message' },
  })

  res.status(201).json({ communication: comm })
})

// GET: /api/company/communications
export const getCommunications = asyncHandler(async (req, res) => {
  const companyId = req.user?.companyId

  const list = await EmployerCommunication.find({ companyId })
    .sort({ createdAt: -1 })
    .limit(50)

  res.json({ communications: list })
})

// GET: /api/company/communications/:candidateId
export const getCommunicationsByCandidate = asyncHandler(async (req, res) => {
  const companyId = req.user?.companyId
  const candidateId = req.params.candidateId

  const list = await EmployerCommunication.find({ companyId, candidateId })
    .sort({ createdAt: -1 })

  res.json({ communications: list })
})



