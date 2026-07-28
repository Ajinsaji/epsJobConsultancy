import React from 'react'
import { Users, Briefcase, TrendingUp, Sparkles, Building2, MapPin, DollarSign } from 'lucide-react'

export const CardShowcase = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Card System & Metric Containers</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* KPI Metric Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Active Candidates</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-gray-900">15,420</h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Updated 5m ago</p>
        </div>

        {/* AI Highlight Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">AI Intelligence</span>
          </div>
          <h4 className="text-sm font-bold text-gray-900 mt-2">Semantic Resume Analysis</h4>
          <p className="text-xs text-gray-600 mt-1">Automatic extraction of 24+ core developer competencies with 99.4% precision.</p>
        </div>

        {/* Featured Job Card Specimen */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                TC
              </div>
              <div>
                <h5 className="text-sm font-bold text-gray-900">Senior React Engineer</h5>
                <p className="text-xs text-gray-500">TechCorp Inc.</p>
              </div>
            </div>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Remote</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> San Francisco</span>
            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> $140k - $170k</span>
          </div>
        </div>

      </div>
    </div>
  )
}
