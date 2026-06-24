import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/store'
import './styles/tailwind.css'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

// Global Axios Request Interceptor to inject JWT authentication token
axios.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth')
    if (authData) {
      try {
        const { token } = JSON.parse(authData)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (err) {
        console.error('Error parsing auth token from localStorage', err)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)


