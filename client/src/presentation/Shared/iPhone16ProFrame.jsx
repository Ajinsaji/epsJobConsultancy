import React from 'react'
import { Wifi, Battery, Signal, Maximize2 } from 'lucide-react'

export const iPhone16ProFrame = ({ title = "iPhone 16 Pro", children, onInspect }) => {
  return (
    <div className="relative mx-auto max-w-[340px] w-full group">
      
      {/* Outer Titanium Bezel Frame */}
      <div className="bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-[48px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_10px_20px_-5px_rgba(37,99,235,0.2)] border-2 border-slate-700/60 relative">
        
        {/* Screen Bezel Window */}
        <div className="bg-[#F8FAFC] rounded-[40px] overflow-hidden flex flex-col min-h-[660px] border border-slate-300 relative shadow-inner">
          
          {/* Status Bar & iPhone 16 Pro Dynamic Island */}
          <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between z-20 border-b border-gray-100/50">
            <span className="text-xs font-bold text-gray-900 font-mono">9:41</span>
            
            {/* Dynamic Island */}
            <div className="w-22 h-4 bg-black rounded-full flex items-center justify-between px-2">
              <div className="w-2 h-2 rounded-full bg-blue-900/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></div>
            </div>

            <div className="flex items-center gap-1 text-gray-800">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 flex flex-col relative overflow-hidden bg-[#F8FAFC]">
            {children}
          </div>

          {/* Home Bar Indicator */}
          <div className="bg-white py-2 flex justify-center z-20 border-t border-gray-100/50">
            <div className="w-28 h-1 bg-gray-300 rounded-full"></div>
          </div>

        </div>

        {/* Hover Inspect Trigger */}
        {onInspect && (
          <button 
            onClick={onInspect}
            className="absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition z-30"
          >
            <Maximize2 className="w-3 h-3" /> Zoom
          </button>
        )}

      </div>

    </div>
  )
}
