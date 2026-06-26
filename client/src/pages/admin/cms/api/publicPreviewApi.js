import axios from 'axios'

// Public read-only APIs (used for Preview rendering)
export const getPublicStats = () => axios.get('/api/public/stats')
export const getPublicJobs = (params = {}) => axios.get('/api/public/jobs', { params })
export const getPublicPartners = (params = {}) => axios.get('/api/public/partners', { params })
export const getPublicServices = (params = {}) => axios.get('/api/public/services', { params })
export const getPublicPlacements = (params = {}) => axios.get('/api/public/placements', { params })
export const getPublicCandidateTestimonials = (params = {}) =>
  axios.get('/api/public/testimonials/candidates', { params })
export const getPublicEmployerTestimonials = (params = {}) =>
  axios.get('/api/public/testimonials/employers', { params })
export const getPublicFAQs = (params = {}) => axios.get('/api/public/faqs', { params })

export const getPublicConfig = () => axios.get('/api/public/config')

