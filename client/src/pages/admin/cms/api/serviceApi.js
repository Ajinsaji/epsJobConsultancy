import axios from 'axios'

export const getServices = async () => {
  const res = await axios.get('/api/admin/services')
  return res.data
}

export const createService = async (data) => {
  const res = await axios.post('/api/admin/services', data)
  return res.data
}

export const updateService = async (id, data) => {
  const res = await axios.put(`/api/admin/services/${id}`, data)
  return res.data
}

export const deleteService = async (id) => {
  const res = await axios.delete(`/api/admin/services/${id}`)
  return res.data
}
