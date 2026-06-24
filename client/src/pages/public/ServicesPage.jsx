import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'
import RevealOnScroll from '../../animations/RevealOnScroll'
import { motion } from 'framer-motion'

function List({ items }) {
  return (
    <ul className="mt-4 space-y-3 text-sm text-white/70">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <RevealOnScroll>
          <SectionTitle title="Services" subtitle="Structured hiring services for candidates and employers." />
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <RevealOnScroll>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
              <GlassCard className="h-full">
                <div className="text-sm font-semibold text-white/80">Candidate Services</div>
                <List
                  items={[
                    'Job Search',
                    'Resume Analysis',
                    'Interview Preparation',
                    'Career Guidance',
                  ]}
                />
              </GlassCard>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
              <GlassCard className="h-full">
                <div className="text-sm font-semibold text-white/80">Employer Services</div>
                <List
                  items={[
                    'Talent Acquisition',
                    'Candidate Search',
                    'Recruitment Management',
                    'Screening Support',
                  ]}
                />
              </GlassCard>
            </motion.div>
          </RevealOnScroll>
        </div>

        <section className="mt-10">
          <RevealOnScroll>
            <div className="text-sm font-semibold text-white/70">Custom Hiring Solutions</div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Built around your hiring goals</h2>
          </RevealOnScroll>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: 'Shortlist clarity',
                d: 'Reduce noise with high-signal matching and review-driven confidence.',
              },
              {
                t: 'Workflow support',
                d: 'From discovery to interview readiness—keep teams aligned.',
              },
              {
                t: 'Candidate experience',
                d: 'Give applicants clarity with resume analysis and structured feedback.',
              },
            ].map((c) => (
              <RevealOnScroll key={c.t}>
                <GlassCard>
                  <div className="text-base font-bold">{c.t}</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">{c.d}</div>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}



