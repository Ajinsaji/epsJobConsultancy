import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassButton } from '../../../components/ui/GlassButton'
import GlassCard from '../../../components/ui/GlassCard'

export default function CandidateSection() {
  const navigate = useNavigate()

  const benefits = [
    { title: 'Smart Skill Matching', desc: 'Our algorithms scan your resume and match you with companies looking for your exact tech stack.', icon: '🎯' },
    { title: 'AI Resume Score', desc: 'Get direct feedback and compatibility score overlays compared to active industry requirements.', icon: '⚡' },
    { title: 'Interview Support', desc: 'Our consultants coordinate calendars, assign technical panels, and guide your preparation.', icon: '📞' },
    { title: 'Live Application Tracking', desc: 'Track every step of your application pipeline from review to final selection.', icon: '📈' }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-[#050816] to-[#080E24] text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* LEFT SIDE: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-violet-500/5 blur-3xl rounded-full" />
            
            {/* Candidate Card representation */}
            <GlassCard className="p-6 bg-slate-950/60 border-white/10 w-full max-w-[420px] shadow-2xl relative z-10 space-y-6">
              
              {/* Profile header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-lg font-bold">
                  SK
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Sanjay Kumar</h4>
                  <p className="text-xs text-white/50">MERN Stack Developer</p>
                </div>
                <div className="ml-auto bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Available
                </div>
              </div>

              {/* Match score bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white/60">React / Node.js match score</span>
                  <span className="text-indigo-400 font-extrabold">94% Fit</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '94%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" 
                  />
                </div>
              </div>

              {/* Skills list */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/50">Verified Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Redux'].map((skill, i) => (
                    <span key={i} className="text-[9px] font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-white/70">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match details mock */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-white/40">Open Positions Matched</span>
                  <span className="font-bold text-white/80">14 Jobs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Suggested Salary</span>
                  <span className="font-bold text-emerald-400">₹14 Lakhs - ₹18 Lakhs</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* RIGHT SIDE: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left order-1 lg:order-2 z-10"
          >
            <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-violet-500/10 text-[#A78BFA] border border-violet-500/15">
              For Job Seekers
            </div>
            
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Get Hired by Top-Fit Tech Companies.
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              We do not simply list jobs. We analyze your tech profile, score your resume suitability, pre-screen you, and coordinate interview calendars directly with verified hiring companies to guarantee high placement rates.
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
                variant="primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="px-6 py-3 font-extrabold text-sm bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              >
                Create Candidate Account
              </GlassButton>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
