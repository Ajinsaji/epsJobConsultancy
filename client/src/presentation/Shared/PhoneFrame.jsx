import React from 'react'
import { Wifi, Battery, Signal, Maximize2 } from 'lucide-react'

export const PhoneFrame = ({ title = "Mobile App", children, onInspect }) => {
  return (
    <div className="relative mx-auto max-w-[340px] w-full bg-slate-900 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25),0_10px_20px_-5px_rgba(37,99,235,0.15)] border-4 border-slate-800 transition-all duration-300 hover:scale-[1.01] group">
      
      {/* Device Outer Frame Content */}
      <div className="relative bg-[#F8FAFC] rounded-[36px] overflow-hidden flex flex-col min-h-[640px] border border-slate-200">
        
        {/* Status Bar & Dynamic Island */}
        <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between z-20 border-b border-gray-100/50">
          <span className="text-xs font-semibold text-gray-900 font-mono">9:41</span>
          
          {/* Dynamic Island */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-900/50 mr-2"></div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-800">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#F8FAFC]">
          {children}
        </div>

        {/* Home Bar Indicator */}
        <div className="bg-white py-2 flex justify-center z-20 border-t border-gray-100/50">
          <div className="w-28 h-1 bg-gray-300 rounded-full"></div>
        </div>

      </div>

      {/* Inspect Trigger overlay on hover */}
      {onInspect && (
        <button 
          onClick={onInspect}
          className="absolute top-6 right-6 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-30"
        >
          <Maximize2 className="w-3 h-3" />
          <span>Zoom</span>
        </button>
      )}

    </div>
  )
}
