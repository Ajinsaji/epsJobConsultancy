import React from 'react'
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react'

export const ModalInspector = ({ screen, onClose }) => {
  if (!screen) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
              {screen.category || 'VIEWPORT'}
            </span>
            <h3 className="text-lg font-bold text-white">{screen.title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Viewport Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto shadow-xl rounded-xl overflow-hidden bg-white border border-gray-200">
            {screen.component}
          </div>
        </div>

        {/* Modal Footer Description */}
        <div className="bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between text-xs text-gray-600">
          <p>{screen.description || 'Ultra-high-fidelity EPS Workforce Solutions UI component specimen.'}</p>
          <button 
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-1.5 rounded-lg transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  )
}
