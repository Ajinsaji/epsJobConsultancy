import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { authService } from '../../../services/auth.service'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState(null) // 'candidate' | null

  const onSubmit = async (data) => {
    try {
      const response = await authService.register(data)
      toast.success(response.data?.message || 'Registration successful. Please check your email to verify.')
      navigate('/login')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Registration failed')
    }
  }

  const candidateForm = useMemo(() => {
    if (accountType !== 'candidate') return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl"
      >
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] bg-clip-text text-transparent">
          Create Candidate Account
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Apply for jobs, get AI resume matching, and track your applications.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40 text-white"
            placeholder="Name"
            required
            {...register('name')}
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40 text-white"
            placeholder="Email"
            type="email"
            required
            {...register('email')}
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40 text-white"
            placeholder="Phone"
            {...register('phone')}
          />
          <input type="hidden" {...register('role')} value="candidate" />

          <input
            type="password"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#CCA43B] focus:ring-1 focus:ring-[#CCA43B]/40 text-white"
            placeholder="Password"
            required
            {...register('password')}
          />

          <button
            className="w-full rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)] transition hover:brightness-105 active:scale-[0.99]"
            style={{ minHeight: '44px' }}
          >
            Create account
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-white/60">
          Already have an account?{' '}
          <Link className="font-semibold text-[#CCA43B] hover:text-[#E5C56E] transition" to="/login">
            Sign in
          </Link>
        </div>
      </motion.div>
    )
  }, [accountType, handleSubmit, register, navigate])

  return (
    <div className="min-h-[80vh] w-full bg-[#070B1A] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[1100px]">
        {accountType ? (
          <div className="max-w-[720px] mx-auto">{candidateForm}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] bg-clip-text text-transparent">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Choose what you want to do—your next workflow starts here.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Candidate card */}
              <button
                type="button"
                onClick={() => setAccountType('candidate')}
                className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B4C8C]/30 to-[#CCA43B]/30 shadow-[0_0_25px_rgba(11,76,140,0.25)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 21V9"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 21V3"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 21V11"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 21V7"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 21V5"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#CCA43B] uppercase tracking-widest">Candidate</div>
                    <div className="mt-1 text-xl font-extrabold">Create Candidate Account</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#CCA43B]/20 text-[#E5C56E]">✓</span>
                    Apply for Jobs
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#CCA43B]/20 text-[#E5C56E]">✓</span>
                    AI Resume Matching
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#CCA43B]/20 text-[#E5C56E]">✓</span>
                    Track Applications
                  </li>
                </ul>

                <div className="mt-6">
                  <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)]">
                    Continue as Candidate
                  </span>
                </div>
              </button>

              {/* Employer card */}
              <button
                type="button"
                onClick={() => navigate('/register/company')}
                className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B4C8C]/30 to-[#CCA43B]/30 shadow-[0_0_25px_rgba(11,76,140,0.25)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 7h16"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 7v14"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M17 7v14"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 21h16"
                        stroke="#CCA43B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#CCA43B] uppercase tracking-widest">Employer</div>
                    <div className="mt-1 text-xl font-extrabold">Register Company</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#CCA43B]/20 text-[#E5C56E]">✓</span>
                    Post Jobs
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#CCA43B]/20 text-[#E5C56E]">✓</span>
                    Hire Candidates
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#CCA43B]/20 text-[#E5C56E]">✓</span>
                    Schedule Interviews
                  </li>
                </ul>

                <div className="mt-6">
                  <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(11,76,140,0.25)]">
                    Continue as Employer
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
