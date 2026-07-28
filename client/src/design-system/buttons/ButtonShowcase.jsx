import React from 'react'
import { Sparkles, ArrowRight, Search, Download, CheckCircle, RefreshCw } from 'lucide-react'

export const ButtonShowcase = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Button Variants & Action States</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Primary Buttons */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Primary Actions</p>
          <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 text-sm">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm text-xs flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Score</span>
          </button>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Secondary & Soft</p>
          <button className="w-full bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-medium px-4 py-2.5 rounded-lg transition text-sm flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search Talent</span>
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Outline & Ghost */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Outline & Ghost</p>
          <button className="w-full border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium px-4 py-2.5 rounded-lg transition text-sm flex items-center justify-center gap-2">
            <span>View Details</span>
          </button>
          <button className="w-full hover:bg-gray-100 text-gray-600 font-medium px-4 py-2 rounded-lg transition text-xs flex items-center justify-center gap-1.5">
            <span>Dismiss</span>
          </button>
        </div>

        {/* Status & Badge Buttons */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Badges & Status</p>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold w-full justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>91% Excellent Match</span>
          </div>
          <button disabled className="w-full bg-gray-100 text-gray-400 font-medium px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-not-allowed">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Analyzing Resume...</span>
          </button>
        </div>
      </div>
    </div>
  )
}
