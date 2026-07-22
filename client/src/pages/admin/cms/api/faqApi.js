import axios from 'axios'

export const getFAQs = async () => {
  const res = await axios.get('/api/v1/admin/faqs')
  return res.data
}

export const createFAQ = async (data) => {
  const res = await axios.post('/api/v1/admin/faqs', data)
  return res.data
}

export const updateFAQ = async (id, data) => {
  const res = await axios.put(`/api/v1/admin/faqs/${id}`, data)
  return res.data
}

export const deleteFAQ = async (id) => {
  const res = await axios.delete(`/api/v1/admin/faqs/${id}`)
  return res.data
}
