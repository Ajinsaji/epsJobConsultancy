import axios from 'axios'

export const getFAQs = async () => {
  const res = await axios.get('/api/admin/faqs')
  return res.data
}

export const createFAQ = async (data) => {
  const res = await axios.post('/api/admin/faqs', data)
  return res.data
}

export const updateFAQ = async (id, data) => {
  const res = await axios.put(`/api/admin/faqs/${id}`, data)
  return res.data
}

export const deleteFAQ = async (id) => {
  const res = await axios.delete(`/api/admin/faqs/${id}`)
  return res.data
}
