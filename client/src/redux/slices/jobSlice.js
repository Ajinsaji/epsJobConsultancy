import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async Thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/jobs', { params })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs')
    }
  }
)

export const fetchJobById = createAsyncThunk(
  'jobs/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/jobs/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch job details')
    }
  }
)

export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/jobs', jobData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create job')
    }
  }
)

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/jobs/${id}`, jobData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update job')
    }
  }
)

export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/jobs/${id}`)
      return { id, message: response.data.message }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete job')
    }
  }
)

const initialState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  pagination: null,
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null
    },
    clearJobError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload.jobs || action.payload
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false
        state.currentJob = action.payload.job || action.payload
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create
      .addCase(createJob.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false
        state.jobs.unshift(action.payload.job || action.payload)
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update
      .addCase(updateJob.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload.job || action.payload
        const idx = state.jobs.findIndex((j) => j._id === updated._id)
        if (idx !== -1) state.jobs[idx] = updated
        if (state.currentJob?._id === updated._id) state.currentJob = updated
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Delete
      .addCase(deleteJob.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = state.jobs.filter((j) => j._id !== action.payload.id)
        if (state.currentJob?._id === action.payload.id) state.currentJob = null
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentJob, clearJobError } = jobSlice.actions
export default jobSlice.reducer
