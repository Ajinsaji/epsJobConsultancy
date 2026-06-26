import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()
  const [accountType, setAccountType] = useState(null) // 'candidate' | null

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/auth/register', data)
      toast.success('Account created. Please login.')
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
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#5B4DFF] to-[#8B5CF6] bg-clip-text text-transparent">
          Create Candidate Account
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Apply for jobs, get AI resume matching, and track your applications.
        </p>

        {/* Preserve existing registration UI logic / payload / validation */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/40"
            placeholder="Name"
            {...register('name')}
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/40"
            placeholder="Email"
            {...register('email')}
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/40"
            placeholder="Phone"
            {...register('phone')}
          />
          <input type="hidden" {...register('role')} value="candidate" />

          <input
            type="password"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/40"
            placeholder="Password"
            {...register('password')}
          />

          <button
            className="w-full rounded-xl bg-gradient-to-r from-[#5B4DFF] to-[#8B5CF6] px-4 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] transition hover:brightness-105 active:scale-[0.99]"
            style={{ minHeight: '44px' }}
          >
            Create account
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-white/60">
          Already have an account?{' '}
          <Link className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD] transition" to="/login">
            Sign in
          </Link>
        </div>
      </motion.div>
    )
  }, [accountType, handleSubmit, register])

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
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#5B4DFF] to-[#8B5CF6] bg-clip-text text-transparent">
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
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B4DFF]/30 to-[#8B5CF6]/30 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 21V9"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 21V3"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 21V11"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 21V7"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 21V5"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#A78BFA] uppercase tracking-widest">Candidate</div>
                    <div className="mt-1 text-xl font-extrabold">Create Candidate Account</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">✓</span>
                    Apply for Jobs
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">✓</span>
                    AI Resume Matching
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">✓</span>
                    Track Applications
                  </li>
                </ul>

                <div className="mt-6">
                  <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#5B4DFF] to-[#8B5CF6] px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]">
                    Continue as Candidate
                  </span>
                </div>
              </button>

              {/* Employer card */}
              <button
                type="button"
                onClick={() => (window.location.href = '/register/company')}
                className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B4DFF]/30 to-[#8B5CF6]/30 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 7h16"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 7v14"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M17 7v14"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 21h16"
                        stroke="#C4B5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#A78BFA] uppercase tracking-widest">Employer</div>
                    <div className="mt-1 text-xl font-extrabold">Register Company</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">✓</span>
                    Post Jobs
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">✓</span>
                    Hire Candidates
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-5 w-5 inline-flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD]">✓</span>
                    Schedule Interviews
                  </li>
                </ul>

                <div className="mt-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/70">
                    Employer onboarding will be available soon.
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}


