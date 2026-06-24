export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
}) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-sm text-white/70">{subtitle}</p>
      ) : null}
    </div>
  )
}

