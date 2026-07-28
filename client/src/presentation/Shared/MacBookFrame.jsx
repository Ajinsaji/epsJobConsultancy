import React from 'react'
import { Lock, Maximize2 } from 'lucide-react'

export const MacBookFrame = ({ title = "EPS Workforce Solutions", url = "eps-workforce.com", children, onInspect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto my-6 relative group">
      
      {/* MacBook Pro Display Housing */}
      <div className="bg-slate-900 rounded-t-[20px] p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3),0_10px_25px_-5px_rgba(37,99,235,0.15)] border-t border-slate-700">
        
        {/* Top Notch & Camera Web Panel */}
        <div className="bg-black text-slate-400 text-[10px] px-4 py-1.5 rounded-t-[14px] flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          
          {/* MacBook Notch */}
          <div className="w-24 h-3 bg-black rounded-b-md mx-auto -mt-1 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1E293B] border border-slate-800"></div>
          </div>

          <div className="flex items-center gap-2">
            {onInspect && (
              <button 
                onClick={onInspect}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] px-2 py-0.5 rounded transition flex items-center gap-1"
              >
                <Maximize2 className="w-2.5 h-2.5" /> Inspect
              </button>
            )}
          </div>
        </div>

        {/* Display Screen Content */}
        <div className="bg-[#F8FAFC] rounded-b-[10px] overflow-hidden border border-slate-800 relative">
          {/* Browser Address Bar Sub-Header */}
          <div className="bg-slate-100/90 border-b border-gray-200 px-4 py-1.5 flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span className="font-mono text-gray-700 text-[11px]">https://{url}</span>
            <span className="ml-auto text-[10px] text-gray-400 font-sans">macOS Monterey • EPS SaaS</span>
          </div>

          {children}
        </div>

      </div>

      {/* MacBook Aluminum Base Stand */}
      <div className="relative bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 h-3 rounded-b-xl max-w-[calc(100%+24px)] -ml-[12px] shadow-lg flex justify-center items-center">
        <div className="w-16 h-1 bg-slate-600/40 rounded-b-md"></div>
      </div>

    </div>
  )
}
