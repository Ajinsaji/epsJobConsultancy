import { useMemo, useState } from 'react'
import GlassCard from '../../../../components/ui/GlassCard'
import { GlassButton } from '../../../../components/ui/GlassButton'
import { CMSSkeleton } from '../shared/CMSSkeleton'

const FOOTER_KEYS = [
  'footerContactEmail',
  'footerContactPhone',
  'footerContactAddress',
  'footerCopyright',
  'footerNewsletterText',
  'footerSocialLinks'
]

export default function FooterSettings({ draft, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    footerContactEmail: draft?.footerContactEmail || '',
    footerContactPhone: draft?.footerContactPhone || '',
    footerContactAddress: draft?.footerContactAddress || '',
    footerCopyright: draft?.footerCopyright || '',
    footerNewsletterText: draft?.footerNewsletterText || '',
    footerSocialLinks: draft?.footerSocialLinks || {}
  }))

  const dirty = useMemo(() => {
    if (!draft) return false
    return FOOTER_KEYS.some((k) => JSON.stringify(form[k]) !== JSON.stringify(draft[k] || (k === 'footerSocialLinks' ? {} : '')))
  }, [draft, form])

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }))

  const save = (e) => {
    e.preventDefault()
    onSave({
      footerContactEmail: form.footerContactEmail,
      footerContactPhone: form.footerContactPhone,
      footerContactAddress: form.footerContactAddress,
      footerCopyright: form.footerCopyright,
      footerNewsletterText: form.footerNewsletterText,
      footerSocialLinks: form.footerSocialLinks
    })
  }

  if (!draft) return <CMSSkeleton />

  return (
    <form onSubmit={save} className="space-y-6">
      <GlassCard className="p-6 bg-slate-900/50 border-white/10">
        <h2 className="text-lg font-bold text-white mb-2">Footer</h2>
        <p className="text-xs text-white/60 mb-6">Contact info, newsletter text, and social links.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Contact Email</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
              type="email"
              value={form.footerContactEmail}
              onChange={(e) => set('footerContactEmail', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Contact Phone</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
              type="text"
              value={form.footerContactPhone}
              onChange={(e) => set('footerContactPhone', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-white/70 mb-1">Address</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
              type="text"
              value={form.footerContactAddress}
              onChange={(e) => set('footerContactAddress', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Copyright</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
              type="text"
              value={form.footerCopyright}
              onChange={(e) => set('footerCopyright', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-white/70 mb-1">Newsletter Text</label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
              value={form.footerNewsletterText}
              onChange={(e) => set('footerNewsletterText', e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs font-semibold text-white/70 mb-2">Social Links (JSON)</label>
          <textarea
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none font-mono"
            value={JSON.stringify(form.footerSocialLinks || {}, null, 2)}
            onChange={(e) => {
              try {
                set('footerSocialLinks', JSON.parse(e.target.value || '{}'))
              } catch {
                // ignore invalid JSON to avoid breaking UI
              }
            }}
          />
          <p className="text-[10px] text-white/40 mt-2">Example: {`{ "linkedin": "https://..." }`}</p>
        </div>
      </GlassCard>

      <div className="flex justify-end">
        <GlassButton type="submit" variant="primary" className="px-6 py-2.5 text-sm" disabled={saving || !dirty}>
          {saving ? 'Saving…' : 'Save Footer'}
        </GlassButton>
      </div>
    </form>
  )
}

