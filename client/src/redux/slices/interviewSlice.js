import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllInterviews = createAsyncThunk(
  'interviews/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/interviews')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch interviews')
    }
  }
)

export const fetchMyInterviews = createAsyncThunk(
  'interviews/fetchMy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/interviews/me')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch your interviews')
    }
  }
)

export const fetchCompanyInterviews = createAsyncThunk(
  'interviews/fetchCompany',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/interviews/company/${companyId}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch company interviews')
    }
  }
)

export const scheduleInterview = createAsyncThunk(
  'interviews/schedule',
  async (interviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/interviews', interviewData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to schedule interview')
    }
  }
)

export const updateInterviewDetails = createAsyncThunk(
  'interviews/update',
  async ({ id, interviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/interviews/${id}`, interviewData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update interview')
    }
  }
)

export const cancelInterview = createAsyncThunk(
  'interviews/cancel',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/interviews/${id}`)
      return { id, message: response.data.message }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel interview')
    }
  }
)

const initialState = {
  interviews: [],
  loading: false,
  error: null,
}

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    clearInterviewError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllInterviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllInterviews.fulfilled, (state, action) => {
        state.loading = false
        state.interviews = action.payload.interviews || action.payload
      })
      .addCase(fetchAllInterviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch my
      .addCase(fetchMyInterviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyInterviews.fulfilled, (state, action) => {
        state.loading = false
        state.interviews = action.payload.interviews || action.payload
      })
      .addCase(fetchMyInterviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch company
      .addCase(fetchCompanyInterviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCompanyInterviews.fulfilled, (state, action) => {
        state.loading = false
        state.interviews = action.payload.interviews || action.payload
      })
      .addCase(fetchCompanyInterviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Schedule
      .addCase(scheduleInterview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.loading = false
        state.interviews.push(action.payload.interview || action.payload)
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update
      .addCase(updateInterviewDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateInterviewDetails.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload.interview || action.payload
        const idx = state.interviews.findIndex((i) => i._id === updated._id)
        if (idx !== -1) state.interviews[idx] = updated
      })
      .addCase(updateInterviewDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Cancel/delete
      .addCase(cancelInterview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelInterview.fulfilled, (state, action) => {
        state.loading = false
        state.interviews = state.interviews.filter((i) => i._id !== action.payload.id)
      })
      .addCase(cancelInterview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearInterviewError } = interviewSlice.actions
export default interviewSlice.reducer
