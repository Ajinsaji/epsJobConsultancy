import React, { useState, useEffect } from 'react'
import { Layers, Bookmark, Monitor, Smartphone, Cpu, Activity, Award, FileText, CheckCircle2 } from 'lucide-react'

export const FigmaNavRail = () => {
  const [activeSection, setActiveSection] = useState('overview')

  const items = [
    { id: 'overview', label: 'Overview' },
    { id: 'summary', label: 'Executive Summary' },
    { id: 'strategy', label: 'UX Strategy' },
    { id: 'journeys', label: 'User Journeys' },
    { id: 'ecosystem', label: 'Product Ecosystem' },
    { id: 'design-system', label: 'Design System' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'states', label: 'Production States' },
    { id: 'desktop', label: 'Desktop Suite' },
    { id: 'mobile', label: 'Mobile Suite' },
    { id: 'ai', label: 'AI Intelligence' },
    { id: 'motion', label: 'Motion & FX' },
    { id: 'vision', label: 'Vision & CTA' },
  ]

  const scrollTo = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-gray-200 shadow-xl text-xs font-semibold">
      <div className="px-2 py-1 border-b border-gray-100 mb-1 text-[10px] text-gray-400 font-mono font-bold uppercase">
        Figma Rail
      </div>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition ${
            activeSection === item.id 
              ? 'bg-blue-600 text-white shadow-2xs font-bold' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? 'bg-white' : 'bg-gray-300'}`}></div>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
