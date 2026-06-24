import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { selectAuth, logout } from '../redux/slices/authSlice'
import { GlassButton } from '../components/ui/GlassButton'


export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    setMobileMenuOpen(false)
    navigate('/')
  }

  // Base navigation
  const publicNav = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  // Role-specific navigation links
  const candidateNav = [
    { to: '/candidate', label: 'Dashboard' },
    { to: '/candidate/jobs', label: 'Find Jobs' },
    { to: '/candidate/profile', label: 'My Profile' },
  ]

  const companyNav = [
    { to: '/company', label: 'Dashboard' },
  ]

  const epsNav = [
    { to: '/eps', label: 'Dashboard' },
  ]

  const currentNav = !user
    ? publicNav
    : user.role === 'candidate'
    ? candidateNav
    : user.role === 'company'
    ? companyNav
    : epsNav

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 md:pb-0">
      {/* Top sticky navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-100" />
            <div>
              <p className="font-bold leading-tight text-slate-800">EPS Job Consultancy</p>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">MERN SaaS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {currentNav.map((n) => (
              <Link
                key={n.to}
                className={
                  location.pathname === n.to
                    ? 'text-indigo-600 font-semibold text-sm'
                    : 'text-slate-600 hover:text-slate-950 font-medium text-sm transition'
                }
                to={n.to}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden items-center gap-4 md:flex text-sm">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-600 font-medium">
                  Signed in as <span className="font-bold text-slate-800">{user.name}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  style={{ minHeight: '38px' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <GlassButton variant="primary" style={{ minHeight: '38px', padding: '0 16px' }}>
                  Login
                </GlassButton>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 md:hidden active:scale-95 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-72 bg-white p-6 shadow-2xl md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-bold text-slate-800">Menu</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
                <nav className="mt-6 flex flex-col gap-4">
                  {currentNav.map((n) => (
                    <Link
                      key={n.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={
                        location.pathname === n.to
                          ? 'text-indigo-600 font-bold text-lg'
                          : 'text-slate-600 hover:text-slate-900 font-medium text-lg'
                      }
                      to={n.to}
                    >
                      {n.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-t pt-4 space-y-4">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-500">
                      Logged in as <span className="font-bold text-slate-700">{user.name}</span>
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                      style={{ minHeight: '44px' }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition"
                      style={{ minHeight: '44px' }}
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main body content */}
      <motion.main
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <Outlet />
      </motion.main>

      {/* Mobile Bottom Navigation Bar (Visible only on mobile for logged-in users) */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-md md:hidden flex justify-around items-center shadow-lg">
          {user.role === 'candidate' && (
            <>
              <Link to="/candidate" className={`flex flex-col items-center text-xs font-semibold ${location.pathname === '/candidate' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </Link>
              <Link to="/candidate/jobs" className={`flex flex-col items-center text-xs font-semibold ${location.pathname === '/candidate/jobs' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <span className="text-lg">🔍</span>
                <span>Search</span>
              </Link>
              <Link to="/candidate/profile" className={`flex flex-col items-center text-xs font-semibold ${location.pathname === '/candidate/profile' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <span className="text-lg">👤</span>
                <span>Profile</span>
              </Link>
            </>
          )}
          {user.role === 'company' && (
            <>
              <Link to="/company" className={`flex flex-col items-center text-xs font-semibold ${location.pathname === '/company' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </Link>
              <button onClick={handleLogout} className="flex flex-col items-center text-xs font-semibold text-slate-400">
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </>
          )}
          {user.role === 'eps_admin' && (
            <>
              <Link to="/eps" className={`flex flex-col items-center text-xs font-semibold ${location.pathname === '/eps' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <span className="text-lg">📊</span>
                <span>Admin</span>
              </Link>
              <button onClick={handleLogout} className="flex flex-col items-center text-xs font-semibold text-slate-400">
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-400 flex justify-between items-center">
          <span>© {new Date().getFullYear()} EPS Job Consultancy Platform. All rights reserved.</span>
          <span className="font-medium">Powered by MongoDB SaaS Engine</span>
        </div>
      </footer>
    </div>
  )
}

Layout.NotFound = function NotFound() {
  return (
    <div className="rounded-xl border bg-white p-6 max-w-md mx-auto text-center mt-10 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">404 - Page Not Found</h1>
      <p className="mt-2 text-slate-500 text-sm">The route you requested does not exist.</p>
      <Link className="mt-6 inline-block" to="/">
        <GlassButton variant="primary">Go to Home</GlassButton>
      </Link>
    </div>
  )
}


