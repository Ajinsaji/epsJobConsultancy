import axios from 'axios'

// Public read-only APIs (used for Preview rendering)
export const getPublicStats = () => axios.get('/api/v1/public/stats')
export const getPublicJobs = (params = {}) => axios.get('/api/v1/public/jobs', { params })
export const getPublicPartners = (params = {}) => axios.get('/api/v1/public/partners', { params })
export const getPublicServices = (params = {}) => axios.get('/api/v1/public/services', { params })
export const getPublicPlacements = (params = {}) => axios.get('/api/v1/public/placements', { params })
export const getPublicCandidateTestimonials = (params = {}) =>
  axios.get('/api/v1/public/testimonials/candidates', { params })
export const getPublicEmployerTestimonials = (params = {}) =>
  axios.get('/api/v1/public/testimonials/employers', { params })
export const getPublicFAQs = (params = {}) => axios.get('/api/v1/public/faqs', { params })

export const getPublicConfig = () => axios.get('/api/v1/public/config')

