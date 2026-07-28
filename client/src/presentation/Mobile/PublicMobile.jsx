import React from 'react'
import { Search, Sparkles, Menu, ArrowRight } from 'lucide-react'

export const PublicMobile = () => {
  return (
    <div className="w-full flex-1 bg-white flex flex-col text-gray-900 font-sans">
      
      {/* Mobile Top Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
            EPS
          </div>
          <span className="font-extrabold text-sm text-gray-900">EPS WORKFORCE</span>
        </div>
        <Menu className="w-5 h-5 text-gray-700" />
      </div>

      {/* Hero Body */}
      <div className="p-5 space-y-5 flex-1 overflow-y-auto">
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold">
          <Sparkles className="w-3 h-3" /> Next-Gen AI Recruitment
        </span>

        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
          Smarter Workforce. <br /><span className="text-blue-600">Stronger Tomorrow.</span>
        </h2>

        <p className="text-xs text-gray-600 leading-relaxed">
          Connect talent with opportunities using deep AI parsing and semantic matching.
        </p>

        {/* Search */}
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400 ml-1" />
          <input 
            type="text" 
            readOnly 
            value="Search jobs, candidates..." 
            className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg shadow-xs text-center">
            Find Jobs
          </button>
          <button className="bg-slate-100 text-gray-800 text-xs font-bold py-2.5 rounded-lg text-center">
            Post a Job
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-100 text-center">
            <p className="text-sm font-bold text-blue-600">15K+</p>
            <p className="text-[9px] text-gray-500 font-semibold">Candidates</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-100 text-center">
            <p className="text-sm font-bold text-blue-600">2.5K+</p>
            <p className="text-[9px] text-gray-500 font-semibold">Companies</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-100 text-center">
            <p className="text-sm font-bold text-emerald-600">98%</p>
            <p className="text-[9px] text-gray-500 font-semibold">Success</p>
          </div>
        </div>

      </div>

    </div>
  )
}
