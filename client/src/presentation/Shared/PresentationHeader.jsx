import React from 'react'
import { Sparkles, Layers, LayoutGrid, Monitor, Smartphone, Cpu, CheckCircle2, Award } from 'lucide-react'

export const PresentationHeader = ({ activeTab, setActiveTab, zoomLevel, setZoomLevel }) => {
  const tabs = [
    { id: 'all', label: 'Full Case Study', icon: LayoutGrid },
    { id: 'desktop', label: 'Desktop Suite', icon: Monitor },
    { id: 'mobile', label: 'Mobile Native Suite', icon: Smartphone },
    { id: 'design-system', label: 'Design System', icon: Layers },
    { id: 'modules', label: 'AI Intelligence Modules', icon: Cpu },
  ]

  return (
    <div className="w-full bg-gradient-to-b from-white via-white to-blue-50/30 border-b border-gray-200/80 pt-10 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200/80 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>EPS Workforce Solutions</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span>Enterprise Design System v2.0</span>
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
            4K Ultra-HD Ready
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            Desktop & Mobile Responsive Parity
          </span>
        </div>

        {/* Hero Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Enterprise AI Recruitment Platform
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl font-normal leading-relaxed">
              A unified, multi-tenant hiring SaaS ecosystem powered by semantic resume parsing, candidate match scoring, automated interview pipelines, and real-time administrative intelligence.
            </p>
          </div>

          {/* Quick Stats Summary Banner */}
          <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
            <div>
              <span className="text-xs text-gray-500 font-medium block">Total Viewports</span>
              <span className="text-xl font-bold text-gray-900">8 Screens</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Match Gauge</span>
              <span className="text-xl font-bold text-emerald-600">91% AI Precision</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Components</span>
              <span className="text-xl font-bold text-blue-600">50+ Tokens</span>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/80 pt-6">
          <div className="flex flex-wrap items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-sm border border-gray-200/60' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Zoom Level Switcher */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs text-xs">
            <span className="text-gray-500 font-medium">Zoom Scale:</span>
            {[75, 100, 125].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setZoomLevel(lvl)}
                className={`px-2 py-0.5 rounded font-mono font-bold transition ${
                  zoomLevel === lvl ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lvl}%
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
