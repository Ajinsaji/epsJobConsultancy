import React from 'react'

export const ColorShowcase = () => {
  const swatches = [
    { name: 'Primary Blue', hex: '#2563EB', role: 'Main Brand CTA & Active States', class: 'bg-[#2563EB]', text: 'text-white' },
    { name: 'Secondary Blue', hex: '#3B82F6', role: 'Highlights & Accents', class: 'bg-[#3B82F6]', text: 'text-white' },
    { name: 'Background Slate', hex: '#F8FAFC', role: 'App & Canvas Surface', class: 'bg-[#F8FAFC]', text: 'text-gray-900', border: true },
    { name: 'Card Surface', hex: '#FFFFFF', role: 'Containers & Modals', class: 'bg-white', text: 'text-gray-900', border: true },
    { name: 'Border Gray', hex: '#E5E7EB', role: 'Subtle Dividers & Outlines', class: 'bg-[#E5E7EB]', text: 'text-gray-900' },
    { name: 'Text Dark', hex: '#111827', role: 'Headings & Main Body', class: 'bg-[#111827]', text: 'text-white' },
    { name: 'Secondary Text', hex: '#6B7280', role: 'Subtitles & Meta Info', class: 'bg-[#6B7280]', text: 'text-white' },
    { name: 'Success Green', hex: '#16A34A', role: 'High AI Matches & Positive Metrics', class: 'bg-[#16A34A]', text: 'text-white' },
    { name: 'Warning Amber', hex: '#F59E0B', role: 'Pending Actions & Moderate Scores', class: 'bg-[#F59E0B]', text: 'text-white' },
    { name: 'Danger Red', hex: '#DC2626', role: 'Alerts & Skill Gaps', class: 'bg-[#DC2626]', text: 'text-white' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {swatches.map((swatch, idx) => (
        <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className={`h-16 w-full rounded-lg ${swatch.class} ${swatch.border ? 'border border-gray-200' : ''} flex items-end p-2 mb-2`}>
            <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-black/20 ${swatch.text}`}>
              {swatch.hex}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{swatch.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{swatch.role}</p>
        </div>
      ))}
    </div>
  )
}
