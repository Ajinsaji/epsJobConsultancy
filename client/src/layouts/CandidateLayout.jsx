import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { selectAuth, logout } from '../redux/slices/authSlice'
import { GlassButton } from '../components/ui/GlassButton'

function CandidateSidebar() {
  const location = useLocation()
  const nav = [
    { to: '/candidate', label: 'Dashboard' },
    { to: '/candidate/jobs', label: 'Jobs' },
    { to: '/candidate/applied', label: 'Applications' },
    { to: '/candidate/notifications', label: 'Notifications' },
    { to: '/candidate/profile', label: 'Profile' },
    { to: '/candidate/resume-analyzer', label: 'Interviews' },
  ]

  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-[5.25rem] rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-semibold text-white/70 mb-3">Candidate</div>
        <nav className="space-y-2">
          {nav
            .filter((n) => !n.to.includes('resume-analyzer'))
            .map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={
                  location.pathname === n.to
                    ? 'block rounded-xl bg-indigo-500/20 text-indigo-200 px-3 py-2 text-sm font-semibold'
                    : 'block rounded-xl text-white/70 hover:bg-white/10 hover:text-white px-3 py-2 text-sm transition'
                }
              >
                {n.label}
              </Link>
            ))}
          <Link
            to="/candidate/resume-analyzer"
            className={
              location.pathname === '/candidate/resume-analyzer'
                ? 'block rounded-xl bg-indigo-500/20 text-indigo-200 px-3 py-2 text-sm font-semibold'
                : 'block rounded-xl text-white/70 hover:bg-white/10 hover:text-white px-3 py-2 text-sm transition'
            }
          >
            Interviews
          </Link>
        </nav>
      </div>
    </aside>
  )
}

function CandidateBottomNav() {
  const location = useLocation()
  const nav = [
    { to: '/candidate', label: 'Home', icon: '🏠' },
    { to: '/candidate/jobs', label: 'Jobs', icon: '💼' },
    { to: '/candidate/applied', label: 'Applications', icon: '📄' },
    { to: '/candidate/notifications', label: 'Notifications', icon: '🔔' },
    { to: '/candidate/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-900/80 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-5 px-2 py-2">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className={
              location.pathname === n.to
                ? 'flex flex-col items-center justify-center rounded-xl bg-indigo-500/20 text-xs font-semibold text-indigo-200 py-2'
                : 'flex flex-col items-center justify-center rounded-xl text-xs font-semibold text-white/50 hover:text-white py-2 transition'
            }
          >
            <span className="text-base leading-none">{n.icon}</span>
            <span className="mt-1">{n.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function CandidateLayout() {
  const { user } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    if (user.role !== 'candidate') {
      navigate(user.role === 'company' ? '/company' : '/eps')
    }
  }, [user, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-16 md:pb-0">
      <div className="border-b border-white/10 bg-[#0B1020]/60 backdrop-blur supports-[backdrop-filter]:bg-[#0B1020]/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/candidate" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600" />
            <div>
              <div className="text-sm font-bold">EPS Candidate</div>
              <div className="text-[10px] text-white/50">Recruitment portal</div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <div className="text-xs text-white/60">Hi, {user?.name}</div>
            <GlassButton as="button" variant="ghost" onClick={handleLogout}>
              Logout
            </GlassButton>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[16rem_1fr] gap-6 px-4 py-6">
        <CandidateSidebar />
        <div>
          <Outlet />
        </div>
      </div>

      <CandidateBottomNav />
    </div>
  )
}

