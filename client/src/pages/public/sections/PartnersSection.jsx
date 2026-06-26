import { useEffect, useState } from 'react'
import { publicApi } from '../../../api/publicApi'
import { motion } from 'framer-motion'
import GlassCard from '../../../components/ui/GlassCard'

export default function PartnersSection() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const list = await publicApi.getPartners()
        setPartners(list)

      } catch (err) {
        console.error('Error fetching partners:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPartners()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-[#030611]/60">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <div className="h-6 w-48 bg-white/5 animate-pulse mx-auto mb-10 rounded" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Double partners array for infinite marquee effect
  const marqueeItems = [...partners, ...partners, ...partners]

  return (
    <section className="py-24 bg-[#030611]/80 border-t border-white/5 relative overflow-hidden">
      {/* Background glare */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10 text-center space-y-16">
        
        {/* SECTION 3 - Trusted By Marquee */}
        {partners.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-white/40">
              Trusted by leading global tech teams
            </h3>
            
            {/* Infinite Marquee Container */}
            <div className="relative flex w-full overflow-x-hidden border-y border-white/5 py-6 mask-gradient">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                  ease: 'linear',
                  duration: 25,
                  repeat: Infinity
                }}
                className="flex shrink-0 items-center gap-16 pr-16"
              >
                {marqueeItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 shrink-0 opacity-45 hover:opacity-80 transition duration-200 cursor-default">
                    {item.logo ? (
                      <img src={item.logo} alt="" className="h-6 w-6 rounded-md object-cover border border-white/10" />
                    ) : (
                      <div className="h-6 w-6 rounded-md bg-indigo-500 flex items-center justify-center font-bold text-[10px]">
                        {item.companyName[0]}
                      </div>
                    )}
                    <span className="font-extrabold tracking-tight text-white text-base">
                      {item.companyName}
                    </span>
                    {item.verified && (
                      <span className="text-indigo-400 text-[10px]" title="Verified Partner">✓</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 9 - Partner Companies Grid */}
        <div className="space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/15">
              Hiring Networks
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Our Partner Companies</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Explore companies actively interviewing candidates through EPS Job Consultancy.
            </p>
          </div>

          {partners.length === 0 ? (
            /* Empty state */
            <GlassCard className="p-10 bg-slate-950/40 border-white/5 text-center max-w-md mx-auto rounded-2xl">
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="text-sm font-bold text-white mb-2">Hiring Network Under Assembly</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                We are currently onboarding verified tech companies into our partner program. Check back shortly to explore open positions.
              </p>
            </GlassCard>
          ) : (
            /* Partner Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
              {partners.map((company, idx) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <GlassCard className="p-6 bg-slate-950/40 border-white/5 hover:border-blue-500/20 hover:bg-white/[0.01] transition-all duration-300 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      
                      {/* Logo and Head */}
                      <div className="flex items-center gap-3">
                        {company.logo ? (
                          <img src={company.logo} alt="" className="h-12 w-12 rounded-xl object-cover border border-white/10" />
                        ) : (
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm">
                            {company.companyName[0]}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-sm">{company.companyName}</h4>
                            {company.verified && (
                              <span className="bg-blue-500/10 text-blue-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-blue-500/10" title="Verified Employer">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/50">{company.industry}</p>
                        </div>
                      </div>

                      {/* Details specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-white/5 py-3 text-white/60">
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-bold">Location</span>
                          <span className="font-semibold text-white/80">{company.location}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-bold">Company Size</span>
                          <span className="font-semibold text-white/80">{company.companySize || 'N/A'}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom stats & website */}
                    <div className="mt-6 flex items-center justify-between text-xs pt-2">
                      <span className="font-bold text-emerald-400">
                        {company.openPositions > 0 
                          ? `${company.openPositions} Active Openings` 
                          : 'No Active Openings'
                        }
                      </span>
                      {company.website && (
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#60A5FA] hover:underline hover:text-blue-300 font-bold transition"
                        >
                          Visit Website ↗
                        </a>
                      )}
                    </div>

                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
