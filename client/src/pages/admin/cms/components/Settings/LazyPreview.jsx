import { useEffect, useMemo, useRef, useState } from 'react'

import GlassCard from '../../../../components/ui/GlassCard'
import { CMSSkeleton } from '../shared/CMSSkeleton'

import {
  getPublicStats,
  getPublicJobs,
  getPublicPartners,
  getPublicServices,
  getPublicPlacements,
  getPublicCandidateTestimonials,
  getPublicEmployerTestimonials,
  getPublicFAQs
} from '../../api/publicPreviewApi'

import {
  HeroSection,
  StatisticsSection,
  FeaturedJobsSection,
  PartnersSection,
  PlacementsSection,
  TestimonialsSection,
  FAQSection,
  CTASection
} from '../../../public/sections'


const CACHE_TTL_MS = 60_000



function mapVisible(draftVisibleSections) {
  // Mongo stores visibleSections as Map on server for draft; client may receive plain object.
  if (!draftVisibleSections) return {}
  return draftVisibleSections
}

export default function LazyPreview({ draft }) {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [previewListings, setPreviewListings] = useState(null)

  const cacheRef = useRef({
    ts: 0,
    value: null
  })

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(t)
  }, [])

  const shouldUseCache = () => {
    const age = Date.now() - (cacheRef.current.ts || 0)
    return cacheRef.current.value && age < CACHE_TTL_MS
  }

  useEffect(() => {
    if (!draft) return
    if (!ready) return

    const run = async () => {
      setLoading(true)
      try {
        if (shouldUseCache()) {
          setPreviewListings(cacheRef.current.value)
          return
        }

        // Load real DB data for preview.
        const [statsRes, jobsRes, partnersRes, servicesRes, placementsRes, candTRes, empTRes, faqsRes] =
          await Promise.all([
            getPublicStats(),
            getPublicJobs({ limit: 6 }),
            getPublicPartners({ limit: 20 }),
            getPublicServices({ limit: 8 }),
            getPublicPlacements({ limit: 8 }),
            getPublicCandidateTestimonials({ limit: 10 }),
            getPublicEmployerTestimonials({ limit: 10 }),
            getPublicFAQs({ limit: 12 })
          ])

        const next = {
          stats: statsRes?.data?.data ?? statsRes?.data,
          jobs: jobsRes?.data?.data ?? jobsRes?.data,
          partners: partnersRes?.data?.data ?? partnersRes?.data,
          services: servicesRes?.data?.data ?? servicesRes?.data,
          placements: placementsRes?.data?.data ?? placementsRes?.data,
          testimonials: {
            candidates: candTRes?.data?.data ?? candTRes?.data,
            employers: empTRes?.data?.data ?? empTRes?.data
          },
          faqs: faqsRes?.data?.data ?? faqsRes?.data,
          loadedAt: new Date().toISOString()
        }

        cacheRef.current = { ts: Date.now(), value: next }
        setPreviewListings(next)
      } catch (e) {
        console.error(e)
        // Keep preview functional with draft-only snapshot
        setPreviewListings(null)
      } finally {
        setLoading(false)
      }
    }

    run()
    // Invalidate cache when draft updates. We key off draftLastUpdatedAt.
  }, [draft?._id, draft?.draftLastUpdatedAt, ready])

  const previewData = useMemo(() => {
    if (!draft) return null

    const visible = mapVisible(draft.visibleSections)
    const order = draft.sectionOrder || []

    return {
      config: {
        heroBadge: draft.heroBadge,
        heroHeadline: draft.heroHeadline,
        heroSubheading: draft.heroSubheading,
        footer: {
          footerContactEmail: draft.footerContactEmail,
          footerContactPhone: draft.footerContactPhone,
          footerContactAddress: draft.footerContactAddress,
          footerNewsletterText: draft.footerNewsletterText,
          footerSocialLinks: draft.footerSocialLinks,
          footerCopyright: draft.footerCopyright
        },
        seo: {
          seoTitle: draft.seoTitle,
          seoDescription: draft.seoDescription,
          seoSocialImage: draft.seoSocialImage
        },
        visibleSections: visible,
        sectionOrder: order
      },
      listings: previewListings,
      computedRenderPlan: order
        .filter((sec) => visible?.[sec] !== false)
        .map((sec) => ({ section: sec }))
    }
  }, [draft, previewListings])

  if (!draft) return <CMSSkeleton />
  if (!ready) return <CMSSkeleton />

  const visible = previewData?.config?.visibleSections || {}
  const order = previewData?.config?.sectionOrder || []

  const isVisible = (key) => visible?.[key] !== false

  const sectionRenderers = {
    hero: () => <HeroSection config={previewData?.config} />,
    statistics: () => <StatisticsSection />, // uses /api/public/stats internally (live)
    featured_jobs: () => <FeaturedJobsSection />, // uses /api/public/jobs internally (live)
    partners: () => <PartnersSection />, // uses /api/public/partners internally (live)
    placements: () => <PlacementsSection />, // uses /api/public/placements internally (live)
    testimonials: () => <TestimonialsSection />, // uses /api/public/testimonials/* internally (live)
    faqs: () => <FAQSection />, // uses /api/public/faqs internally (live)
    cta: () => <CTASection /> // uses static copy
  }

  const responsiveWrap = (children) => (
    <div className="space-y-6">
      <GlassCard className="p-4 bg-slate-900/50 border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-extrabold tracking-widest text-indigo-300 uppercase">DRAFT PREVIEW</div>
            <h2 className="text-base font-bold text-white mt-1">Homepage (Draft + Live DB)</h2>
            <p className="text-[10px] text-white/60 mt-1">
              You are viewing the draft layout with real live listings. Publish to update the public site.
            </p>
          </div>
          <div className="text-[10px] text-white/50 whitespace-nowrap">{loading ? 'Loading…' : 'Ready'}</div>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-[#050816] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/60">Desktop</span>
            <span className="text-[10px] text-white/40">~1440px</span>
          </div>
          <div className="scale-[1] origin-top-left">{children}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#050816] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/60">Tablet</span>
            <span className="text-[10px] text-white/40">~820px</span>
          </div>
          <div className="scale-[0.82] origin-top-left">{children}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#050816] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/60">Mobile</span>
            <span className="text-[10px] text-white/40">~390px</span>
          </div>
          <div className="scale-[0.6] origin-top-left">{children}</div>
        </div>
      </div>
    </div>
  )

  const children = (
    <div className="min-h-screen bg-[#050816] text-white">
      {order.map((secKey) => {
        if (!isVisible(secKey)) return null
        const render = sectionRenderers[secKey]
        return render ? <div key={secKey}>{render()}</div> : null
      })}
    </div>
  )

  if (!draft) return <CMSSkeleton />
  if (!ready) return <CMSSkeleton />

  return responsiveWrap(children)
}



