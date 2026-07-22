import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCompanyProfile = createAsyncThunk(
  'company/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/companies/me')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch company profile')
    }
  }
)

export const updateCompanyProfile = createAsyncThunk(
  'company/updateProfile',
  async ({ id, companyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/companies/${id}`, companyData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update company profile')
    }
  }
)

export const fetchSavedCandidates = createAsyncThunk(
  'company/fetchSaved',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/companies/me/candidates/saved')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch saved candidates')
    }
  }
)

export const toggleSaveCandidate = createAsyncThunk(
  'company/toggleSave',
  async (candidateId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/companies/me/candidates/${candidateId}/save`)
      return { candidateId, data: response.data }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update candidate save status')
    }
  }
)

const initialState = {
  profile: null,
  savedCandidates: [],
  loading: false,
  error: null,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    clearCompanyError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload.company || action.payload
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update profile
      .addCase(updateCompanyProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload.company || action.payload
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch saved candidates
      .addCase(fetchSavedCandidates.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSavedCandidates.fulfilled, (state, action) => {
        state.loading = false
        state.savedCandidates = action.payload.savedCandidates || action.payload
      })
      .addCase(fetchSavedCandidates.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCompanyError } = companySlice.actions
export default companySlice.reducer
