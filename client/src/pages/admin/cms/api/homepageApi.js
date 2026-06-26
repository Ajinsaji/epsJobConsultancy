import axios from 'axios'

export const getHomepageConfig = async () => {
  const res = await axios.get('/api/admin/homepage-config')
  return res.data
}

export const updateHomepageConfig = async (data) => {
  const res = await axios.put('/api/admin/homepage-config', data)
  return res.data
}

export const publishHomepageConfig = async () => {
  const res = await axios.put('/api/admin/homepage-config/publish')
  return res.data
}

export const getPlatformHealth = async () => {
  const res = await axios.get('/api/admin/health')
  return res.data
}

export const getActivities = async () => {
  const res = await axios.get('/api/admin/activities')
  return res.data
}
