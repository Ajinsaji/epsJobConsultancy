import { useEffect, useState, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying') // verifying | success | error
  const [message, setMessage] = useState('')
  const verificationAttempted = useRef(false)

  const token = searchParams.get('token')

  useEffect(() => {
    // Avoid double-rendering triggers in React 18 strict mode
    if (verificationAttempted.current) return
    verificationAttempted.current = true

    if (!token) {
      setStatus('error')
      setMessage('Missing verification token. Please check the email link again.')
      return
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post('/api/auth/verify-email', { token })
        setStatus('success')
        setMessage(response.data.message || 'Email verified successfully!')
      } catch (err) {
        setStatus('error')
        setMessage(err.response?.data?.message || 'Email verification failed or link has expired.')
      }
    }

    verifyToken()
  }, [token])

  return (
    <div className="min-h-[80vh] w-full bg-[#070B1A] text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl relative overflow-hidden text-center"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#0B4C8C]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#CCA43B]/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              src="/src/logo.png"
              alt="EPS"
              className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0B4C8C] to-[#CCA43B]"
            />
            <span className="font-extrabold tracking-tight text-sm">EPS Consultancy</span>
          </div>

          {status === 'verifying' && (
            <div className="py-8">
              <svg className="h-12 w-12 animate-spin text-[#CCA43B] mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <h3 className="text-xl font-bold text-white">Verifying Email</h3>
              <p className="text-white/60 text-sm mt-2">Connecting to secure authentication service...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Verification Complete</h3>
              <p className="text-white/70 text-sm mt-2">{message}</p>

              <div className="mt-8">
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)] transition hover:brightness-105 active:scale-[0.99]"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="py-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Verification Failed</h3>
              <p className="text-red-300 text-sm mt-2">{message}</p>

              <div className="mt-8 space-y-3">
                <Link
                  to="/register"
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)] transition hover:brightness-105"
                >
                  Register Again
                </Link>
                <Link
                  to="/login"
                  className="block text-xs font-semibold text-[#CCA43B] hover:text-[#E5C56E] transition"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
