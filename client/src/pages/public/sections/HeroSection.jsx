import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassButton } from '../../../components/ui/GlassButton'

export default function HeroSection({ config }) {
  const navigate = useNavigate()
  const [activeDashboard, setActiveDashboard] = useState(0)

  // Rotate dashboard mockups every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDashboard((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const dashboards = [
    {
      id: 'candidate',
      title: 'Candidate Portal',
      subtitle: 'Career Tracking & AI Scoring',
      color: 'from-[#7C3AED] to-[#8B5CF6]',
      render: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-white/50">
            <span>Welcome back, Priya</span>
            <span className="text-[#A78BFA] font-bold">MERN Specialist</span>
          </div>
          {/* Resume score */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-2 border border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-[#A78BFA] text-xs font-extrabold">AI</div>
              <div>
                <div className="text-[10px] font-bold">Resume Suitability</div>
                <div className="text-[8px] text-white/40">Matched against 14 Jobs</div>
              </div>
            </div>
            <div className="text-xs font-extrabold text-emerald-400">92% Match</div>
          </div>
          {/* Applications list */}
          <div className="space-y-1.5">
            <div className="text-[9px] font-bold text-white/60">Active Job Applications</div>
            {[
              { company: 'Vercel', role: 'React Engineer', status: 'Interview Scheduled', date: 'June 28', statusColor: 'text-indigo-400' },
              { company: 'Supabase', role: 'Node Developer', status: 'Under Review', date: 'June 25', statusColor: 'text-yellow-400' }
            ].map((app, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-[#0F172A] p-2 text-[9px] border border-white/5">
                <div>
                  <div className="font-bold">{app.role}</div>
                  <div className="text-[8px] text-white/55">{app.company}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${app.statusColor}`}>{app.status}</div>
                  <div className="text-[7px] text-white/40">{app.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'employer',
      title: 'Employer Dashboard',
      subtitle: 'Talent Pipelines & Sourcing',
      color: 'from-[#3B82F6] to-[#60A5FA]',
      render: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-white/50">
            <span>Stripe Hiring Portal</span>
            <span className="text-[#60A5FA] font-bold">6 Active Jobs</span>
          </div>
          {/* Search bar */}
          <div className="rounded-lg bg-white/5 p-1.5 flex items-center justify-between text-[9px] text-white/50 border border-white/5">
            <span>Search: "Node.js Developer, Bangalore"...</span>
            <span className="bg-[#3B82F6] text-white text-[7px] px-1.5 py-0.5 rounded font-bold">48 Matches</span>
          </div>
          {/* Candidate Pipeline */}
          <div className="space-y-1.5">
            <div className="text-[9px] font-bold text-white/60">Shortlisted Candidates</div>
            {[
              { name: 'Rohan Das', exp: '4 Years', match: '96%', location: 'Bangalore' },
              { name: 'Sanjay Kumar', exp: '5 Years', match: '91%', location: 'Remote' }
            ].map((cand, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-[#0F172A] p-2 text-[9px] border border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
                  <div>
                    <div className="font-bold">{cand.name}</div>
                    <div className="text-[8px] text-white/40">{cand.exp} • {cand.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{cand.match}</div>
                  <div className="text-[7px] text-[#3B82F6] cursor-pointer">Invite to Interview</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'interviews',
      title: 'Interview Manager',
      subtitle: 'Automated Calendar Routing',
      color: 'from-[#EC4899] to-[#F472B6]',
      render: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-white/50">
            <span>Coordination Center</span>
            <span className="text-[#F472B6] font-bold">Today\'s Schedule</span>
          </div>
          {/* Current Meeting */}
          <div className="rounded-xl bg-pink-500/10 p-2.5 border border-pink-500/20 text-[9px] space-y-1">
            <div className="flex justify-between font-bold text-pink-300">
              <span>Technical Interview</span>
              <span>10:30 AM (In Progress)</span>
            </div>
            <div className="text-white/80">Candidate: Rohan Das</div>
            <div className="text-white/80">Interviewer: Elena Rostova (Linear)</div>
          </div>
          {/* Queue */}
          <div className="space-y-1.5">
            <div className="text-[9px] font-bold text-white/60">Upcoming Coordination Slots</div>
            {[
              { time: '02:00 PM', name: 'Meera Nair', company: 'Linear', type: 'System Design' },
              { time: '04:30 PM', name: 'Aravind Nair', company: 'Vercel', type: 'HR Fit' }
            ].map((slot, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-[#0F172A] p-2 text-[9px] border border-white/5">
                <div>
                  <span className="font-bold text-white/80">{slot.time}</span>
                  <span className="text-white/40 mx-2">|</span>
                  <span className="font-semibold">{slot.name} ({slot.company})</span>
                </div>
                <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded text-white/60">{slot.type}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Analytics Console',
      subtitle: 'HR Metrics & Performance Logs',
      color: 'from-[#06B6D4] to-[#22D3EE]',
      render: () => (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px] text-white/50">
            <span>System Performance</span>
            <span className="text-[#22D3EE] font-bold">Global Insights</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Time-to-Hire', value: '12 Days' },
              { label: 'Shortlist Rate', value: '42.6%' },
              { label: 'Hiring Cost', value: '-35%' }
            ].map((stat, i) => (
              <div key={i} className="rounded-lg bg-white/5 p-1 text-center border border-white/5">
                <div className="text-[7px] text-white/40">{stat.label}</div>
                <div className="text-[9px] font-extrabold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
          {/* Mini chart */}
          <div className="rounded-lg bg-[#0F172A] p-2 border border-white/5">
            <div className="text-[8px] font-bold text-white/50 mb-1">Monthly Placement Funnel</div>
            <div className="h-[40px] flex items-end gap-2 px-1">
              {[60, 85, 45, 95, 75, 110, 80].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-cyan-600 to-cyan-400" style={{ height: `${(h / 120) * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
      )
    }
  ]

  const badge = config?.heroBadge || 'Trusted Recruitment Partner'
  const headline = config?.heroHeadline || 'Find Jobs. Hire Talent. Grow Faster.'
  const subheading = config?.heroSubheading || 'EPS connects job seekers, employers, and hiring consultants on a unified MERN recruitment framework.'

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-[#050816] text-white">
      {/* Floating Animated Glares */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-20 h-[350px] w-[350px] rounded-full bg-[#7C3AED]/20 blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-[#3B82F6]/15 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* LEFT SIDE INFO */}
          <div className="space-y-8 text-left z-10">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-950/20 px-4 py-1.5 text-xs font-semibold text-[#A78BFA] backdrop-blur"
            >
              <span className="mr-1.5 flex h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              {badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-[#A78BFA] via-[#C084FC] to-[#60A5FA] bg-clip-text text-transparent">
                {headline}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[560px] text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {subheading}
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <GlassButton
                as={motion.button}
                variant="primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="px-6 py-3 font-extrabold min-h-[48px] bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_20px_rgba(139,92,246,0.25)]"
              >
                Find Jobs (Register)
              </GlassButton>
              <GlassButton
                as={motion.button}
                variant="ghost"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="px-6 py-3 font-extrabold min-h-[48px] border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                Hire Talent
              </GlassButton>
            </motion.div>
          </div>

          {/* RIGHT SIDE ROTATING LAPTOP MOCKUP */}
          <div className="relative flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[520px]"
            >
              {/* Soft purple glow behind laptop */}
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#3B82F6]/10 blur-3xl opacity-80" />

              {/* Laptop Screen Body */}
              <div className="relative rounded-[20px] border border-white/15 bg-[#080E24]/80 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                
                {/* Simulated Screen Inner */}
                <div className="relative h-[280px] overflow-hidden rounded-xl bg-[#030612] border border-white/5 flex flex-col">
                  
                  {/* Top bar */}
                  <div className="h-6 bg-slate-950/60 border-b border-white/5 flex items-center justify-between px-3 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500/70" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/70" />
                      <div className="h-2 w-2 rounded-full bg-green-500/70" />
                    </div>
                    <div className="text-[8px] text-white/35 font-mono select-none">platform.eps.jobs</div>
                    <div className="h-2 w-4 rounded bg-white/10" />
                  </div>

                  {/* Inside Content Frame */}
                  <div className="flex-grow p-4 relative flex flex-col justify-between">
                    
                    {/* Simulated App Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#3B82F6]" />
                        <span className="text-[10px] font-extrabold tracking-tight">EPS platform</span>
                      </div>
                      
                      {/* Active dashboard indicator */}
                      <span className="text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 font-extrabold border border-white/5 text-white/70">
                        {dashboards[activeDashboard].title}
                      </span>
                    </div>

                    {/* App Viewport with Animation */}
                    <div className="flex-grow relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeDashboard}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-0"
                        >
                          {dashboards[activeDashboard].render()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* Simulated Screen Glow border */}
                <div className="absolute inset-0 rounded-[20px] pointer-events-none border border-[#7C3AED]/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]" />
              </div>

              {/* Laptop Keyboard Base */}
              <div className="relative mt-2.5 h-3.5 w-[92%] mx-auto rounded-b-[10px] border border-white/15 bg-gradient-to-b from-[#1E293B] to-[#0B132B] shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
                {/* Opening groove */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-14 rounded-b bg-[#050816]" />
              </div>
              
              {/* Laptop base rubber foot glow shadow */}
              <div className="w-[84%] mx-auto h-1.5 rounded-full bg-black/40 blur-sm mt-0.5" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
