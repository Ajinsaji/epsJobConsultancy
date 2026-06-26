import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassButton } from '../../../components/ui/GlassButton'
import GlassCard from '../../../components/ui/GlassCard'

export default function EmployerSection() {
  const navigate = useNavigate()

  const benefits = [
    { title: 'Post Job Ads', desc: 'Publish vacancies with targeted skill requirements to reach MERN/tech professionals.', icon: '📝' },
    { title: 'Screened Candidate shortlists', desc: 'Save time with pre-screened shortlists compiled by our consultancy teams.', icon: '🛡️' },
    { title: 'Sourcing & Filter Console', desc: 'Query our talent database by skills, years, location, and availability.', icon: '🔍' },
    { title: 'Interview Scheduling Workflows', desc: 'Sync candidate slots, assign reviewers, and track interview progress in one portal.', icon: '📅' }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-[#080E24] to-[#050816] text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* LEFT SIDE: Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left z-10"
          >
            <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-blue-500/10 text-[#60A5FA] border border-blue-500/15">
              For Employers
            </div>
            
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Build Quality Engineering Teams Faster.
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Cut through unqualified resumes. EPS combines advanced database sourcing with dedicated HR pre-screening and assessment protocols to deliver high-signal candidates ready for technical evaluation.
            </p>

            {/* Benefits grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="mt-1 text-xs text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <GlassButton
                as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="px-6 py-3 font-extrabold text-sm border border-blue-500/30 bg-blue-950/20 text-[#60A5FA] hover:bg-blue-900/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] transition"
              >
                Register Company Account
              </GlassButton>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
            
            {/* Talent Pipeline columns mockup */}
            <GlassCard className="p-6 bg-slate-950/60 border-white/10 w-full max-w-[420px] shadow-2xl relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-bold text-white/60">Candidate Pipeline: Vercel</span>
                <span className="text-[10px] bg-blue-500/10 px-2 py-0.5 rounded text-blue-300 font-bold">Manager View</span>
              </div>

              {/* Column stages */}
              <div className="grid grid-cols-3 gap-2">
                
                {/* Column 1 - Shortlist */}
                <div className="space-y-2">
                  <div className="text-[8px] uppercase tracking-wider font-bold text-white/40">Shortlisted (3)</div>
                  <div className="rounded-lg bg-white/5 p-1.5 border border-white/5 text-[9px] space-y-1">
                    <div className="font-bold truncate">Meera Nair</div>
                    <div className="text-[7px] text-[#A78BFA] font-bold">96% Match</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-1.5 border border-white/5 text-[9px] space-y-1">
                    <div className="font-bold truncate">Priya S.</div>
                    <div className="text-[7px] text-[#A78BFA] font-bold">91% Match</div>
                  </div>
                </div>

                {/* Column 2 - Technical interview */}
                <div className="space-y-2">
                  <div className="text-[8px] uppercase tracking-wider font-bold text-white/40 font-semibold">Technical (2)</div>
                  <div className="rounded-lg bg-indigo-500/10 p-1.5 border border-[#7C3AED]/20 text-[9px] space-y-1 shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                    <div className="font-bold text-indigo-200 truncate">Rohan Das</div>
                    <div className="text-[7px] text-[#A78BFA] font-bold">94% Match</div>
                    <div className="text-[6px] text-indigo-400 font-bold">10:30 AM</div>
                  </div>
                </div>

                {/* Column 3 - Hired */}
                <div className="space-y-2">
                  <div className="text-[8px] uppercase tracking-wider font-bold text-white/40">Offered (1)</div>
                  <div className="rounded-lg bg-emerald-500/10 p-1.5 border border-emerald-500/20 text-[9px] space-y-1">
                    <div className="font-bold text-emerald-200 truncate">Aravind Nair</div>
                    <div className="text-[7px] text-emerald-400 font-bold">92% Match</div>
                    <div className="text-[6px] text-emerald-500 font-bold">Accepted</div>
                  </div>
                </div>

              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
