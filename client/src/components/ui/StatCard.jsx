import { Card, CardContent } from './Card'

export default function StatCard({
  label,
  value,
  sublabel,
  className = '',
  tone = 'primary',
}) {
  const toneClass =
    tone === 'accent'
      ? 'from-[#25C4F5]/30 to-[#1F7BE5]/30'
      : tone === 'success'
        ? 'from-emerald-400/25 to-[#1F7BE5]/30'
        : tone === 'secondary'
          ? 'from-[#25C4F5]/25 to-[#1F7BE5]/30'
          : 'from-[#1F7BE5]/30 to-[#25C4F5]/30'


  return (
    <Card
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
    </Card>
  )
}


