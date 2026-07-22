import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/notifications/me')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch notifications')
    }
  }
)

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/v1/notifications/${id}/read`)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update notification')
    }
  }
)

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.patch('/api/v1/notifications/read-all')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update notifications')
    }
  }
)

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addLocalNotification: (state, action) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.read) state.unreadCount += 1
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.notifications = action.payload.notifications || action.payload
        state.unreadCount = state.notifications.filter((n) => !n.read).length
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const updated = action.payload.notification || action.payload
        const idx = state.notifications.findIndex((n) => n._id === updated._id)
        if (idx !== -1) {
          state.notifications[idx] = updated
        }
        state.unreadCount = state.notifications.filter((n) => !n.read).length
      })
      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({ ...n, read: true }))
        state.unreadCount = 0
      })
  },
})

export const { addLocalNotification } = notificationSlice.actions
export default notificationSlice.reducer
