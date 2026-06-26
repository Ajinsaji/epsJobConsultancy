import axios from 'axios'

export const getCompanies = async () => {
  const res = await axios.get('/api/admin/companies')
  return res.data
}

export const updateCompanyHomepageProps = async (id, data) => {
  const res = await axios.put(`/api/admin/companies/${id}/homepage`, data)
  return res.data
}
