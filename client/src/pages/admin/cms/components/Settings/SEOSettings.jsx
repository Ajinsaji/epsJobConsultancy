import { useMemo, useState } from 'react'
import GlassCard from '../../../../components/ui/GlassCard'
import { GlassButton } from '../../../../components/ui/GlassButton'
import { CMSSkeleton } from '../shared/CMSSkeleton'

const SEO_KEYS = [
  'seoTitle',
  'seoDescription',
  'seoOgTitle',
  'seoOgDescription',
  'seoFavicon',
  'seoSocialImage'
]

export default function SEOSettings({ draft, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    seoTitle: draft?.seoTitle || '',
    seoDescription: draft?.seoDescription || '',
    seoOgTitle: draft?.seoOgTitle || '',
    seoOgDescription: draft?.seoOgDescription || '',
    seoFavicon: draft?.seoFavicon || '',
    seoSocialImage: draft?.seoSocialImage || ''
  }))

  const dirty = useMemo(() => {
    if (!draft) return false
    return SEO_KEYS.some((k) => form[k] !== (draft[k] || ''))
  }, [draft, form])

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }))

  const save = (e) => {
    e.preventDefault()
    onSave({
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      seoOgTitle: form.seoOgTitle,
      seoOgDescription: form.seoOgDescription,
      seoFavicon: form.seoFavicon,
      seoSocialImage: form.seoSocialImage
    })
  }

  if (!draft) return <CMSSkeleton />

  return (
    <form onSubmit={save} className="space-y-6">
      <GlassCard className="p-6 bg-slate-900/50 border-white/10">
        <h2 className="text-lg font-bold text-white mb-2">SEO</h2>
        <p className="text-xs text-white/60 mb-6">Title/description and OpenGraph metadata.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-white/70 mb-1">SEO Title</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none" value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-white/70 mb-1">SEO Description</label>
            <textarea rows={2} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none" value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">OG Title</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none" value={form.seoOgTitle} onChange={(e) => set('seoOgTitle', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">OG Description</label>
            <textarea rows={2} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none" value={form.seoOgDescription} onChange={(e) => set('seoOgDescription', e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Favicon</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none" value={form.seoFavicon} onChange={(e) => set('seoFavicon', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Social Image URL</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none" value={form.seoSocialImage} onChange={(e) => set('seoSocialImage', e.target.value)} />
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-end">
        <GlassButton type="submit" variant="primary" className="px-6 py-2.5 text-sm" disabled={saving || !dirty}>
          {saving ? 'Saving…' : 'Save SEO'}
        </GlassButton>
      </div>
    </form>
  )
}

