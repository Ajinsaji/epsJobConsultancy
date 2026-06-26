import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  HeroSection,
  StatisticsSection,
  CandidateSection,
  EmployerSection,
  HowItWorksSection,
  FeaturedJobsSection,
  PartnersSection,
  PlacementsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  PlacementAssuranceSection
} from './sections'


export default function HomePage() {
  const [config, setConfig] = useState(null)
  const [loadSecondary, setLoadSecondary] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch Homepage config from database
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get('/api/public/config')
        setConfig(res.data)
      } catch (err) {
        console.error('Error fetching homepage config:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()

    // Defer loading heavy secondary sections to improve FCP
    const timer = setTimeout(() => {
      setLoadSecondary(true)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  // Section mapping for dynamic order rendering
  const sectionMap = {
    hero: (cfg) => <HeroSection key="hero" config={cfg} />,
    statistics: () => <StatisticsSection key="statistics" />,
    benefits_candidate: () => <CandidateSection key="benefits_candidate" />,
    benefits_employer: () => <EmployerSection key="benefits_employer" />,
    how_it_works: () => <HowItWorksSection key="how_it_works" />,
    featured_jobs: () => <FeaturedJobsSection key="featured_jobs" />,
    partners: () => <PartnersSection key="partners" />,

    placement_assurance: () => <PlacementAssuranceSection key="placement_assurance" />,
    
    // Secondary sections loaded dynamically
    testimonials: () => loadSecondary ? <TestimonialsSection key="testimonials" /> : null,
    placements: () => loadSecondary ? <PlacementsSection key="placements" /> : null,
    faqs: () => loadSecondary ? <FAQSection key="faqs" /> : null,
    cta: () => loadSecondary ? <CTASection key="cta" /> : null
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mx-auto" />
          <p className="text-sm text-white/50 tracking-wider">Loading EPS Platform...</p>
        </div>
      </div>
    )
  }

  // Fallback defaults if no configuration has been seeded in DB
  const order = config?.sectionOrder || [
    'hero',
    'placement_assurance',
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


  // Map to hold visibility checks (defaulting to true if not explicitly false)
  const visible = config?.visibleSections || {}

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {order.map((secKey) => {
        // Retrieve visibility toggle (or default to true)
        const isVisible = visible[secKey] !== false
        if (!isVisible) return null

        const renderSection = sectionMap[secKey]
        return renderSection ? renderSection(config) : null
      })}
    </div>
  )
}
