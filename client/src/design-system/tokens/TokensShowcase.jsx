import React from 'react'
import { Check, Layers, Sliders, ShieldCheck } from 'lucide-react'

export const TokensShowcase = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Specifications</span>
          <h4 className="text-lg font-bold text-gray-900">Design Tokens & Spatial System</h4>
        </div>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">8px Baseline Grid</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* 8px Spacing Specimen */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">8px Spacing Grid</span>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between p-2 bg-blue-50/70 rounded text-blue-900">
              <span>xs (4px)</span> <div className="w-1 h-4 bg-blue-600 rounded-xs"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50/70 rounded text-blue-900">
              <span>sm (8px)</span> <div className="w-2 h-4 bg-blue-600 rounded-xs"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50/70 rounded text-blue-900">
              <span>md (16px)</span> <div className="w-4 h-4 bg-blue-600 rounded-xs"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50/70 rounded text-blue-900">
              <span>lg (24px)</span> <div className="w-6 h-4 bg-blue-600 rounded-xs"></div>
            </div>
          </div>
        </div>

        {/* Corner Radii Specimen */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Border Radius Scale</span>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-center">
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-sm">sm (4px)</div>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">md (8px)</div>
            <div className="p-3 bg-blue-50 border border-blue-300 rounded-xl font-bold text-blue-700">lg (12px)</div>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-2xl">xl (16px)</div>
          </div>
        </div>

        {/* Elevation / Shadows */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Elevation & Shadows</span>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-white rounded-lg shadow-xs border border-gray-100 text-gray-700">Shadow Subtle</div>
            <div className="p-2 bg-white rounded-lg shadow-md border border-gray-100 text-gray-900 font-semibold">Shadow Card</div>
            <div className="p-2 bg-white rounded-lg shadow-xl border border-gray-100 text-blue-700 font-bold">Shadow Floating</div>
          </div>
        </div>

        {/* Avatar Scale */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Avatar Scale</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">JD</div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">PS</div>
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center shadow-md">AS</div>
          </div>
        </div>

      </div>
    </div>
  )
}
