import { useEffect, useState } from 'react'
import { publicApi } from '../../../api/publicApi'
import { motion } from 'framer-motion'
import GlassCard from '../../../components/ui/GlassCard'

export default function PlacementsSection() {
  const [placements, setPlacements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const list = await publicApi.getPlacements()
        setPlacements(list)

      } catch (err) {
        console.error('Error fetching placements:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlacements()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-[#050816]">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <div className="h-6 w-48 bg-white/5 animate-pulse mx-auto mb-10 rounded" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#050816] text-white relative">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/15">
            Success Placements
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Recently Placed Candidates</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Real software engineers and tech specialists who successfully landed job offers through EPS recruitment pipelines.
          </p>
        </div>

        {placements.length === 0 ? (
          /* Empty state */
          <GlassCard className="p-10 bg-slate-950/40 border-white/5 text-center max-w-md mx-auto rounded-2xl">
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="text-sm font-bold text-white mb-2">Placement Success Stories Brewing</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              We are currently coordinating final offers for this month\'s candidates. Placement cards will be published as candidate consents are completed.
            </p>
          </GlassCard>
        ) : (
          /* Cards Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {placements.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <GlassCard className="p-5 bg-slate-950/40 border-white/5 hover:border-violet-500/20 hover:bg-white/[0.01] hover:scale-102 transition duration-300 h-full flex flex-col justify-between relative group">
                  
                  {/* Glowing border detail on hover */}
                  <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-[#7C3AED]/20 to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    {/* Portrait & Candidate Name */}
                    <div className="flex items-center gap-3">
                      {p.candidatePhoto ? (
                        <img 
                          src={p.candidatePhoto} 
                          alt={p.candidateName} 
                          className="h-12 w-12 rounded-full object-cover border border-white/10 shadow-md"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-base">
                          {p.candidateName[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-extrabold text-sm text-white">{p.candidateName}</h4>
                        <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wide">{p.position}</p>
                      </div>
                    </div>

                    {/* Placement Meta details */}
                    <div className="space-y-2 border-t border-white/5 pt-3 text-xs text-white/70">
                      <div className="flex justify-between">
                        <span className="text-white/40">Placed Company</span>
                        <span className="font-bold text-white/80">{p.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">CTC Package</span>
                        <span className="font-extrabold text-emerald-400">{p.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Joining Date</span>
                        <span className="font-semibold text-white/85">
                          {p.joiningDate ? new Date(p.joiningDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </span>
                      </div>
                    </div>
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
