import React from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const UXStrategySection = () => {
  const steps = [
    { title: 'Problem', desc: 'Recruitment bottlenecks & manual resume filtering delays hiring by 4+ weeks.' },
    { title: 'Research', desc: 'Interviewed 45 recruiters & 120 software engineers to map pain points.' },
    { title: 'Design Principles', desc: 'Clarity, speed, explainable AI confidence, and zero cognitive clutter.' },
    { title: 'Wireframes', desc: 'Low-fidelity layout validation across multi-tenant enterprise roles.' },
    { title: 'Design System', desc: '8px baseline grid, Inter font hierarchy, 12px radii, accessibility tokens.' },
    { title: 'Desktop & Mobile', desc: '4K ultra-high-resolution viewports with 100% feature parity.' },
    { title: 'Outcome', desc: '65% faster time-to-hire with 98.4% candidate match confidence.' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">UX Strategy & Methodology</span>
          <h4 className="text-lg font-bold text-gray-900">End-to-End Strategic Design Pipeline</h4>
        </div>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded">Behance Framework</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {steps.map((step, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex flex-col justify-between space-y-2 relative">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-blue-600">0{idx + 1}</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">{step.title}</h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
