import axios from 'axios'

export const getTestimonials = async () => {
  const res = await axios.get('/api/admin/testimonials')
  return res.data
}

export const createTestimonial = async (data) => {
  const res = await axios.post('/api/admin/testimonials', data)
  return res.data
}

export const updateTestimonial = async (id, data) => {
  const res = await axios.put(`/api/admin/testimonials/${id}`, data)
  return res.data
}

export const deleteTestimonial = async (id) => {
  const res = await axios.delete(`/api/admin/testimonials/${id}`)
  return res.data
}
