import axios from 'axios'

const unwrap = (res) => {
  // Backend contract (standardized): { success, message, data, pagination }
  // Some endpoints may still return plain data; support both in a single place.
  const payload = res?.data
  if (payload && Object.prototype.hasOwnProperty.call(payload, 'data')) return payload.data
  return payload
}

export const publicApi = {
  getStats: async () => unwrap(await axios.get('/api/public/stats')),

  getJobs: async (params = {}) => unwrap(await axios.get('/api/public/jobs', { params })),

  getPartners: async (params = {}) => unwrap(await axios.get('/api/public/partners', { params })),

  getServices: async (params = {}) => unwrap(await axios.get('/api/public/services', { params })),

  getPlacements: async (params = {}) => unwrap(await axios.get('/api/public/placements', { params })),

  getCandidateTestimonials: async (params = {}) =>
    unwrap(await axios.get('/api/public/testimonials/candidates', { params })),

  getEmployerTestimonials: async (params = {}) =>
    unwrap(await axios.get('/api/public/testimonials/employers', { params })),

  getFAQs: async (params = {}) => unwrap(await axios.get('/api/public/faqs', { params })),

  getHomepageConfig: async () => unwrap(await axios.get('/api/public/config'))
}

