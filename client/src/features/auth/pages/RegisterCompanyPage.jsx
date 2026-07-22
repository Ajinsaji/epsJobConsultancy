import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../../services/auth.service'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function RegisterCompanyPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inlineError, setInlineError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const password = watch('password')

  const onSubmit = async (data) => {
    setInlineError('')
    setIsSubmitting(true)
    try {
      const payload = {
        name: data.companyName, // mapped to user.name
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: 'company'
      }
      const response = await authService.register(payload)
      toast.success(response.data?.message || 'Company registered successfully. Please check email to verify.')
      navigate('/login')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Registration failed'
      setInlineError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070B1A] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: ONBOARDING & VALUES */}
        <motion.section
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden lg:block rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-10 relative overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#0B4C8C]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#CCA43B]/15 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <img
                src="/src/logo.png"
                alt="EPS"
                className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#0B4C8C] via-[#CCA43B] to-[#1F7BE5] shadow-[0_0_20px_rgba(11,76,140,0.35)]"
              />
              <div className="leading-tight">
                <span className="font-extrabold tracking-tight text-lg">EPS Consultancy</span>
                <p className="text-[10px] font-bold tracking-widest text-[#CCA43B] uppercase">
                  Smart Recruitment Platform
                </p>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight bg-gradient-to-r from-[#0B4C8C] via-[#CCA43B] to-[#1F7BE5] bg-clip-text text-transparent">
              Partner with EPS
            </h1>
            <p className="mt-3 text-sm text-white/70 max-w-[420px]">
              Access top talent verified and pre-screened by EPS. Create your employer portal to start hiring today.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { title: 'AI Match Ready', desc: 'Connect with pre-screened candidates using our scoring engine.' },
                { title: 'Interview Coordination', desc: 'Schedule and coordinate interviews with minimal effort.' },
                { title: 'Secure Integration', desc: 'Verify candidate backgrounds and qualifications securely.' }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B4C8C]/30 to-[#CCA43B]/20">
                    ✓
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white/90">{item.title}</div>
                    <div className="text-xs text-white/60 mt-0.5">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-xs text-white/50">
              Premium SaaS recruitment experience — secure, fast, and built for modern hiring teams.
            </div>
          </div>
        </motion.section>

        {/* RIGHT COLUMN: REGISTRATION FORM */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl overflow-hidden relative"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#0B4C8C]/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] bg-clip-text text-transparent">
              Register Company
            </h2>
            <p className="mt-2 text-sm text-white/70">Create an employer account to post jobs and search talent.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Company Name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                  placeholder="e.g. Acme Corp"
                  required
                  {...register('companyName', { required: 'Company name is required' })}
                />
                {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Work Email Address</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                  placeholder="hr@acme.com"
                  type="email"
                  required
                  {...register('email', { required: 'Work email is required' })}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Phone Number</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  {...register('phone')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 pr-28 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                    placeholder="••••••••"
                    required
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                  placeholder="••••••••"
                  required
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: (value) => value === password || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {inlineError && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                  {inlineError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)] transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ minHeight: '44px' }}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Register Company'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-white/60">
              Already have an account?{' '}
              <Link className="font-semibold text-[#CCA43B] hover:text-[#E5C56E] transition" to="/login">
                Log In
              </Link>
            </div>
            <div className="mt-2 text-center text-xs text-white/60">
              Want to register as candidate?{' '}
              <Link className="font-semibold text-[#CCA43B] hover:text-[#E5C56E] transition" to="/register">
                Register Candidate
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
