import axios from 'axios'

export const getPlacements = async () => {
  const res = await axios.get('/api/admin/placements')
  return res.data
}

export const createPlacement = async (data) => {
  const res = await axios.post('/api/admin/placements', data)
  return res.data
}

export const updatePlacement = async (id, data) => {
  const res = await axios.put(`/api/admin/placements/${id}`, data)
  return res.data
}

export const deletePlacement = async (id) => {
  const res = await axios.delete(`/api/admin/placements/${id}`)
  return res.data
}
