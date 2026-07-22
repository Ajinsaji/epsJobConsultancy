import axios from 'axios'

export const getPlacements = async () => {
  const res = await axios.get('/api/v1/admin/placements')
  return res.data
}

export const createPlacement = async (data) => {
  const res = await axios.post('/api/v1/admin/placements', data)
  return res.data
}

export const updatePlacement = async (id, data) => {
  const res = await axios.put(`/api/v1/admin/placements/${id}`, data)
  return res.data
}

export const deletePlacement = async (id) => {
  const res = await axios.delete(`/api/v1/admin/placements/${id}`)
  return res.data
}
