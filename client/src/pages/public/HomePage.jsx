import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

function PlatformPreviewCard({
  active = false,
  title,
  description,
  duration = '12s',
  icon = null,
}) {
  return (
    <div
      className={
        'relative flex h-full w-[320px] shrink-0 flex-col rounded-[20px] border ' +
        (active
          ? 'border-[#8B5CF6] bg-white/90 shadow-[0_0_60px_rgba(124,58,237,0.35)]'
          : 'border-black/10 bg-white')
      }
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-black/55">
            {duration}
          </div>
          <div className={active ? 'text-[#7C3AED]' : 'text-black/40'}>{icon}</div>
        </div>

        <div
          className={
            'mt-3 h-[138px] overflow-hidden rounded-[16px] border ' +
            (active ? 'border-[#8B5CF6]/30 bg-[#0B1023]' : 'border-black/10 bg-[#0B1023]')
          }
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1023] via-[#111827] to-[#0B1023]" />
            <div className="absolute inset-0 opacity-70">
              <div className="absolute left-4 top-4 h-[10px] w-[72%] rounded bg-white/10" />
              <div className="absolute left-4 top-5 h-[28px] w-[18%] rounded bg-white/10" />
              <div className="absolute left-4 top-[44px] h-[10px] w-[65%] rounded bg-white/10" />
              <div className="absolute left-4 top-[64px] h-[10px] w-[45%] rounded bg-white/10" />
              <div className="absolute left-4 top-[84px] h-[10px] w-[35%] rounded bg-white/10" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className={
                'flex h-[44px] w-[44px] items-center justify-center rounded-full border ' +
                (active ? 'border-[#8B5CF6]/60 bg-[#8B5CF6]/20' : 'border-white/15 bg-white/5')
              }>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 7.5V16.5L17 12L9 7.5Z" fill={active ? '#7C3AED' : 'white'} />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[15px] font-extrabold text-black">{title}</div>
          <div className="mt-1 text-[12px] leading-relaxed text-black/60">{description}</div>
        </div>
      </div>
    </div>
  )
}

function FeatureStripCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/10">
        {icon}
      </div>
      <div>
        <div className="text-[14px] font-extrabold text-[#0B1023]">{title}</div>
        <div className="mt-1 text-[12px] leading-relaxed text-[#0B1023]/70">{desc}</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [carouselIndex, setCarouselIndex] = useState(2)

  const slides = useMemo(
    () => [
      {
        title: 'Talent Search',
        description: 'Discover top-fit candidates with smart filters and AI matching.',
        duration: '10s',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L21 3" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 3H21V8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 21L10 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        title: 'Candidate Profile',
        description: 'View structured candidate insights in one place.',
        duration: '12s',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.895 19.105 17 18 17H6C4.895 17 4 17.895 4 19V21" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#7C3AED" strokeWidth="2" />
          </svg>
        ),
      },
      {
        title: 'Communication Center',
        description: 'Track messages, feedback, and next steps with clarity.',
        duration: '14s',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20V14H4V4Z" stroke="#7C3AED" strokeWidth="2" />
            <path d="M4 14L8 18H20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: 'Interview Management',
        description: 'Schedule, assign reviewers, and move candidates forward.',
        duration: '12s',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7H16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 12H16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 17H16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z" stroke="#7C3AED" strokeWidth="2" />
          </svg>
        ),
      },
      {
        title: 'Analytics Dashboard',
        description: 'Measure hiring performance and improve outcomes over time.',
        duration: '15s',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19H20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 16V10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 16V6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 16V12" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
    []
  )

  const highlighted = 2

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#7C3AED]/25 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#3B82F6]/20 blur-3xl"
          animate={{ y: [0, -28, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4">
        {/* SECTION 1 — HERO */}
        <section className="pt-12 pb-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* LEFT */}
            <div className="space-y-7">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs text-white/70 backdrop-blur">
                Smart Hiring. Better Careers. Stronger Futures.
              </div>

              <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                  Find Jobs. <br /> Hire Talent. <br /> Grow Faster.
                </span>
              </h1>

              <p className="max-w-[560px] text-base leading-relaxed text-white/70 md:text-lg">
                EPS connects job seekers and employers on a single recruitment platform with smart hiring tools,
                candidate discovery, and career opportunities.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <GlassButton
                  as={motion.button}
                  variant="primary"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    document.getElementById('platform-preview')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="min-h-[48px] px-5"
                >
                  Find Jobs <span className="text-white/80">→</span>
                </GlassButton>
                <GlassButton
                  as={motion.button}
                  variant="ghost"
                  whileHover={{ scale: 1.02 }}
                  className="min-h-[48px] border border-white/10 bg-white/5 px-5"
                >
                  Hire Talent
                </GlassButton>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
                {[
                  { label: 'Registered Candidates', value: 0 },
                  { label: 'Hiring Companies', value: 0 },
                  { label: 'Active Jobs', value: 0 },
                  { label: 'Successful Placements', value: 0 },
                ].map((s) => (
                  <GlassCard key={s.label} className="p-4 bg-white/5 border-white/10">
                    <div className="text-[11px] text-white/60">{s.label}</div>
                    <div className="mt-1 text-xl font-extrabold">{s.value}+</div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* RIGHT — laptop mockup */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[520px]"
              >
                <motion.div
                  className="absolute -inset-2 rounded-[26px] bg-[#7C3AED]/20 blur-3xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative rounded-[26px] border border-white/10 bg-white/5 p-5 shadow-[0_0_80px_rgba(124,58,237,0.25)] backdrop-blur-xl">
                  {/* Sidebar */}
                  <div className="grid grid-cols-[96px_1fr] gap-4">
                    <div className="rounded-[18px] border border-white/10 bg-white/5 p-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#7C3AED]/30 to-[#3B82F6]/20 border border-white/10" />
                      <div className="mt-4 space-y-3">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={
                              'h-8 w-full rounded-xl border ' +
                              (i === 0
                                ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/15'
                                : 'border-white/10 bg-white/5')
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Dashboard UI */}
                    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-white/70">EPS Dashboard</div>
                          <div className="mt-1 text-sm font-extrabold">Smart Hiring Overview</div>
                        </div>
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#3B82F6]/25 to-[#8B5CF6]/25 border border-white/10" />
                      </div>

                      {/* Stats cards inside laptop */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {[{ t: 'Candidates', v: '1.2k' }, { t: 'Companies', v: '420' }, { t: 'Active Jobs', v: '88' }, { t: 'Placements', v: '26' }].map((c) => (
                          <div key={c.t} className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="text-[11px] text-white/60">{c.t}</div>
                            <div className="mt-1 text-sm font-extrabold">{c.v}</div>
                          </div>
                        ))}
                      </div>

                      {/* Candidate list */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] font-semibold text-white/70">Candidate list</div>
                          <div className="text-[11px] text-white/50">Today</div>
                        </div>
                        <div className="mt-2 space-y-2">
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#7C3AED]/25 to-[#3B82F6]/20 border border-white/10" />
                                <div>
                                  <div className="text-[11px] font-bold text-white/90">Candidate {i + 1}</div>
                                  <div className="text-[10px] text-white/60">UI/UX • MERN</div>
                                </div>
                              </div>
                              <div className="text-[11px] text-[#A78BFA]">Match {88 + i}%</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Analytics chart */}
                      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] font-semibold text-white/70">Analytics</div>
                          <div className="text-[11px] text-white/50">Last 7 days</div>
                        </div>
                        <div className="mt-2 h-[90px] rounded-lg bg-[#0B1023] border border-white/10 p-3 flex items-end gap-2">
                          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="w-[10%] rounded-md bg-gradient-to-t from-[#7C3AED] to-[#3B82F6]"
                              style={{ height: 18 + i * 10 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* glass bottom bar */}
                  <div className="mt-4 h-10 rounded-xl border border-white/10 bg-white/5" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — PLATFORM PREVIEW */}
        <section id="platform-preview" className="mt-6 pb-12">
          <div className="rounded-[28px] border border-white/10 bg-white">
            <div className="p-8">
              <div className="inline-flex items-center rounded-full bg-[#0B1023] px-4 py-2 text-[11px] font-extrabold tracking-wider text-white">
                PLATFORM PREVIEW
              </div>

              <div className="mt-4">
                <div className="text-3xl font-extrabold tracking-tight text-[#0B1023]">See EPS in Action</div>
                <div className="mt-2 text-sm text-[#0B1023]/60">A quick animated preview of the candidate and employer portals.</div>
              </div>

              {/* Carousel */}
              <div className="relative mt-8">
                <button
                  type="button"
                  aria-label="Previous"
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                  onClick={() => setCarouselIndex((i) => (i - 1 + slides.length) % slides.length)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                  onClick={() => setCarouselIndex((i) => (i + 1) % slides.length)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="overflow-hidden">
                  <div
                    className="flex items-stretch gap-5 transition-transform"
                    style={{ transform: `translateX(-${carouselIndex * 290}px)` }}
                  >
                    {slides.map((s, idx) => (
                      <div key={s.title} className="flex items-stretch">
                        <PlatformPreviewCard
                          active={idx === highlighted}
                          title={s.title}
                          description={s.description}
                          duration={s.duration}
                          icon={s.icon}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={
                        'h-2 w-2 rounded-full ' +
                        (idx === carouselIndex ? 'bg-[#7C3AED]' : 'bg-[#0B1023]/20')
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — FEATURE STRIP */}
        <section className="pb-16">
          <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-4">
            <div className="rounded-[22px] border border-black/5 bg-white px-6 py-8">
              <FeatureStripCard
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L20 6V14C20 18 16.5 21.5 12 22C7.5 21.5 4 18 4 14V6L12 2Z" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                title="Secure & Reliable"
                desc="Your data is protected with enterprise security."
              />
            </div>
            <div className="rounded-[22px] border border-black/5 bg-white px-6 py-8">
              <FeatureStripCard
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 13H20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 4H18L20 13L4 13L6 4Z" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M9 18L7 20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 18L17 20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                }
                title="Fast & Efficient"
                desc="Streamlined processes save time and effort."
              />
            </div>
            <div className="rounded-[22px] border border-black/5 bg-white px-6 py-8">
              <FeatureStripCard
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M8 12H16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 8V16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                }
                title="Built for Everyone"
                desc="For job seekers, employers and consultants."
              />
            </div>
            <div className="rounded-[22px] border border-black/5 bg-white px-6 py-8">
              <FeatureStripCard
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#7C3AED" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                title="24/7 Support"
                desc="We’re here to help you anytime, anywhere."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

