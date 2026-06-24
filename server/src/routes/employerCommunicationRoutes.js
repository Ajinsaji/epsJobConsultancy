import express from 'express'

import { roleMiddleware } from '../middleware/roleMiddleware.js'

import {
  createContactRequest,
  createInterviewInvite,
  createHiringMessage,
  getCommunications,
  getCommunicationsByCandidate,
} from '../controllers/employerCommunicationController.js'

const router = express.Router()

// Company role only
router.post('/candidates/:id/contact-request', roleMiddleware('company'), createContactRequest)
router.post('/candidates/:id/interview-invite', roleMiddleware('company'), createInterviewInvite)
router.post('/candidates/:id/message', roleMiddleware('company'), createHiringMessage)

router.get('/communications', roleMiddleware('company'), getCommunications)
router.get('/communications/:candidateId', roleMiddleware('company'), getCommunicationsByCandidate)


export default router



