import React from 'react'
import { User, Building, ShieldCheck, Cpu, AlertCircle, RefreshCw, CheckCircle2, WifiOff } from 'lucide-react'

export const ProductEcosystemMap = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Topology</span>
          <h4 className="text-lg font-bold text-gray-900">Multi-Tenant Product Ecosystem Architecture</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Candidate Node */}
        <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
          <User className="w-6 h-6 text-blue-600 mx-auto" />
          <h5 className="font-bold text-xs text-gray-900">Candidates Portal</h5>
          <p className="text-[11px] text-gray-600">Resume upload, AI skill scoring, role matching, applications.</p>
        </div>

        {/* Core EPS Engine */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2 shadow-lg">
          <Cpu className="w-6 h-6 text-blue-400 mx-auto animate-pulse" />
          <h5 className="font-bold text-xs text-white">EPS Core AI Platform</h5>
          <p className="text-[11px] text-slate-300">Semantic engine, match calculation, telemetry & routing.</p>
        </div>

        {/* Company Node */}
        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-2">
          <Building className="w-6 h-6 text-emerald-600 mx-auto" />
          <h5 className="font-bold text-xs text-gray-900">Companies Portal</h5>
          <p className="text-[11px] text-gray-600">Job posting, AI candidate shortlisting, interview pipeline.</p>
        </div>
      </div>
    </div>
  )
}

export const ProductionStatesSpecimen = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h4 className="text-lg font-bold text-gray-900">Production Interface States</h4>
        <span className="text-xs font-mono text-gray-500">Zero Placeholders</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        
        {/* Empty State */}
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-gray-400 mx-auto" />
          <p className="font-bold text-gray-900">Empty State Specimen</p>
          <p className="text-[10px] text-gray-500">No applications saved yet.</p>
        </div>

        {/* Loading State */}
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 text-center space-y-2">
          <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
          <p className="font-bold text-gray-900">Loading Skeleton</p>
          <p className="text-[10px] text-blue-600 font-semibold">Parsing Resume...</p>
        </div>

        {/* Success Confirmation */}
        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-center space-y-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
          <p className="font-bold text-emerald-900">Success Confirmation</p>
          <p className="text-[10px] text-emerald-700">Interview Scheduled!</p>
        </div>

        {/* Offline Fallback */}
        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-center space-y-2">
          <WifiOff className="w-6 h-6 text-amber-600 mx-auto" />
          <p className="font-bold text-amber-900">Offline Resilience</p>
          <p className="text-[10px] text-amber-700">Cached Data Available</p>
        </div>

      </div>
    </div>
  )
}
