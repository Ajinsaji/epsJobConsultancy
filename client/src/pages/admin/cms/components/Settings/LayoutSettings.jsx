import { useMemo, useState } from 'react'
import GlassCard from '../../../../components/ui/GlassCard'
import { GlassButton } from '../../../../components/ui/GlassButton'
import { CMSSkeleton } from '../shared/CMSSkeleton'

const ORDER_DEFAULT = [
  'hero',
  'benefits_candidate',
  'benefits_employer',
  'statistics',
  'how_it_works',
  'testimonials',
  'featured_jobs',
  'partners',
  'placements',
  'faqs',
  'cta'
]

export default function LayoutSettings({ draft, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    sectionOrder: draft?.sectionOrder || ORDER_DEFAULT,
    visibleSections: draft?.visibleSections || {}
  }))

  const dirty = useMemo(() => {
    if (!draft) return false
    const nextVisible = form.visibleSections || {}
    const prevVisible = draft.visibleSections || {}
    return JSON.stringify(form.sectionOrder) !== JSON.stringify(draft.sectionOrder || ORDER_DEFAULT) ||
      JSON.stringify(nextVisible) !== JSON.stringify(prevVisible)
  }, [draft, form])

  const toggleVisible = (key) => {
    setForm((p) => ({
      ...p,
      visibleSections: { ...(p.visibleSections || {}), [key]: !(p.visibleSections || {})[key] }
    }))
  }

  const move = (key, dir) => {
    setForm((p) => {
      const arr = [...(p.sectionOrder || [])]
      const idx = arr.indexOf(key)
      const next = idx + dir
      if (idx < 0 || next < 0 || next >= arr.length) return p
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return { ...p, sectionOrder: arr }
    })
  }

  const isVisible = (key) => {
    const v = form.visibleSections?.[key]
    return v !== false
  }

  const save = (e) => {
    e.preventDefault()
    onSave({
      sectionOrder: form.sectionOrder,
      visibleSections: form.visibleSections
    })
  }

  if (!draft) return <CMSSkeleton />

  const keys = form.sectionOrder || ORDER_DEFAULT

  return (
    <form onSubmit={save} className="space-y-6">
      <GlassCard className="p-6 bg-slate-900/50 border-white/10">
        <h2 className="text-lg font-bold text-white mb-2">Homepage Layout</h2>
        <p className="text-xs text-white/60 mb-4">Control ordering and visibility of homepage sections.</p>

        <div className="space-y-4">
          {keys.map((k) => (
            <div key={k} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVisible(k)}
                      onChange={() => toggleVisible(k)}
                      className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                    />
                    <span className="text-xs font-bold text-white/80 capitalize">{k.replace(/_/g, ' ')}</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => move(k, -1)}
                  className="px-2 py-1 rounded-lg text-xs font-bold text-white/60 bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(k, 1)}
                  className="px-2 py-1 rounded-lg text-xs font-bold text-white/60 bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-end">
        <GlassButton
          type="submit"
          variant="primary"
          className="px-6 py-2.5 text-sm"
          disabled={saving || !dirty}
        >
          {saving ? 'Saving…' : 'Save Layout'}
        </GlassButton>
      </div>
    </form>
  )
}

