import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import applicationReducer from './slices/applicationSlice'
import notificationReducer from './slices/notificationSlice'
import candidateReducer from './slices/candidateSlice'
import companyReducer from './slices/companySlice'
import interviewReducer from './slices/interviewSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    applications: applicationReducer,
    notifications: notificationReducer,
    candidate: candidateReducer,
    company: companyReducer,
    interviews: interviewReducer,
  },
})

