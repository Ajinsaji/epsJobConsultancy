import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectAuth, logout } from '../redux/slices/authSlice'
import { GlassButton } from '../components/ui/GlassButton'

function EPSSidebar() {
  const location = useLocation()
  const nav = [
    { to: '/eps', label: 'Dashboard' },
    { to: '/eps/manage-companies', label: 'Companies' },
    { to: '/eps/manage-candidates', label: 'Candidates' },
    { to: '/eps/manage-jobs', label: 'Jobs' },
    { to: '/eps/applications', label: 'Applications' },
    { to: '/eps/interviews', label: 'Interviews' },
    { to: '/eps/analytics', label: 'Analytics' },
    { to: '/eps/homepage', label: 'Homepage CMS' },
  ]

  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-[5.25rem] rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-semibold text-white/70 mb-3">EPS Admin</div>
        <nav className="space-y-2">
          {nav.map((n) => (
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
        </nav>
      </div>
    </aside>
  )
}

export default function EPSLayout() {
  const { user } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    if (user.role !== 'eps_admin') {
      navigate(user.role === 'candidate' ? '/candidate' : '/company')
    }
  }, [user, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="border-b border-white/10 bg-[#0B1020]/60 backdrop-blur supports-[backdrop-filter]:bg-[#0B1020]/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/eps" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600" />
            <div>
              <div className="text-sm font-bold">EPS Admin</div>
              <div className="text-[10px] text-white/50">Management console</div>
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

      <div className="mx-auto grid max-w-6xl grid-cols-1 xl:grid-cols-[16rem_1fr] gap-6 px-4 py-6">
        <EPSSidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

