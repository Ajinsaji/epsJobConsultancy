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
              'relative px-1 py-2 text-sm font-semibold transition tracking-wide ' +
              (active
                ? 'text-[#A78BFA]'
                : 'text-white/70 hover:text-white')
            }
          >
            {n.label}
            {active ? (
              <motion.span 
                layoutId="activeNavIndicator"
                className="absolute left-1 right-1 -bottom-[20px] h-[3px] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] shadow-[0_0_15px_rgba(139,92,246,0.8)]" 
              />
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
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // If user is logged in, redirect them away from public marketing pages.
  useEffect(() => {
    if (!user) return
    if (user.role === 'candidate') navigate('/candidate')
    else if (user.role === 'company') navigate('/company')
    else navigate('/eps')
  }, [user, navigate])

  const publicActions = useMemo(() => {
    return (
      <div className="hidden items-center gap-4 md:flex text-sm">
        <Link to="/login">
          <GlassButton
            variant="ghost"
            style={{ minHeight: '40px', padding: '0 16px', borderColor: 'rgba(255,255,255,0.1)' }}
            className="text-xs font-bold hover:bg-white/5 transition"
          >
            Login
          </GlassButton>
        </Link>
        <Link to="/register">
          <GlassButton
            as={motion.button}
            variant="primary"
            style={{ minHeight: '40px', padding: '0 16px', background: 'linear-gradient(90deg,#7C3AED 0%, #8B5CF6 50%, #3B82F6 100%)' }}
            className="text-xs font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition"
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterEmail('')
    alert('Thank you for subscribing to our recruitment insights newsletter!')
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* SECTION 1 - Sticky Navigation Header */}
      <header className="sticky top-0 z-50 h-[80px] border-b border-white/5 bg-[#050816]/70 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_20px_rgba(139,92,246,0.35)] group-hover:scale-105 transition" />
            <div className="leading-tight">
              <span className="font-extrabold text-white tracking-tight text-base">EPS Consultancy</span>
              <p className="text-[9px] font-bold tracking-widest text-[#A78BFA] uppercase">Smart Recruitment</p>
            </div>
          </Link>

          <PublicTopNav />

          {publicActions}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden active:scale-95 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#02040A]/60 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-72 bg-[#080E24] border-l border-white/10 p-6 shadow-2xl md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-extrabold text-white">Navigation Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white text-lg">✕</button>
                </div>

                <nav className="mt-8 flex flex-col gap-6">
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
                        'font-bold text-lg transition ' +
                        (location.pathname === n.to
                          ? 'text-[#A78BFA]'
                          : 'text-white/70 hover:text-white')
                      }
                      to={n.to}
                    >
                      {n.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <Link to="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white/90 backdrop-blur hover:bg-white/10 active:scale-98 transition">
                    Login
                  </button>
                </Link>
                <Link to="/register" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.01] active:scale-98 transition">
                    Register
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area (Full width to allow responsive section controls) */}
      <main className="w-full flex-grow">
        <Outlet />
      </main>

      {/* SECTION 15 - Professional Footer */}
      <footer className="border-t border-white/5 bg-[#030611] pt-16 pb-8 relative overflow-hidden">
        {/* Background glow in footer */}
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#7C3AED]/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#3B82F6]/10 blur-3xl" />

        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] border-b border-white/5 pb-12">
            {/* Column 1 - Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#3B82F6]" />
                <span className="font-bold tracking-tight text-white text-lg">EPS Consultancy</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                EPS Job Consultancy is a hybrid recruitment platform that bridges the gap between top tech talent and high-growth companies. We support screening, assessments, and interview coordination.
              </p>
              {/* Social icons */}
              <div className="flex gap-4 pt-2">
                {['twitter', 'github', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition"
                  >
                    <span className="capitalize text-xs font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Links for Candidates */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">Candidates</h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li><Link to="/register" className="hover:text-white transition">Create Profile</Link></li>
                <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link to="/services" className="hover:text-white transition">AI Resume Score</Link></li>
              </ul>
            </div>

            {/* Column 3 - Links for Employers */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">Employers</h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li><Link to="/register" className="hover:text-white transition">Register Company</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Post a Job</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Screening Service</Link></li>
                <li><Link to="/about" className="hover:text-white transition">Partner Program</Link></li>
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">Recruitment Insights</h4>
              <p className="text-sm text-white/60">Subscribe to get monthly hiring trends and career strategies.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/35 focus:outline-none focus:border-indigo-500 w-full"
                />
                <button type="submit" className="rounded-xl bg-indigo-600 px-4 text-sm font-bold hover:bg-indigo-500 transition active:scale-95 shrink-0">
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-white/40">We respect your privacy. Opt-out at any time.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs text-white/50">
            <div>
              © {new Date().getFullYear()} EPS Job Consultancy. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
