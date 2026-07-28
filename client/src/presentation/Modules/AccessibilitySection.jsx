import React from 'react'
import { ShieldCheck, Monitor, Smartphone, Tablet } from 'lucide-react'

export const AccessibilitySection = () => {
  const items = [
    { title: 'WCAG AA Contrast', desc: 'Minimum 4.5:1 text-to-background contrast ratio across all light themes.' },
    { title: 'Keyboard Nav', desc: '100% accessible focus ring highlights and logical tabIndex sequencing.' },
    { title: 'ARIA Screen Readers', desc: 'Descriptive aria-labels, role attributes, and screen-reader status regions.' },
    { title: 'Semantic HTML5', desc: 'Nav, Header, Main, Aside, Section, and Article elements strictly enforced.' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-sm font-bold text-gray-900">Accessibility & Inclusivity (WCAG 2.1 AA)</h4>
        </div>
        <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded font-bold">100% Compliant</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-gray-200 space-y-1">
            <h5 className="font-bold text-xs text-gray-900">{it.title}</h5>
            <p className="text-[11px] text-gray-500 leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const BreakpointDiagram = () => {
  const bps = [
    { name: 'Desktop (4K/HD)', px: '1920px', cols: '12 Columns' },
    { name: 'Laptop Pro', px: '1440px', cols: '12 Columns' },
    { name: 'Tablet Landscape', px: '1024px', cols: '8 Columns' },
    { name: 'Mobile Native', px: '390px', cols: '4 Columns' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h4 className="text-sm font-bold text-gray-900">Responsive Grid & Breakpoint Scale</h4>
        <span className="text-xs font-mono text-gray-500">Adaptive Layout Architecture</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        {bps.map((bp, idx) => (
          <div key={idx} className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
            <span className="text-xs font-bold text-gray-900 block">{bp.name}</span>
            <span className="text-lg font-extrabold text-blue-600 block">{bp.px}</span>
            <span className="text-[10px] text-gray-500 font-mono block">{bp.cols}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
