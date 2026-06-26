import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { getHomepageConfig, updateHomepageConfig, publishHomepageConfig } from './api/homepageApi'


import GlassCard from '../../../components/ui/GlassCard'
import { GlassButton } from '../../../components/ui/GlassButton'

import HeroSettings from './components/Settings/HeroSettings'
import LayoutSettings from './components/Settings/LayoutSettings'
import FooterSettings from './components/Settings/FooterSettings'
import SEOSettings from './components/Settings/SEOSettings'
import LazyPreview from './components/Settings/LazyPreview'


const TAB_ITEMS = [
  { id: 'hero', label: 'Hero' },
  { id: 'layout', label: 'Homepage Layout' },
  { id: 'footer', label: 'Footer' },
  { id: 'seo', label: 'SEO' },
  { id: 'preview', label: 'Preview' }
]

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [draftConfig, setDraftConfig] = useState(null)
  const [publishedMeta, setPublishedMeta] = useState({
    publishedVersion: null,
    lastPublishedBy: null,
    lastPublishedAt: null
  })

  // For disabled public exposure: never fetch / use published-only content for Preview.
  // We only load the draft (and metadata about latest published) via /api/admin/homepage-config.
  const refreshDraft = async () => {
    setLoading(true)
    try {
      const res = await getHomepageConfig()
      setDraftConfig(res?.draft || null)
      setPublishedMeta({
        publishedVersion: res?.publishedVersion ?? null,
        lastPublishedBy: res?.lastPublishedBy ?? null,
        lastPublishedAt: res?.lastPublishedAt ?? null
      })
    } catch (e) {
      console.error(e)
      toast.error('Failed to load homepage settings draft')
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    refreshDraft()
  }, [])

  const updateDraft = async (patch) => {
    if (!draftConfig) return
    setSaving(true)
    try {
      const res = await updateHomepageConfig({ ...patch })
      setDraftConfig(res)
      toast.success('Draft saved')
    } catch (e) {
      console.error(e)
      toast.error('Failed to save draft')
    } finally {
      setSaving(false)
    }
  }


  const publish = async () => {
    setSaving(true)
    try {
      await publishHomepageConfig()
      toast.success('Published homepage settings')
      await refreshDraft()
    } catch (e) {
      console.error(e)
      toast.error('Publish failed')
    } finally {
      setSaving(false)
    }
  }



  const topBar = useMemo(() => {
    const updated = draftConfig?.draftLastUpdatedAt
    const updatedStr = updated ? new Date(updated).toLocaleString() : null

    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Homepage Settings CMS</h1>
          <p className="text-white/60">Configure draft content and publish to the public website.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshDraft}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition"
            disabled={loading || saving}
          >
            {loading ? 'Loading…' : 'Refresh'}
          </button>

          <GlassButton
            variant="primary"
            onClick={publish}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            disabled={loading || saving}
          >
            Publish
          </GlassButton>
        </div>
      </div>
    )
  }, [draftConfig, loading, saving])

  if (loading || !draftConfig) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-white/60 text-sm">Loading CMS draft…</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {topBar}

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        {TAB_ITEMS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={
              'px-4 py-2 text-sm font-semibold rounded-xl transition ' +
              (activeTab === t.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {activeTab === 'hero' && (
            <HeroSettings draft={draftConfig} onSave={updateDraft} saving={saving} />
          )}
          {activeTab === 'layout' && (
            <LayoutSettings draft={draftConfig} onSave={updateDraft} saving={saving} />
          )}
          {activeTab === 'footer' && (
            <FooterSettings draft={draftConfig} onSave={updateDraft} saving={saving} />
          )}
          {activeTab === 'seo' && (
            <SEOSettings draft={draftConfig} onSave={updateDraft} saving={saving} />
          )}

          {activeTab === 'preview' && <LazyPreview draft={draftConfig} />}
        </div>

        <aside className="space-y-4">
          <GlassCard className="p-4 bg-slate-900/40 border-white/10">
            <h3 className="text-sm font-bold text-white/80 mb-2">Publish Status</h3>
            <div className="text-xs text-white/60 space-y-2">
              <div className="flex justify-between gap-3">
                <span>Draft updated</span>
                <span className="text-white">{draftConfig?.draftLastUpdatedAt ? new Date(draftConfig.draftLastUpdatedAt).toLocaleString() : '—'}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Published version</span>
                <span className="text-white">{publishedMeta.publishedVersion ?? '—'}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Last published by</span>
                <span className="text-white">{publishedMeta.lastPublishedBy ?? '—'}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 bg-slate-900/40 border-white/10">
            <h3 className="text-sm font-bold text-white/80 mb-2">Rules</h3>
            <ul className="text-xs text-white/60 space-y-2">
              <li>Preview uses <span className="text-white">draft</span>.</li>
              <li>Public website uses <span className="text-white">published</span> only.</li>
              <li>Never expose draft via public APIs.</li>
            </ul>
          </GlassCard>
        </aside>
      </div>
    </div>
  )
}

