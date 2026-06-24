import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/slices/authSlice'

export function ProtectedRoute({ role }) {
  const { token, user } = useSelector(selectAuth)

  if (!token || !user) return <Navigate to="/login" replace />

  // Role-based gating
  if (role && user.role !== role) return <Navigate to="/" replace />

  return <Outlet />
}

