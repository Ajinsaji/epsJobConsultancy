import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassButton } from '../../../components/ui/GlassButton'
import GlassCard from '../../../components/ui/GlassCard'

function FeatureCard({ icon, title, value, footer }) {
  return (
    <GlassCard className="p-6 bg-slate-950/50 border-white/10 hover:border-violet-500/20 hover:bg-white/[0.02] transition duration-300 h-full relative overflow-hidden">
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-[#7C3AED]/25 via-[#8B5CF6]/20 to-[#3B82F6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="text-2xl leading-none">{icon}</div>
        <div>
          <div className="text-[11px] uppercase tracking-wider font-extrabold text-white/50">{title}</div>
          <div className="mt-2 text-xl font-extrabold">
            {typeof value === 'string' ? (
              value.includes('\n') ? (
                <span className="whitespace-pre-line block leading-snug">{value}</span>
              ) : (
                value
              )
            ) : (
              value
            )}
          </div>
          {footer ? <div className="mt-2 text-[10px] text-white/60 leading-relaxed">{footer}</div> : null}
        </div>
      </div>
    </GlassCard>
  )
}

function TrustComparisonCard({ variant, title, items }) {
  const isLeft = variant === 'left'

  return (
    <GlassCard
      className={
        'p-6 border-white/10 relative overflow-hidden transition-all duration-300 h-full ' +
        (isLeft
          ? 'bg-slate-950/40 hover:border-red-500/20'
          : 'bg-gradient-to-br from-[#7C3AED]/15 via-[#8B5CF6]/10 to-[#3B82F6]/10 border-white/10 hover:border-[#7C3AED]/30')
      }
    >
      <div
        className={
          'absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl pointer-events-none opacity-70 ' +
          (isLeft ? 'bg-red-500/10' : 'bg-[#7C3AED]/20')
        }
      />

      <div className="relative z-10 space-y-4">
        <div className="text-xl font-extrabold">{title}</div>

        <ul className="space-y-2">
          {items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
              <span className={isLeft ? 'text-red-300 mt-0.5' : 'text-emerald-300 mt-0.5'}>{it.icon}</span>
              <span className="leading-relaxed">{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  )
}

export default function PlacementAssuranceSection() {
  const navigate = useNavigate()

  const trustComparisonLeft = {
    variant: 'left',
    title: 'Without EPS',
    items: [
      { icon: '❌', text: 'Applying manually to hundreds of jobs' },
      { icon: '❌', text: 'No resume optimization' },
      { icon: '❌', text: 'Low interview response rate' },
      { icon: '❌', text: 'No placement guidance' },
      { icon: '❌', text: 'No interview scheduling support' }
    ]
  }

  const trustComparisonRight = {
    variant: 'right',
    title: 'With EPS',
    items: [
      { icon: '✅', text: 'AI Skill Matching' },
      { icon: '✅', text: 'Resume Review & Optimization' },
      { icon: '✅', text: 'Direct Company Connections' },
      { icon: '✅', text: 'Interview Coordination' },
      { icon: '✅', text: 'Dedicated Placement Assistance' }
    ]
  }

  const features = [
    {
      icon: '💰',
      title: 'Registration Fee',
      value: '₹250',
      footer: 'One-Time Payment'
    },
    {
      icon: '🚀',
      title: 'Placement Timeline',
      value: 'Within\n45 Days',
      footer: 'Eligibility + scheduled interviews'
    },
    {
      icon: '🛡️',
      title: 'Refund Protection',
      value: '100%',
      footer: 'Registration Fee Refund*'
    },
    {
      icon: '🤝',
      title: 'Career Support',
      value: 'Resume Review',
      footer: 'Interview Preparation • Placement Assistance'
    }
  ]

  const trustBar = [
    { icon: '✔', label: 'AI Resume Analysis' },
    { icon: '✔', label: 'Verified Hiring Companies' },
    { icon: '✔', label: 'Interview Coordination' },
    { icon: '✔', label: 'Career Mentorship' },
    { icon: '✔', label: 'Placement Support' }
  ]

  return (
    <section className="py-16 bg-[#050816] text-white relative overflow-hidden">
      {/* Animated glowing background */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#7C3AED]/25 to-[#3B82F6]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 to-[#3B82F6]/10 blur-[120px]" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-10 h-[380px] w-[380px] rounded-full bg-gradient-to-r from-[#7C3AED]/10 via-[#8B5CF6]/10 to-[#3B82F6]/10 blur-[130px]"
        animate={{ y: [0, 18, 0], opacity: [0.65, 0.9, 0.65], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Top badge + heading */}
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-5 py-2 text-xs font-extrabold tracking-wider text-[#A78BFA] backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              🚀 45-Day Placement Assurance
            </motion.div>

            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Get Placed Faster — Or Get Your Registration Fee Back.
            </h2>

            <p className="mx-auto max-w-[900px] text-white/70 text-sm sm:text-base leading-relaxed">
              Register with EPS Job Consultancy for just ₹250 and gain access to our Placement Assurance Program.
              <br />
              Our recruitment specialists, AI-powered matching engine, and interview support team work together to help you secure the right opportunity.
              <br />
              If you are not successfully placed within 45 days after completing the required eligibility process and participating in scheduled interviews, we will refund your ₹250 registration fee in full.
            </p>
          </div>

          {/* Trust comparison */}
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
            >
              <TrustComparisonCard {...trustComparisonLeft} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <TrustComparisonCard {...trustComparisonRight} />
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <FeatureCard icon={f.icon} title={f.title} value={f.value} footer={f.footer} />
              </motion.div>
            ))}
          </div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {trustBar.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                  <span className="h-7 w-7 rounded-xl bg-gradient-to-r from-[#7C3AED]/20 to-[#3B82F6]/20 border border-white/10 flex items-center justify-center text-[#A78BFA] font-extrabold">
                    {t.icon}
                  </span>
                  <span className="font-semibold">{t.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA + Social proof */}
          <div className="space-y-4 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <GlassButton
                as={motion.button}
                variant="primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="px-8 py-3 font-extrabold text-sm bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_28px_rgba(139,92,246,0.28)] rounded-xl"
              >
                Start Your Career Journey
              </GlassButton>

              <GlassButton
                as={motion.button}
                variant="ghost"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="px-8 py-3 font-extrabold text-sm border border-white/10 bg-white/[0.04] rounded-xl hover:bg-white/[0.06]"
              >
                View Success Stories
              </GlassButton>
            </div>

            <div className="pt-1">
              <div className="text-amber-300 text-lg">★★★★★</div>
              <p className="text-xs text-white/70 leading-relaxed max-w-2xl mx-auto">
                Trusted by aspiring professionals across Kerala and South India.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mx-auto max-w-[980px] rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#A78BFA]">Disclaimer</div>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Placement Assurance applies only to eligible candidates who complete profile verification, resume review, skill assessment, and attend scheduled interviews. Terms & Conditions apply.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

