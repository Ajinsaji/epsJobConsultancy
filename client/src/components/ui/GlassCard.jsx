import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  as: As = motion.div,
}) {
  return (
    <As
      className={
        'rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl ' +
        className
      }
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </As>
  )
}

