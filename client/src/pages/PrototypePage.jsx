import React, { useState } from 'react'
import { Play, Monitor, Smartphone, Sparkles, Layers } from 'lucide-react'
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

export const PrototypePage = () => {
  const [activeScreen, setActiveScreen] = useState('candidate-desktop')

  const screens = [
    { id: 'public-desktop', label: 'Public Website (Desktop)', type: 'desktop', component: <PublicWebsite /> },
    { id: 'candidate-desktop', label: 'Candidate Portal (Desktop)', type: 'desktop', component: <CandidateDashboard /> },
    { id: 'company-desktop', label: 'Company Portal (Desktop)', type: 'desktop', component: <CompanyDashboard /> },
    { id: 'admin-desktop', label: 'Admin Portal (Desktop)', type: 'desktop', component: <AdminDashboard /> },
    { id: 'public-mobile', label: 'Public Website (Mobile)', type: 'mobile', component: <PublicMobile /> },
    { id: 'candidate-mobile', label: 'Candidate App (Mobile)', type: 'mobile', component: <CandidateMobile /> },
    { id: 'company-mobile', label: 'Company App (Mobile)', type: 'mobile', component: <CompanyMobile /> },
    { id: 'admin-mobile', label: 'Admin App (Mobile)', type: 'mobile', component: <AdminMobile /> },
  ]

  const current = screens.find(s => s.id === activeScreen)

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      
      {/* Top Prototype Controls */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded flex items-center gap-1">
            <Play className="w-3.5 h-3.5 fill-current" /> PROTOTYPE VIEW
          </span>
          <h2 className="text-sm font-bold text-white">EPS Workforce Solutions</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {screens.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeScreen === s.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 bg-[#0F172A] p-8 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-6xl">
          {current.type === 'desktop' ? (
            <MacBookFrame title={current.label} url="eps-workforce.com">
              {current.component}
            </MacBookFrame>
          ) : (
            <iPhone16ProFrame title={current.label}>
              {current.component}
            </iPhone16ProFrame>
          )}
        </div>
      </div>

    </div>
  )
}
