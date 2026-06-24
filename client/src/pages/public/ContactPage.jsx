import { useMemo, useState } from 'react'
import GlassCard from '../../components/ui/GlassCard'
import SectionTitle from '../../components/ui/SectionTitle'
import RevealOnScroll from '../../animations/RevealOnScroll'
import { motion } from 'framer-motion'
import { GlassButton } from '../../components/ui/GlassButton'


export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const canSend = useMemo(() => {
    return form.name.trim().length > 1 && form.email.includes('@') && form.message.trim().length > 5
  }, [form])

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2500)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <RevealOnScroll>
          <SectionTitle title="Contact" subtitle="Professional recruitment support for candidates, employers, and partners." />
        </RevealOnScroll>

        {/* CONTACT INFORMATION */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <RevealOnScroll>
            <GlassCard>
              <div className="text-sm font-semibold">Business Enquiries</div>
              <div className="mt-2 text-xs text-white/60">hello@epsjobs.com</div>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" />
            </GlassCard>
          </RevealOnScroll>
          <RevealOnScroll>
            <GlassCard>
              <div className="text-sm font-semibold">Hiring Support</div>
              <div className="mt-2 text-xs text-white/60">support@epsjobs.com</div>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" />
            </GlassCard>
          </RevealOnScroll>
          <RevealOnScroll>
            <GlassCard>
              <div className="text-sm font-semibold">Response Times</div>
              <div className="mt-2 text-xs text-white/60">Mon–Fri • 9:00–18:00</div>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" />
            </GlassCard>
          </RevealOnScroll>
        </section>

        {/* CONTACT FORM + SUPPORT CARDS */}
        <section className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3">
            <RevealOnScroll>
              <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
                <GlassCard className="p-6 md:p-7">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold">Contact form</div>
                      <div className="mt-1 text-xs text-white/60">Tell us what you need and we’ll route your message.</div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-xs text-white/60 mb-1">Name</div>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Email</div>
                        <input
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-white/60 mb-1">Message</div>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
                        placeholder="Business enquiries, hiring support, or partnership requests…"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-white/60">
                        {sent ? (
                          <span className="text-emerald-300 font-semibold">Sent! We’ll get back to you.</span>
                        ) : (
                          <span>Ready when you are.</span>
                        )}
                      </div>
                      <GlassButton
                        type="submit"
                        variant="primary"
                        className={'px-5 ' + (!canSend ? 'opacity-60 pointer-events-none' : '')}
                      >
                        Send Message
                      </GlassButton>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            </RevealOnScroll>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <RevealOnScroll>
                <GlassCard className="p-5">
                  <div className="text-sm font-semibold">Hiring Support</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">
                    Need help with candidate discovery, shortlisting, or interview coordination? Send us your details and we’ll respond.
                  </div>
                </GlassCard>
              </RevealOnScroll>

              <RevealOnScroll>
                <GlassCard className="p-5">
                  <div className="text-sm font-semibold">Partnership Requests</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">
                    Interested in recruitment services, co-selling, or hiring collaboration? We’ll connect you with the right team.
                  </div>
                </GlassCard>
              </RevealOnScroll>

              <RevealOnScroll>
                <GlassCard className="p-5">
                  <div className="text-sm font-semibold">Business Enquiries</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">
                    Want pricing, onboarding, or custom hiring solutions? Contact us and we’ll guide next steps.
                  </div>
                </GlassCard>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}




