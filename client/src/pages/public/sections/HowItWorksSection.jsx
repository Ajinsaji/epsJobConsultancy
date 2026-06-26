import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../../../components/ui/GlassCard'

export default function HowItWorksSection() {
  const [activeRole, setActiveRole] = useState('candidate')

  const candidateSteps = [
    { num: '01', title: 'Free Registration', desc: 'Create your account as a job seeker and verify your profile details.', icon: '🔑' },
    { num: '02', title: 'Complete Tech Profile', desc: 'Fill in your education, experience, languages, and upload your resume.', icon: '📄' },
    { num: '03', title: 'Smart Search & Apply', desc: 'Query active jobs and apply. Our AI calculates your match suitability.', icon: '🎯' },
    { num: '04', title: 'Structured Interviews', desc: 'Receive interview slots coordinated directly by our EPS consultancy team.', icon: '🗓️' },
    { num: '05', title: 'Get Placed & Hired', desc: 'Receive verified job offers and join high-growth engineering teams.', icon: '🎉' }
  ]

  const employerSteps = [
    { num: '01', title: 'Register Company', desc: 'Register company profile, provide website URL, size, and address details.', icon: '🏢' },
    { num: '02', title: 'Post Vacancies', desc: 'Publish active job descriptions specifying required MERN/tech skillsets.', icon: '📝' },
    { num: '03', title: 'Receive Matched Profiles', desc: 'Get applicants sorted by AI match scores or request EPS pre-screened shortlists.', icon: '⚡' },
    { num: '04', title: 'Technical Interviews', desc: 'Schedule and coordinate calendars directly with candidates via the portal.', icon: '📅' },
    { num: '05', title: 'Hire Top Talent', desc: 'Shortlist top candidates, release official offers, and close vacancies.', icon: '🤝' }
  ]

  const steps = activeRole === 'candidate' ? candidateSteps : employerSteps

  return (
    <section className="py-24 bg-[#050816] text-white relative">
      {/* Background glare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10 text-center space-y-12">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            How EPS Works
          </h2>
          <p className="text-white/60 text-sm">
            Discover the streamlined recruitment process designed to save time and increase placement success.
          </p>

          {/* Toggle Button */}
          <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/5 mt-4">
            <button
              onClick={() => setActiveRole('candidate')}
              className={
                'px-5 py-2 text-xs font-extrabold rounded-lg transition ' +
                (activeRole === 'candidate'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-md'
                  : 'text-white/60 hover:text-white')
              }
            >
              Candidate Journey
            </button>
            <button
              onClick={() => setActiveRole('employer')}
              className={
                'px-5 py-2 text-xs font-extrabold rounded-lg transition ' +
                (activeRole === 'employer'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-md'
                  : 'text-white/60 hover:text-white')
              }
            >
              Employer Journey
            </button>
          </div>
        </div>

        {/* Timeline representation */}
        <div className="relative max-w-4xl mx-auto pt-6">
          
          {/* Vertical Connecting Line (desktop only) */}
          <div className="absolute left-[33px] md:left-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#7C3AED] via-[#3B82F6] to-transparent hidden md:block -translate-x-1/2" />

          {/* Timeline steps */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <motion.div
                    key={`${activeRole}-${step.num}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between relative gap-6 w-full ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    
                    {/* Step Card container */}
                    <div className="w-full md:w-[42%] text-left">
                      <GlassCard className="p-5 bg-slate-950/40 border-white/5 hover:border-violet-500/20 hover:scale-101 transition duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl">{step.icon}</span>
                          <h4 className="text-sm font-extrabold text-white">{step.title}</h4>
                        </div>
                        <p className="text-xs leading-relaxed text-white/60">{step.desc}</p>
                      </GlassCard>
                    </div>

                    {/* Step Center Circle Number */}
                    <div className="absolute left-0 md:left-1/2 top-4 md:top-auto md:-translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#080E24] border-2 border-indigo-500 flex items-center justify-center text-xs font-black text-indigo-300 z-10 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                      {step.num}
                    </div>

                    {/* Empty placeholder spacer for alignment */}
                    <div className="w-full md:w-[42%] hidden md:block" />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
