import React from 'react'
import { Lock, Maximize2, RefreshCw } from 'lucide-react'

export const BrowserFrame = ({ title = "EPS Workforce Solutions", url = "eps-workforce.com", children, onInspect }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_24px_50px_-10px_rgba(37,99,235,0.12)] group">
      {/* Browser Bar Header */}
      <div className="bg-slate-100/90 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Mac Traffic Lights */}
        <div className="flex items-center gap-2 w-16">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/30"></div>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-xl bg-white border border-gray-200 rounded-lg px-3 py-1 flex items-center gap-2 text-xs text-gray-500 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-mono text-gray-800 font-medium">https://{url}</span>
          <span className="ml-auto text-[10px] text-gray-400">SSL Secured</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onInspect && (
            <button 
              onClick={onInspect}
              className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 font-semibold px-2.5 py-1 rounded-md border border-blue-200 transition opacity-80 group-hover:opacity-100"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Inspect</span>
            </button>
          )}
        </div>
      </div>

      {/* Screen Body */}
      <div className="relative bg-[#F8FAFC]">
        {children}
      </div>
    </div>
  )
}
