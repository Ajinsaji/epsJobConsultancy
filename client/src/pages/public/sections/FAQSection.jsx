import { useEffect, useState } from 'react'
import { publicApi } from '../../../api/publicApi'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../../../components/ui/GlassCard'

export default function FAQSection() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const list = await publicApi.getFAQs()
        setFaqs(list)

      } catch (err) {
        console.error('Error fetching FAQs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  if (loading) {
    return (
      <section className="py-24 bg-[#050816]">
        <div className="mx-auto max-w-[720px] px-6 text-center space-y-6">
          <div className="h-6 w-48 bg-white/5 animate-pulse mx-auto rounded" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#050816] text-white relative">
      {/* Background glare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[800px] px-6 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/15">
            General Queries
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
            Got questions about our hybrid recruitment model? Find answers here.
          </p>
        </div>

        {faqs.length === 0 ? (
          /* Empty state */
          <GlassCard className="p-10 bg-slate-950/40 border-white/5 text-center max-w-md mx-auto rounded-2xl">
            <div className="text-2xl mb-2">❓</div>
            <h4 className="text-sm font-bold text-white mb-2">FAQ Content Coming Soon</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              We are compiling answers to candidate and employer queries. Contact our help desk for immediate assistance.
            </p>
          </GlassCard>
        ) : (
          /* Accordion List */
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <GlassCard 
                  key={faq._id}
                  className="bg-slate-950/40 border-white/5 overflow-hidden transition-all duration-300 rounded-xl"
                >
                  {/* Collapsed/Expanded Question Header */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base hover:text-indigo-300 transition duration-200"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-indigo-400 text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {/* Expanded Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-white/65 border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
