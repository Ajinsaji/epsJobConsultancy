import React from 'react'
import { Sparkles, Building, Users, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const ExecutiveSummary = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 p-6 md:p-8 rounded-2xl border border-blue-100 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Executive Overview
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-2">EPS Workforce Solutions</h2>
          <p className="text-xs text-gray-600 mt-0.5">Enterprise AI Recruitment SaaS Platform</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200">
            Cloud Native
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-lg border border-blue-200">
            Semantic AI
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Platform Mission</h4>
          <p className="text-sm text-gray-800 leading-relaxed font-medium">
            Build an end-to-end AI-powered hiring ecosystem connecting candidates, employers, and administrators through automated resume intelligence, semantic skill matching, and real-time recruitment telemetry.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs text-center">
            <p className="text-xl font-extrabold text-blue-600">15,000+</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase">Candidates</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs text-center">
            <p className="text-xl font-extrabold text-gray-900">500+</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase">Companies</p>
          </div>
        </div>
      </div>
    </div>
  )
}
