import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCandidateProfile = createAsyncThunk(
  'candidate/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/candidates/profile')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateCandidateProfile = createAsyncThunk(
  'candidate/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/candidates/profile', profileData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile')
    }
  }
)

const initialState = {
  profile: null,
  loading: false,
  error: null,
}

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    clearCandidateError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchCandidateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCandidateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload.candidate || action.payload
      })
      .addCase(fetchCandidateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update profile
      .addCase(updateCandidateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCandidateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload.candidate || action.payload
      })
      .addCase(updateCandidateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCandidateError } = candidateSlice.actions
export default candidateSlice.reducer
