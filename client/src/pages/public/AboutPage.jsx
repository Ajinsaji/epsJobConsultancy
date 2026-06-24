import GlassCard from '../../components/ui/GlassCard'
import RevealOnScroll from '../../animations/RevealOnScroll'

function Bullets({ items }) {
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 md:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

          <RevealOnScroll>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur">
                EPS helps hiring teams and candidates move with clarity
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
                Hiring that feels simple—built for real outcomes.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                EPS combines smart matching with human-reviewed quality so candidates get the right opportunities and employers build
                shortlists they can trust.
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* MISSION */}
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <RevealOnScroll>
            <GlassCard className="h-full">
              <div className="text-sm font-semibold text-white/80">Mission</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Make job search and candidate discovery faster, more accurate, and less stressful—by aligning skills, roles, and
                expectations.
              </p>
            </GlassCard>
          </RevealOnScroll>
          <RevealOnScroll>
            <GlassCard className="h-full">
              <div className="text-sm font-semibold text-white/80">Who we are</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                A recruitment platform and consultancy layer focused on high-signal hiring: AI-assisted matching + review-driven
                confidence.
              </p>
            </GlassCard>
          </RevealOnScroll>
        </section>

        {/* WHAT MAKES US DIFFERENT */}
        <section className="mt-10">
          <RevealOnScroll>
            <div className="text-sm font-semibold text-white/70">What makes us different</div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Quality shortlists, not noisy pipelines</h2>
          </RevealOnScroll>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <RevealOnScroll>
              <GlassCard>
                <div className="text-sm font-semibold text-white/80">Candidates</div>
                <Bullets items={['Right role recommendations', 'Resume score clarity', 'Interview readiness support']} />
              </GlassCard>
            </RevealOnScroll>
            <RevealOnScroll>
              <GlassCard>
                <div className="text-sm font-semibold text-white/80">Employers</div>
                <Bullets items={['Active job visibility', 'Candidate match signals', 'Shortlist confidence with review']} />
              </GlassCard>
            </RevealOnScroll>
            <RevealOnScroll>
              <GlassCard>
                <div className="text-sm font-semibold text-white/80">Recruiters / Teams</div>
                <Bullets items={['Faster screening outcomes', 'Structured interviewing workflow', 'Hiring decisions with context']} />
              </GlassCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* OUR PROCESS */}
        <section className="mt-10">
          <RevealOnScroll>
            <div className="text-sm font-semibold text-white/70">Our process</div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">From discovery to shortlist</h2>
          </RevealOnScroll>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: 'Discover',
                d: 'Match candidates to roles using resume scoring and signal-aware recommendations.',
              },
              {
                t: 'Review',
                d: 'EPS applies a quality layer so shortlists reflect the right fit, not just keyword overlap.',
              },
              {
                t: 'Decide',
                d: 'Support teams move into interviews with clear context and better alignment.',
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

        {/* IMPACT */}
        <section className="mt-10">
          <RevealOnScroll>
            <div className="text-sm font-semibold text-white/70">Impact</div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Better outcomes for every side</h2>
          </RevealOnScroll>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <RevealOnScroll>
              <GlassCard>
                <div className="text-sm font-semibold text-white/80">For Candidates</div>
                <Bullets
                  items={[
                    'More accurate opportunities aligned with your profile',
                    'Clear feedback from resume scoring',
                    'Interview support that improves readiness',
                  ]}
                />
              </GlassCard>
            </RevealOnScroll>
            <RevealOnScroll>
              <GlassCard>
                <div className="text-sm font-semibold text-white/80">For Employers</div>
                <Bullets
                  items={[
                    'Shortlists built on relevance and quality review',
                    'Candidate match signals to reduce screening time',
                    'A smoother hiring flow into interviews',
                  ]}
                />
              </GlassCard>
            </RevealOnScroll>
          </div>
        </section>
      </div>
    </div>
  )
}



