import React from 'react'
import { ArrowDown, Award, Sparkles } from 'lucide-react'
import { FigmaNavRail } from '../presentation/Modules/FigmaNavRail'
import { ExecutiveSummary } from '../presentation/Modules/ExecutiveSummary'
import { UXStrategySection } from '../presentation/Modules/UXStrategySection'
import { UserJourneyMaps } from '../presentation/Modules/UserJourneyMaps'
import { AIEcosystemDiagram } from '../presentation/Modules/AIEcosystemDiagram'
import { MotionShowcase } from '../presentation/Modules/MotionShowcase'
import { DesignMetricsPanel, ComponentStatsPanel } from '../presentation/Modules/DesignMetricsPanel'
import { AccessibilitySection, BreakpointDiagram } from '../presentation/Modules/AccessibilitySection'
import { ProductEcosystemMap, ProductionStatesSpecimen } from '../presentation/Modules/ProductEcosystemMap'
import { EngineeringPerformance, ProjectTimeline, FinalCTASlide } from '../presentation/Modules/EngineeringPerformance'

import { MacBookFrame } from '../presentation/Shared/MacBookFrame'
import { iPhone16ProFrame } from '../presentation/Shared/iPhone16ProFrame'

import { PublicWebsite } from '../presentation/Desktop/PublicWebsite'
import { CandidateDashboard } from '../presentation/Desktop/CandidateDashboard'
import { CompanyDashboard } from '../presentation/Desktop/CompanyDashboard'
import { AdminDashboard } from '../presentation/Desktop/AdminDashboard'

import { PublicMobile } from '../presentation/Mobile/PublicMobile'
import { CandidateMobile } from '../presentation/Mobile/CandidateMobile'
import { CompanyMobile } from '../presentation/Mobile/CompanyMobile'
import { AdminMobile } from '../presentation/Mobile/AdminMobile'

import { AIModulesShowcase } from '../presentation/Modules/AIModulesShowcase'

export const CaseStudyPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* Floating Figma Navigation Rail */}
      <FigmaNavRail />

      {/* 1. Cover / Hero Case Study */}
      <section id="overview" className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center">
              EPS
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight block leading-none">EPS WORKFORCE SOLUTIONS</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">VERSION 1.0 CASE STUDY</span>
            </div>
          </div>
          <span className="bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
            Presentation 2026
          </span>
        </div>

        {/* Hero Title */}
        <div className="max-w-4xl space-y-6 my-auto z-10 pt-12 pb-12">
          <span className="inline-flex items-center gap-2 bg-blue-600/30 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold">
            <Award className="w-4 h-4 text-yellow-400" /> Behance Featured Showcase
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI Powered <br /><span className="text-blue-500">Recruitment Platform</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            A unified design system, multi-persona SaaS architecture, and high-fidelity mobile suite for enterprise talent acquisition.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold pt-4">
            <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-lg border border-white/10">Design System</span>
            <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-lg border border-white/10">UX Strategy</span>
            <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-lg border border-white/10">Responsive Experience</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-3.5 py-1.5 rounded-lg border border-emerald-500/30">91% Match Engine</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400 z-10">
          <span>Scroll ↓ to explore UX Strategy & Mockups</span>
          <a href="#summary" className="flex items-center gap-1.5 text-blue-400 font-bold hover:underline">
            <span>Begin Storyboard</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* Main Story Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        
        {/* 2. Executive Summary */}
        <section id="summary">
          <ExecutiveSummary />
        </section>

        {/* 3. UX Strategy */}
        <section id="strategy">
          <UXStrategySection />
        </section>

        {/* 4. User Journey Maps */}
        <section id="journeys">
          <UserJourneyMaps />
        </section>

        {/* 5. Product Ecosystem Map */}
        <section id="ecosystem">
          <ProductEcosystemMap />
        </section>

        {/* 6. AI Ecosystem Diagram */}
        <section id="ai">
          <AIEcosystemDiagram />
        </section>

        {/* 7. Design System & Metrics */}
        <section id="design-system" className="space-y-8">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Design System</span>
            <h2 className="text-2xl font-bold text-gray-900">Metrics & Scale</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DesignMetricsPanel />
            <ComponentStatsPanel />
          </div>
        </section>

        {/* 8. Accessibility & Breakpoints */}
        <section id="accessibility" className="space-y-8">
          <AccessibilitySection />
          <BreakpointDiagram />
        </section>

        {/* 9. Production Interface States */}
        <section id="states">
          <ProductionStatesSpecimen />
        </section>

        {/* 10. Motion Showcase */}
        <section id="motion">
          <MotionShowcase />
        </section>

        {/* 11. Desktop Mockups (MacBook Pro Frames) */}
        <section id="desktop" className="space-y-12">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Desktop Suite</span>
            <h2 className="text-2xl font-bold text-gray-900">MacBook Pro Viewports</h2>
          </div>

          <div className="space-y-12">
            <MacBookFrame title="Public Website Desktop" url="eps-workforce.com">
              <PublicWebsite />
            </MacBookFrame>

            <MacBookFrame title="Candidate Dashboard Desktop" url="eps-workforce.com/candidate">
              <CandidateDashboard />
            </MacBookFrame>

            <MacBookFrame title="Company Dashboard Desktop" url="eps-workforce.com/company">
              <CompanyDashboard />
            </MacBookFrame>

            <MacBookFrame title="Admin Dashboard Desktop" url="eps-workforce.com/admin">
              <AdminDashboard />
            </MacBookFrame>
          </div>
        </section>

        {/* 12. Mobile Native Suite (iPhone 16 Pro Frames) */}
        <section id="mobile" className="space-y-8">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Mobile Native Suite</span>
            <h2 className="text-2xl font-bold text-gray-900">iPhone 16 Pro Hardware Viewports</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <iPhone16ProFrame title="Public Mobile">
              <PublicMobile />
            </iPhone16ProFrame>

            <iPhone16ProFrame title="Candidate Mobile App">
              <CandidateMobile />
            </iPhone16ProFrame>

            <iPhone16ProFrame title="Company Mobile App">
              <CompanyMobile />
            </iPhone16ProFrame>

            <iPhone16ProFrame title="Admin Mobile App">
              <AdminMobile />
            </iPhone16ProFrame>
          </div>
        </section>

        {/* 13. Specialized AI Modules */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Specialized Modules</span>
            <h2 className="text-2xl font-bold text-gray-900">AI Intelligence & Auth Features</h2>
          </div>
          <AIModulesShowcase />
        </section>

        {/* 14. Engineering & Evolution Timeline */}
        <section className="space-y-8">
          <EngineeringPerformance />
          <ProjectTimeline />
        </section>

        {/* 15. Final Version 1.0 Vision Slide */}
        <section id="vision" className="pt-8">
          <FinalCTASlide />
        </section>

      </div>

    </div>
  )
}
