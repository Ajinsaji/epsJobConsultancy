import { useEffect, useState } from 'react'
import { publicApi } from '../../../api/publicApi'

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../../../components/ui/GlassCard'
import { GlassButton } from '../../../components/ui/GlassButton'

export default function FeaturedJobsSection() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const list = await publicApi.getJobs()
        setJobs(list)

      } catch (err) {
        console.error('Error fetching jobs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <section className="py-24 bg-[#050816] text-white relative">
      <div className="mx-auto max-w-[1400px] px-6 relative z-10 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/15">
            Latest Opportunities
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Featured Tech Openings</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Apply directly to verified listings matching your tech stack. Interviews are coordinated directly by our consultants.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          /* Empty state */
          <GlassCard className="p-12 bg-slate-950/40 border-white/5 text-center max-w-lg mx-auto rounded-2xl space-y-4">
            <div className="text-3xl">💼</div>
            <h4 className="text-base font-bold text-white">No Vacancies Listed Currently</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              We are currently pre-screening candidates for upcoming roles. Register an account and upload your resume to be matched as soon as positions open.
            </p>
            <GlassButton variant="primary" onClick={() => navigate('/register')} className="px-5 py-2 text-xs">
              Upload Resume
            </GlassButton>
          </GlassCard>
        ) : (
          /* Jobs grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {jobs.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <GlassCard className="p-6 bg-slate-950/40 border-white/5 hover:border-violet-500/20 hover:bg-white/[0.01] transition-all duration-300 h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Top row */}
                    <div className="flex items-center gap-3">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt="" className="h-10 w-10 rounded-xl object-cover border border-white/10" />
                      ) : (
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold text-sm">
                          {job.companyName[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-extrabold text-sm group-hover:text-violet-300 transition duration-200">{job.title}</h4>
                        <p className="text-xs text-white/50">{job.companyName}</p>
                      </div>
                    </div>

                    {/* Meta information grid */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs border-t border-b border-white/5 py-3 text-white/70">
                      <div className="flex items-center gap-1.5 truncate">
                        <span>📍</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span>💰</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span>💼</span>
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span>🎓</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply action */}
                  <div className="mt-6 flex justify-end">
                    <GlassButton
                      onClick={() => navigate('/register')}
                      className="px-4 py-2 text-xs font-bold border border-white/10 bg-white/5 hover:bg-violet-600 hover:text-white transition duration-300 w-full"
                    >
                      Apply Now <span className="text-white/40 group-hover:text-white transition ml-1">→</span>
                    </GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
