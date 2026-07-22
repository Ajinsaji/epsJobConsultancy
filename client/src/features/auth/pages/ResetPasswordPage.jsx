import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { authService } from '../../../services/auth.service'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function ResetPasswordPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inlineError, setInlineError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const token = searchParams.get('token')
  const newPassword = watch('password')

  const onSubmit = async (data) => {
    if (!token) {
      toast.error('Reset token is missing from the URL')
      return
    }

    setInlineError('')
    setIsSubmitting(true)
    try {
      await axios.post('/api/v1/auth/reset-password', {
        token,
        password: data.password,
      })
      toast.success('Password reset successfully. Please log in.')
      navigate('/login')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Password reset failed'
      setInlineError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[80vh] w-full bg-[#070B1A] text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#0B4C8C]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#CCA43B]/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/src/logo.png"
              alt="EPS"
              className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0B4C8C] to-[#CCA43B]"
            />
            <span className="font-extrabold tracking-tight text-sm">EPS Consultancy</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] bg-clip-text text-transparent">
            Choose New Password
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Set your new login credentials below.
          </p>

          {!token ? (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              Invalid or missing password reset link. Please check your email or request another link.
              <div className="mt-4">
                <Link to="/forgot-password" className="font-semibold text-white underline">
                  Request New Link
                </Link>
              </div>
            </div>
          ) : (
            <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">New Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 pr-28 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                    placeholder="Min 6 characters"
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
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                  placeholder="Re-enter password"
                  required
                  {...register('confirmPassword', {
                    required: 'Confirm your password',
                    validate: (value) => value === newPassword || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {inlineError && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                  {inlineError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)] transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
                style={{ minHeight: '44px' }}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-white/60">
            Back to{' '}
            <Link className="font-semibold text-[#CCA43B] hover:text-[#E5C56E] transition" to="/login">
              Log In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
