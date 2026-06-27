import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function FeatureRow({ title, description, icon }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:bg-white/10 hover:border-white/15">
      <div className="mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B4DFF]/25 to-[#8B5CF6]/25 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
        <span aria-hidden className="text-white/90">{icon}</span>
      </div>
      <div>
        <div className="text-sm font-extrabold text-white/90">{title}</div>
        <div className="mt-1 text-xs text-white/65 leading-relaxed">{description}</div>
      </div>
    </div>
  )
}

function TimelineItem({ done, label, status }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={
          'mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border ' +
          (done
            ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-[#C4B5FD]'
            : 'border-white/10 bg-white/5 text-white/60')
        }
      >
        {done ? '✓' : '•'}
      </div>

      <div className="min-w-0">
        <div className="text-xs font-extrabold text-white/90">{label}</div>
        {status ? <div className="mt-1 text-[10px] text-white/60">{status}</div> : null}
      </div>

      <Link to="/register" className="inline-flex">
        <span className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/80 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]">
          Back to Account Types
        </span>
      </Link>
    </div>
  )
}

export default function RegisterCompanyPage() {
  return (
    <section className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-5 py-2 text-xs font-extrabold tracking-wider text-[#A78BFA] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Company Registration
          </div>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">Get Started with EPS</h1>
          <p className="mt-3 text-sm text-white/70">Create your company account to post jobs and coordinate interviews.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <FeatureRow
            icon="⚡"
            title="AI Match Ready"
            description="Connect with pre-screened candidates using our scoring engine."
          />
          <FeatureRow
            icon="🗓️"
            title="Interview Coordination"
            description="Schedule and coordinate interviews with minimal effort."
          />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm font-extrabold text-[#A78BFA]">Next Steps</div>
          <div className="mt-5 space-y-4">
            <TimelineItem done label="Register Company" status="Takes less than 2 minutes" />
            <TimelineItem done={false} label="Post Vacancies" status="Share required skillsets" />
          </div>
        </div>

        <div className="mt-10 text-xs text-white/60">
          By continuing, you agree to Terms & Conditions.
        </div>
      </div>
    </section>
  )
}

