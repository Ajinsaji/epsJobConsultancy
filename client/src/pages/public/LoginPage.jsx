import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [clickTimes, setClickTimes] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true) // UI only
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inlineError, setInlineError] = useState('')

  const handleBetamindClick = () => {
    const now = Date.now()
    const validClicks = [...clickTimes.filter((t) => now - t < 3000), now]
    setClickTimes(validClicks)
    if (validClicks.length >= 3) {
      navigate('/admin-login')
    }
  }

  const onSubmit = async (data) => {
    setInlineError('')
    setIsSubmitting(true)
    try {
      const res = await axios.post('/api/auth/login', data)
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }))
      toast.success('Logged in successfully')

      const role = res.data?.user?.role
      if (role === 'candidate') {
        navigate('/candidate')
      } else if (role === 'company') {
        navigate('/company')
      } else if (role === 'eps_admin') {
        navigate('/eps')
      } else {
        navigate('/')
      }
    } catch (e) {
      const msg = e?.response?.data?.message || 'Login failed'
      setInlineError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[80vh] w-full bg-[#070B1A] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
        {/* LEFT BRANDING */}
        <motion.section
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden lg:block rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-10 relative overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#5B4DFF]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <img
                src="/src/logo.png"
                alt="EPS"
                className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_20px_rgba(124,58,237,0.35)]"
              />
              <div className="leading-tight">
                <span className="font-extrabold tracking-tight text-lg">EPS Consultancy</span>
                <p className="text-[10px] font-bold tracking-widest text-[#A78BFA] uppercase">
                  Smart Recruitment Platform
                </p>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight bg-gradient-to-r from-[#5B4DFF] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-3 text-sm text-white/70 max-w-[420px]">
              Sign in to continue your recruitment journey with AI-assisted matching and trusted workflows.
            </p>

            <div className="mt-8 space-y-3">
              {['AI Assisted Recruitment', 'Trusted Companies', 'Secure Authentication'].map((t, idx) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B4DFF]/30 to-[#8B5CF6]/30 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="text-sm font-semibold text-white/90">{t}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-xs text-white/50">
              Premium SaaS recruitment experience — secure, fast, and built for modern hiring teams.
            </div>
          </div>
        </motion.section>

        {/* RIGHT LOGIN CARD */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl overflow-hidden relative"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#5B4DFF]/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#5B4DFF] to-[#8B5CF6] bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-white/70">Sign in to continue your recruitment journey.</p>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Email Address</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/40"
                  placeholder="name@example.com"
                  type="email"
                  required
                  {...register('email')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 pr-28 text-sm outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/40"
                    placeholder="••••••••"
                    required
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <label className="flex items-center gap-2 select-none text-white/70">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-[#8B5CF6]"
                  />
                  Remember me
                </label>

                <Link className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD] transition" to="/forgot-password">
                  Forgot Password
                </Link>
              </div>

              {inlineError ? (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">{inlineError}</div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#5B4DFF] to-[#8B5CF6] px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ minHeight: '44px' }}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-white/60">
              Don&apos;t have a candidate account?{' '}
              <Link className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD] transition" to="/register">
                Register as Candidate
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Keep footer behavior */}
        <footer className="lg:hidden col-span-1 text-center text-xs text-white/40 select-none mt-2">
          Powered by{' '}
          <span
            onClick={handleBetamindClick}
            style={{ cursor: 'text' }}
            className="font-semibold text-white/40 hover:text-white/60 transition-colors"
          >
            Betamind
          </span>{' '}
          Tech Solutions
        </footer>
      </div>

      <footer className="hidden lg:block mt-8 text-center text-xs text-slate-400 select-none">
        Powered by{' '}
        <span
          onClick={handleBetamindClick}
          style={{ cursor: 'text' }}
          className="font-medium text-slate-400 hover:text-slate-400 transition-colors"
        >
          Betamind
        </span>{' '}
        Tech Solutions
      </footer>
    </div>
  )
}


