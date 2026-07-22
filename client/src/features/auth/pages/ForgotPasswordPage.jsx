import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { authService } from '../../../services/auth.service'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [inlineError, setInlineError] = useState('')

  const onSubmit = async (data) => {
    setInlineError('')
    setIsSubmitting(true)
    try {
      await authService.forgotPassword(data.email || data)
      setIsSent(true)
      toast.success('Reset instructions sent successfully')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Request failed'
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-white/70">
            {isSent 
              ? "We've sent a link to your email to reset your password." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>

          {!isSent ? (
            <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">Email Address</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40"
                  placeholder="name@example.com"
                  type="email"
                  required
                  {...register('email', { required: 'Email is required' })}
                />
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
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : (
            <div className="mt-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-white/90">Email Sent!</p>
              <p className="text-xs text-white/50 mt-1">Please check your inbox (and spam folder) for password recovery instructions.</p>
            </div>
          )}

          <div className="mt-6 text-center text-xs text-white/60">
            Remember your password?{' '}
            <Link className="font-semibold text-[#CCA43B] hover:text-[#E5C56E] transition" to="/login">
              Log In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
