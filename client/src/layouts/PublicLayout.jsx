import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { selectAuth, logout } from '../redux/slices/authSlice'
import { GlassButton } from '../components/ui/GlassButton'

function PublicTopNav() {
  const location = useLocation()
  const nav = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {nav.map((n) => {
        const active = location.pathname === n.to
        return (
          <Link
            key={n.to}
            to={n.to}
            className={
              'relative px-1 py-2 text-sm font-medium transition ' +
              (active
                ? 'text-[#8B5CF6]'
                : 'text-white/75 hover:text-white')
            }
          >
            {n.label}
            {active ? (
              <span className="absolute left-1 right-1 -bottom-[6px] h-[2px] rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.55)]" />
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}


export default function PublicLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  // If user is logged in, redirect them away from public marketing pages.
  useEffect(() => {
    if (!user) return
    if (user.role === 'candidate') navigate('/candidate')
    else if (user.role === 'company') navigate('/company')
    else navigate('/eps')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const publicActions = useMemo(() => {
    return (
      <div className="hidden items-center gap-4 md:flex text-sm">
        <Link to="/login">
          <GlassButton
            variant="ghost"
            style={{ minHeight: '44px', padding: '0 16px', borderColor: 'rgba(255,255,255,0.12)' }}
            className="backdrop-blur-xl"
          >
            Login
          </GlassButton>
        </Link>
        <Link to="/register">
          <GlassButton
            as={motion.button}
            variant="primary"
            style={{ minHeight: '44px', padding: '0 16px', background: 'linear-gradient(90deg,#7C3AED 0%, #8B5CF6 50%, #3B82F6 100%)' }}
            className="shadow-[0_0_30px_rgba(139,92,246,0.35)]"
          >
            Register
          </GlassButton>
        </Link>
      </div>
    )
  }, [])


  const handleLogout = () => {
    dispatch(logout())
    setMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="sticky top-0 z-50 h-[80px] border-b border-white/10 bg-[rgba(5,8,22,0.75)] backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_30px_rgba(139,92,246,0.35)]" />
            <div className="leading-tight">
              <p className="font-semibold">EPS Job Consultancy</p>
              <p className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">MERN SaaS</p>
            </div>
          </Link>

          <PublicTopNav />

          {publicActions}

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-[44px] w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden active:scale-95 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </header>


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
                  {[
                    { to: '/', label: 'Home' },
                    { to: '/jobs', label: 'Jobs' },
                    { to: '/services', label: 'Services' },
                    { to: '/about', label: 'About' },
                    { to: '/contact', label: 'Contact' },
                  ].map((n) => (
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

              <div className="space-y-3 border-t pt-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:shadow-[0_0_25px_rgba(124,58,237,0.25)]"
                    style={{ minHeight: '44px' }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button
                    className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,0.35)] transition hover:scale-[1.01]"
                    style={{ minHeight: '44px' }}
                  >
                    Register
                  </button>
                </Link>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:shadow-[0_0_25px_rgba(124,58,237,0.25)]"
                    style={{ minHeight: '44px' }}
                  >
                    Logout
                  </button>
                ) : null}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="mt-6 border-t border-white/10 bg-[rgba(255,255,255,0.02)]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white/70">Helping candidates and employers connect faster.</div>
              <div className="mt-2 text-2xl font-extrabold">EPS</div>
              <div className="mt-2 text-sm text-white/60">Your recruitment platform for smarter hiring and career growth.</div>
            </div>

            <div className="grid w-full gap-8 sm:grid-cols-2 md:w-auto md:grid-cols-5">
              <div className="space-y-3 md:col-span-1">
                <div className="text-sm font-semibold text-white/80">For Candidates</div>
                <div className="text-sm text-white/60">Resume Builder</div>
                <div className="text-sm text-white/60">Interview Prep</div>
                <div className="text-sm text-white/60">Application Tracking</div>
              </div>

              <div className="space-y-3 md:col-span-1">
                <div className="text-sm font-semibold text-white/80">For Employers</div>
                <div className="text-sm text-white/60">Active Jobs</div>
                <div className="text-sm text-white/60">Candidate Matches</div>
                <div className="text-sm text-white/60">Shortlisted Profiles</div>
              </div>

              <div className="space-y-3 md:col-span-1">
                <div className="text-sm font-semibold text-white/80">Services</div>
                <div className="text-sm text-white/60">Job Matching</div>
                <div className="text-sm text-white/60">Recruitment Support</div>
                <div className="text-sm text-white/60">Analytics</div>
              </div>

              <div className="space-y-3 md:col-span-1">
                <div className="text-sm font-semibold text-white/80">About</div>
                <Link to="/about" className="block text-sm text-white/60 hover:text-white">Our Story</Link>
                <Link to="/services" className="block text-sm text-white/60 hover:text-white">How it Works</Link>
              </div>

              <div className="space-y-3 md:col-span-1">
                <div className="text-sm font-semibold text-white/80">Contact</div>
                <Link to="/contact" className="block text-sm text-white/60 hover:text-white">Get in touch</Link>
                <div className="text-sm text-white/60">support@eps.jobs</div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
            © {new Date().getFullYear()} EPS Job Consultancy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}



