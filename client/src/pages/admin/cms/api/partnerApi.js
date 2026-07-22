import axios from 'axios'

export const getCompanies = async () => {
  const res = await axios.get('/api/v1/admin/companies')
  return res.data
}

export const updateCompanyHomepageProps = async (id, data) => {
  const res = await axios.put(`/api/v1/admin/companies/${id}/homepage`, data)
  return res.data
}
