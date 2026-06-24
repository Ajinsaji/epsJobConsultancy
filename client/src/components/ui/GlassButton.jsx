import { motion } from 'framer-motion'

export function GlassButton({
  children,
  className = '',
  variant = 'primary',
  as,
  ...props
}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold backdrop-blur-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-400/60 '

  const variants = {
    primary:
      'bg-white/10 text-white border border-white/15 hover:bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
    accent:
      'bg-cyan-500/10 text-cyan-50 border border-cyan-400/20 hover:bg-cyan-500/15',
    success:
      'bg-emerald-500/10 text-emerald-50 border border-emerald-400/20 hover:bg-emerald-500/15',
    ghost:
      'bg-transparent text-slate-100 border border-white/10 hover:bg-white/5',
  }

  const V = variants[variant] ?? variants.primary

  const motionProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  }

  const Tag = as ?? motion.button

  return (
    <Tag className={base + V + ' ' + className} {...props} {...motionProps}>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/60 to-cyan-400/60 opacity-0 transition-all duration-300 group-hover:h-24 group-hover:w-24 group-hover:opacity-100" />
      </span>
    </Tag>
  )
}

