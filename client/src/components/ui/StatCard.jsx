import GlassCard from './GlassCard'

export default function StatCard({
  label,
  value,
  sublabel,
  className = '',
  tone = 'primary',
}) {
  const toneClass =
    tone === 'accent'
      ? 'from-cyan-400/30 to-indigo-500/30'
      : tone === 'success'
        ? 'from-emerald-400/25 to-indigo-500/30'
        : tone === 'secondary'
          ? 'from-violet-400/25 to-indigo-500/30'
          : 'from-indigo-500/30 to-violet-500/30'

  return (
    <GlassCard
      className={
        'relative overflow-hidden ' +
        className
      }
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-80" />
      <div
        className={
          'absolute inset-0 bg-gradient-to-br ' +
          toneClass +
          ' opacity-70'
        }
      />
      <div className="relative">
        <div className="text-xs font-semibold text-white/70">{label}</div>
        <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
          {value}
        </div>
        {sublabel ? (
          <div className="mt-1 text-sm text-white/70">{sublabel}</div>
        ) : null}
      </div>
    </GlassCard>
  )
}


