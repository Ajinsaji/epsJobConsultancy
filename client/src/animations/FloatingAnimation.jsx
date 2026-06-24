import { motion } from 'framer-motion'

export default function FloatingAnimation({ children }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

