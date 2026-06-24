import { motion } from 'framer-motion'

export default function LoadingSkeleton({ className = '' }) {
  return (
    <motion.div
      className={
        'animate-pulse rounded-xl border border-white/10 bg-white/5 ' +
        className
      }
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
    />
  )
}

