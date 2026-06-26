import { useMemo, useState } from 'react'
import GlassCard from '../../../../components/ui/GlassCard'
import { GlassButton } from '../../../../components/ui/GlassButton'
import { CMSSkeleton } from '../shared/CMSSkeleton'

export default function HeroSettings({ draft, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    heroBadge: draft?.heroBadge || '',
    heroHeadline: draft?.heroHeadline || '',
    heroSubheading: draft?.heroSubheading || ''
  }))

  const dirty = useMemo(() => {
    if (!draft) return false
    return (
      form.heroBadge !== (draft.heroBadge || '') ||
      form.heroHeadline !== (draft.heroHeadline || '') ||
      form.heroSubheading !== (draft.heroSubheading || '')
    )
  }, [draft, form])

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }))

  const save = (e) => {
    e.preventDefault()
    onSave({
      heroBadge: form.heroBadge,
      heroHeadline: form.heroHeadline,
      heroSubheading: form.heroSubheading
    })
  }

  if (!draft) return <CMSSkeleton />

  return (
    <form onSubmit={save} className="space-y-6">
      <GlassCard className="p-6 bg-slate-900/50 border-white/10">
        <h2 className="text-lg font-bold text-white mb-2">Hero</h2>
        <p className="text-xs text-white/60 mb-6">Primary announcement badge, headline and subheading.</p>

        <div className="grid gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Announcement Badge</label>
            <input
              type="text"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={form.heroBadge}
              onChange={(e) => set('heroBadge', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Headline</label>
            <input
              type="text"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={form.heroHeadline}
              onChange={(e) => set('heroHeadline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Subheading</label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={form.heroSubheading}
              onChange={(e) => set('heroSubheading', e.target.value)}
            />
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-end">
        <GlassButton type="submit" variant="primary" className="px-6 py-2.5 text-sm" disabled={saving || !dirty}>
          {saving ? 'Saving…' : 'Save Hero'}
        </GlassButton>
      </div>
    </form>
  )
}

