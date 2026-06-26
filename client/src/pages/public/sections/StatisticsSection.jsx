import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import GlassCard from '../../../components/ui/GlassCard'

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    let start = 0
    const end = parseInt(value)
    if (isNaN(end) || end === 0) {
      setCount(value)
      return
    }

    const totalSteps = 60
    const stepTime = duration / totalSteps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / totalSteps
      // Easing out quadratic
      const currentVal = Math.round(end * (progress * (2 - progress)))
      setCount(currentVal)

      if (currentStep >= totalSteps) {
        clearInterval(timer)
        setCount(end)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value, hasStarted, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatisticsSection() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/api/public/stats')
        setStats(res.data)
      } catch (err) {
        console.error('Error fetching statistics:', err)
      } finally {
        setLoading(false)
      }
    }
    getStats()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-[#030611] border-y border-white/5">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const list = [
    { label: 'Registered Candidates', value: stats?.candidates || 0, suffix: '+' },
    { label: 'Partner Companies', value: stats?.companies || 0, suffix: '+' },
    { label: 'Open Vacancies', value: stats?.openJobs || 0, suffix: '+' },
    { label: 'Successful Placements', value: stats?.placements || 0, suffix: '+' },
    { label: 'Interviews Conducted', value: stats?.interviews || 0, suffix: '+' },
    { label: 'Hiring Success Rate', value: stats?.hiringSuccessRate || 96, suffix: '%' }
  ]

  return (
    <section className="py-16 bg-[#030611]/80 border-y border-white/5 relative">
      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <GlassCard className="p-5 text-center bg-slate-950/40 border-white/5 hover:border-violet-500/20 hover:bg-white/[0.02] hover:scale-102 transition duration-300 h-full flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-2 text-xs font-semibold text-white/50 leading-relaxed uppercase tracking-wider">
                  {item.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
