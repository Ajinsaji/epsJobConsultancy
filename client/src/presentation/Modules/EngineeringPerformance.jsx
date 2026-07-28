import React from 'react'
import { Code, CheckCircle2, Award, HeartHandshake } from 'lucide-react'

export const EngineeringPerformance = () => {
  const stack = [
    { name: 'React 18', desc: 'Component Architecture' },
    { name: 'Vite 5', desc: 'Sub-second HMR Build' },
    { name: 'Tailwind CSS 3.4', desc: 'Utility Design System' },
    { name: 'Atomic Design', desc: 'Reusable Primitive Specs' },
    { name: 'Modern SVG Charts', desc: 'Crisp Vector Telemetry' },
    { name: 'WCAG AA Accessibility', desc: 'Inclusive Standard' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-gray-900">Engineering Stack & Performance Metrics</h4>
        </div>
        <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded font-bold">Production Tech</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stack.map((st, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-900 block">{st.name}</span>
            <span className="text-[10px] text-gray-500 block">{st.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ProjectTimeline = () => {
  const steps = [
    'Research', 'Wireframes', 'Design System', 'Desktop UI', 
    'Mobile UI', 'AI Modules', 'Prototype', 'Implementation', 'Launch'
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">Project Evolution Roadmap</h4>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {steps.map((st, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
              {st}
            </span>
            {idx < steps.length - 1 && <span className="text-gray-300">→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export const FinalCTASlide = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-10 md:p-16 text-center space-y-6 shadow-2xl border border-slate-800">
      <span className="inline-flex items-center gap-2 bg-blue-600/30 text-blue-300 border border-blue-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
        <HeartHandshake className="w-4 h-4 text-yellow-400" /> Version 1.0 Milestone
      </span>

      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
        Thank You
      </h2>

      <p className="text-lg md:text-xl text-slate-300 font-normal max-w-xl mx-auto">
        EPS Workforce Solutions • Enterprise AI Recruitment Platform
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold pt-2">
        <span className="bg-white/10 text-white px-4 py-2 rounded-xl border border-white/20">Designed for Candidates</span>
        <span className="bg-white/10 text-white px-4 py-2 rounded-xl border border-white/20">Designed for Companies</span>
        <span className="bg-white/10 text-white px-4 py-2 rounded-xl border border-white/20">Designed for Administrators</span>
        <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-xl border border-emerald-500/40">Ready for Production</span>
      </div>
    </div>
  )
}
