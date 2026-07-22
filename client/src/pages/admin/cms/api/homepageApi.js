import axios from 'axios'

export const getHomepageConfig = async () => {
  const res = await axios.get('/api/v1/admin/homepage-config')
  return res.data
}

export const updateHomepageConfig = async (data) => {
  const res = await axios.put('/api/v1/admin/homepage-config', data)
  return res.data
}

export const publishHomepageConfig = async () => {
  const res = await axios.put('/api/v1/admin/homepage-config/publish')
  return res.data
}

export const getPlatformHealth = async () => {
  const res = await axios.get('/api/v1/admin/health')
  return res.data
}

export const getActivities = async () => {
  const res = await axios.get('/api/v1/admin/activities')
  return res.data
}
