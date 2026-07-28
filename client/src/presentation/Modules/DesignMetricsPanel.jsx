import React from 'react'
import { Sliders, Layers } from 'lucide-react'

export const DesignMetricsPanel = () => {
  const metrics = [
    { label: 'Grid System', val: '8px Baseline' },
    { label: 'Border Radius', val: '12px Cards' },
    { label: 'Elevation Levels', val: '4 Shadow Tiers' },
    { label: 'Standard Icons', val: '20px Lucide' },
    { label: 'Primary Font', val: 'Inter Family' },
    { label: 'Accessibility', val: 'WCAG AA 4.5:1' },
    { label: 'Responsiveness', val: '100% Mobile Parity' },
    { label: 'Interface Mode', val: 'Bright Clean Light' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-gray-900">System Design Metrics</h4>
        </div>
        <span className="text-xs font-mono text-gray-500">Measurable Values</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-gray-200">
            <span className="text-[10px] text-gray-500 font-medium block">{m.label}</span>
            <span className="text-xs font-extrabold text-gray-900 mt-0.5 block">{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ComponentStatsPanel = () => {
  const stats = [
    { label: 'Components', count: 92, color: 'text-blue-600' },
    { label: 'Pages', count: 38, color: 'text-gray-900' },
    { label: 'Dashboards', count: 4, color: 'text-blue-600' },
    { label: 'Mobile Screens', count: 18, color: 'text-emerald-600' },
    { label: 'Tables', count: 12, color: 'text-gray-900' },
    { label: 'Charts', count: 15, color: 'text-blue-600' },
    { label: 'Forms', count: 26, color: 'text-purple-600' },
    { label: 'AI Widgets', count: 14, color: 'text-emerald-600' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          <h4 className="text-sm font-bold text-gray-900">Component Scale & Statistics</h4>
        </div>
        <span className="text-xs font-mono text-gray-500">Production Assets</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-gray-200 text-center space-y-1">
            <p className={`text-2xl font-extrabold ${st.color}`}>{st.count}</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{st.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
