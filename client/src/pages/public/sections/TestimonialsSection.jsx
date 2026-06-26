import { useEffect, useState } from 'react'
import { publicApi } from '../../../api/publicApi'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../../../components/ui/GlassCard'


export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState('candidate')
  const [candidatesList, setCandidatesList] = useState([])
  const [employersList, setEmployersList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const [candList, empList] = await Promise.all([
          publicApi.getCandidateTestimonials(),
          publicApi.getEmployerTestimonials()
        ])

        setCandidatesList(candList)
        setEmployersList(empList)


      } catch (err) {
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const currentList = activeTab === 'candidate' ? candidatesList : employersList

  if (loading) {
    return (
      <section className="py-24 bg-[#030611]/80">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <div className="h-6 w-48 bg-white/5 animate-pulse mx-auto mb-10 rounded" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#030611]/85 border-y border-white/5 relative">
      {/* Background glare */}
      <div className="absolute top-1/2 right-1/4 w-[380px] h-[380px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/15">
            Success Stories
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">What Our Users Say</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Read reviews from candidates who secured job offers and employers who recruited technical talent using EPS Job Consultancy.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/5 mt-4">
            <button
              onClick={() => setActiveTab('candidate')}
              className={
                'px-5 py-2 text-xs font-extrabold rounded-lg transition ' +
                (activeTab === 'candidate'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-md'
                  : 'text-white/60 hover:text-white')
              }
            >
              Candidate Reviews
            </button>
            <button
              onClick={() => setActiveTab('employer')}
              className={
                'px-5 py-2 text-xs font-extrabold rounded-lg transition ' +
                (activeTab === 'employer'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-md'
                  : 'text-white/60 hover:text-white')
              }
            >
              Employer Reviews
            </button>
          </div>
        </div>

        {/* Review list */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {currentList.length === 0 ? (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard className="p-10 bg-slate-950/40 border-white/5 text-center max-w-md mx-auto rounded-2xl">
                  <div className="text-2xl mb-2">💬</div>
                  <h4 className="text-sm font-bold text-white mb-2">No Reviews Posted Yet</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Testimonials are gathered during our quarterly placements reviews. Check back soon to read new user stories.
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              /* Grid reviews */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 text-left"
              >
                {currentList.map((item, idx) => (
                  <GlassCard 
                    key={item._id}
                    className="p-6 bg-slate-950/40 border-white/5 hover:border-violet-500/20 hover:bg-white/[0.01] transition-all duration-300 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Rating stars */}
                      <div className="flex gap-1 text-xs text-amber-400">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      
                      {/* Review message */}
                      <p className="text-white/70 text-xs leading-relaxed italic">
                        "{item.message}"
                      </p>
                    </div>

                    {/* Author block */}
                    <div className="flex items-center gap-3 mt-6 border-t border-white/5 pt-4">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold text-xs uppercase">
                        {item.name[0]}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        <p className="text-[10px] text-white/50">{item.role} {item.company ? `@ ${item.company}` : ''}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
