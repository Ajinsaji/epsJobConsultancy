import { createSlice } from '@reduxjs/toolkit'

const persistedRaw = typeof window !== 'undefined' ? window.localStorage.getItem('auth') : null
const persisted = persistedRaw ? JSON.parse(persistedRaw) : null

const initialState = {
  token: persisted?.token ?? null,
  user: persisted?.user ?? null,
  status: 'idle',
  error: null,
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('auth', JSON.stringify({ token: state.token, user: state.user }))
      }
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.status = 'idle'
      state.error = null
      if (typeof window !== 'undefined') window.localStorage.removeItem('auth')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const selectAuth = (state) => state.auth
export default authSlice.reducer

