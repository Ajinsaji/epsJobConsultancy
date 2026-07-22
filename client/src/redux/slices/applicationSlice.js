import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async Thunks
export const applyJob = createAsyncThunk(
  'applications/apply',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/applications', applicationData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to submit application')
    }
  }
)

export const withdrawApplication = createAsyncThunk(
  'applications/withdraw',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/applications/${id}`)
      return { id, message: response.data.message }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to withdraw application')
    }
  }
)

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/applications/me')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch your applications')
    }
  }
)

export const fetchCompanyApplications = createAsyncThunk(
  'applications/fetchCompany',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/applications/company/me', { params })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch company applications')
    }
  }
)

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, status, remarks }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/applications/${id}/status`, { status, remarks })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update application status')
    }
  }
)

const initialState = {
  applications: [],
  loading: false,
  error: null,
}

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearApplicationError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply
      .addCase(applyJob.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false
        state.applications.unshift(action.payload.application || action.payload)
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Withdraw
      .addCase(withdrawApplication.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.loading = false
        state.applications = state.applications.filter((a) => a._id !== action.payload.id)
      })
      .addCase(withdrawApplication.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch My Applications
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false
        state.applications = action.payload.applications || action.payload
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Company Applications
      .addCase(fetchCompanyApplications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCompanyApplications.fulfilled, (state, action) => {
        state.loading = false
        state.applications = action.payload.applications || action.payload
      })
      .addCase(fetchCompanyApplications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update Status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload.application || action.payload
        const idx = state.applications.findIndex((a) => a._id === updated._id)
        if (idx !== -1) state.applications[idx] = updated
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearApplicationError } = applicationSlice.actions
export default applicationSlice.reducer
