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
          (done ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-[#C4B5FD]' : 'border-white/10 bg-white/5 text-white/60')
        }
      >
        {done ? '✓' : '•'}
          <Link to="/register" className="inline-flex">
            <span className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/80 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]">
              Back to Account Types
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

