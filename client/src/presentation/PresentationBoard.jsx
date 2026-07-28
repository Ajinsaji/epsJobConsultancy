import React, { useState } from 'react'
import { PresentationHeader } from './Shared/PresentationHeader'
import { SectionTitle } from './Shared/SectionTitle'
import { BrowserFrame } from './Shared/BrowserFrame'
import { PhoneFrame } from './Shared/PhoneFrame'
import { ModalInspector } from './Shared/ModalInspector'

// Design System Showcase Imports
import { 
  ColorShowcase, TypographyShowcase, ButtonShowcase, CardShowcase, 
  FormShowcase, TokensShowcase 
} from '../design-system'

// Desktop Screens
import { PublicWebsite } from './Desktop/PublicWebsite'
import { CandidateDashboard } from './Desktop/CandidateDashboard'
import { CompanyDashboard } from './Desktop/CompanyDashboard'
import { AdminDashboard } from './Desktop/AdminDashboard'

// Mobile Screens
import { PublicMobile } from './Mobile/PublicMobile'
import { CandidateMobile } from './Mobile/CandidateMobile'
import { CompanyMobile } from './Mobile/CompanyMobile'
import { AdminMobile } from './Mobile/AdminMobile'

// AI Modules
import { AIModulesShowcase } from './Modules/AIModulesShowcase'

export const PresentationBoard = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [zoomLevel, setZoomLevel] = useState(100)
  const [inspectedScreen, setInspectedScreen] = useState(null)

  const handleInspect = (title, category, component, description) => {
    setInspectedScreen({ title, category, component, description })
  }

  const zoomStyle = {
    transform: `scale(${zoomLevel / 100})`,
    transformOrigin: 'top center',
    transition: 'transform 0.3s ease-in-out',
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Behance Case Study Header */}
      <PresentationHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        zoomLevel={zoomLevel} 
        setZoomLevel={setZoomLevel} 
      />

      {/* Main Presentation Board Surface */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-20" style={zoomStyle}>
        
        {/* SECTION 01: DESIGN SYSTEM & TOKENS */}
        {(activeTab === 'all' || activeTab === 'design-system') && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <SectionTitle 
              number="01" 
              title="Design System & Atomic Tokens" 
              subtitle="The foundational design tokens, color swatches, typographic scale, and spatial primitives driving EPS Workforce Solutions."
              tag="SYSTEM ARCHITECTURE"
            />
            <div className="space-y-8">
              <TokensShowcase />
              <ColorShowcase />
              <TypographyShowcase />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ButtonShowcase />
                <FormShowcase />
              </div>
              <CardShowcase />
            </div>
          </section>
        )}

        {/* SECTION 02: DESKTOP SUITE */}
        {(activeTab === 'all' || activeTab === 'desktop') && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <SectionTitle 
              number="02" 
              title="Desktop Suite (4 Web Viewports)" 
              subtitle="Top-row enterprise web application interfaces rendered inside browser chrome frames."
              tag="DESKTOP ECOSYSTEM"
            />

            <div className="space-y-12">
              
              {/* 1. Public Website */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 px-1">
                  <span className="font-bold text-blue-600">01. PUBLIC MARKETING PORTAL</span>
                  <span>Responsive Desktop Landing</span>
                </div>
                <BrowserFrame 
                  title="EPS Public Website" 
                  url="eps-workforce.com" 
                  onInspect={() => handleInspect(
                    "Public Website Desktop", 
                    "DESKTOP VIEWPORT", 
                    <PublicWebsite />, 
                    "Full marketing homepage featuring hero, partner logos, KPI metrics, featured job cards, and workflow timeline."
                  )}
                >
                  <PublicWebsite />
                </BrowserFrame>
              </div>

              {/* 2. Candidate Dashboard */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 px-1">
                  <span className="font-bold text-blue-600">02. CANDIDATE SAAS PORTAL</span>
                  <span>91% Match Gauge & Intelligence</span>
                </div>
                <BrowserFrame 
                  title="Candidate Portal" 
                  url="eps-workforce.com/candidate/dashboard" 
                  onInspect={() => handleInspect(
                    "Candidate Dashboard Desktop", 
                    "DESKTOP SAAS", 
                    <CandidateDashboard />, 
                    "Candidate portal with circular 91% AI match score gauge, recommended jobs, resume score, and skill gap recommendations."
                  )}
                >
                  <CandidateDashboard />
                </BrowserFrame>
              </div>

              {/* 3. Company Dashboard */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 px-1">
                  <span className="font-bold text-blue-600">03. EMPLOYER & COMPANY PORTAL</span>
                  <span>Talent Matching & Pipeline</span>
                </div>
                <BrowserFrame 
                  title="Company Hiring Portal" 
                  url="eps-workforce.com/company/dashboard" 
                  onInspect={() => handleInspect(
                    "Company Dashboard Desktop", 
                    "DESKTOP SAAS", 
                    <CompanyDashboard />, 
                    "Employer dashboard with hiring metrics (8 open jobs, 127 applications), candidate match cards, and recent applications table."
                  )}
                >
                  <CompanyDashboard />
                </BrowserFrame>
              </div>

              {/* 4. Admin Dashboard */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 px-1">
                  <span className="font-bold text-blue-600">04. SUPER ADMIN PLATFORM</span>
                  <span>Platform Overview & Telemetry</span>
                </div>
                <BrowserFrame 
                  title="Admin Platform Control" 
                  url="eps-workforce.com/admin/telemetry" 
                  onInspect={() => handleInspect(
                    "Admin Dashboard Desktop", 
                    "SUPER ADMIN", 
                    <AdminDashboard />, 
                    "Super admin portal showcasing 2,845 total users, 532 companies, 8,421 jobs, SVG multi-series growth analytics, and audit log."
                  )}
                >
                  <AdminDashboard />
                </BrowserFrame>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 03: NATIVE MOBILE SUITE */}
        {(activeTab === 'all' || activeTab === 'mobile') && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <SectionTitle 
              number="03" 
              title="Native Mobile Suite (4 Device Viewports)" 
              subtitle="Bottom-row mobile applications rendered inside realistic iPhone device frames."
              tag="MOBILE ECOSYSTEM"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* 1. Public Mobile */}
              <div className="space-y-3 text-center">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">01. Public Mobile</span>
                <PhoneFrame 
                  title="Public Mobile" 
                  onInspect={() => handleInspect(
                    "Public Website Mobile", 
                    "MOBILE VIEWPORT", 
                    <div className="max-w-xs mx-auto py-4"><PublicMobile /></div>, 
                    "Native mobile homepage layout with hero search and stats."
                  )}
                >
                  <PublicMobile />
                </PhoneFrame>
              </div>

              {/* 2. Candidate Mobile */}
              <div className="space-y-3 text-center">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">02. Candidate App</span>
                <PhoneFrame 
                  title="Candidate App" 
                  onInspect={() => handleInspect(
                    "Candidate Mobile App", 
                    "MOBILE APP", 
                    <div className="max-w-xs mx-auto py-4"><CandidateMobile /></div>, 
                    "Candidate mobile app with 91% match gauge and bottom nav bar."
                  )}
                >
                  <CandidateMobile />
                </PhoneFrame>
              </div>

              {/* 3. Company Mobile */}
              <div className="space-y-3 text-center">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">03. Company App</span>
                <PhoneFrame 
                  title="Company App" 
                  onInspect={() => handleInspect(
                    "Company Mobile App", 
                    "MOBILE APP", 
                    <div className="max-w-xs mx-auto py-4"><CompanyMobile /></div>, 
                    "Employer mobile app with 8 open jobs, 127 applications, and shortlisted candidate feed."
                  )}
                >
                  <CompanyMobile />
                </PhoneFrame>
              </div>

              {/* 4. Admin Mobile */}
              <div className="space-y-3 text-center">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">04. Admin App</span>
                <PhoneFrame 
                  title="Admin App" 
                  onInspect={() => handleInspect(
                    "Admin Mobile App", 
                    "MOBILE APP", 
                    <div className="max-w-xs mx-auto py-4"><AdminMobile /></div>, 
                    "Super admin mobile app showing telemetry stats and audit logs."
                  )}
                >
                  <AdminMobile />
                </PhoneFrame>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 04: AI INTELLIGENCE MODULES */}
        {(activeTab === 'all' || activeTab === 'modules') && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <SectionTitle 
              number="04" 
              title="Specialized AI Modules & Extended Screens" 
              subtitle="Deep-dive components showcasing AI resume parsing, automated interview telemetry, enterprise SSO, and pricing tiers."
              tag="AI CAPABILITIES"
            />
            <AIModulesShowcase />
          </section>
        )}

        {/* Showcase Footer */}
        <footer className="border-t border-gray-200/80 pt-12 pb-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold">
            <span>EPS Workforce Solutions • Behance Showcase & Case Study</span>
          </div>
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            Designed for 4K high-fidelity presentation, production readiness, and component reusability across web and native mobile platforms.
          </p>
        </footer>

      </div>

      {/* Screen Inspector Modal */}
      <ModalInspector screen={inspectedScreen} onClose={() => setInspectedScreen(null)} />

    </div>
  )
}
