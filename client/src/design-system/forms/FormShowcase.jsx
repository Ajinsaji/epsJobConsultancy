import React from 'react'
import { Search, Filter, ChevronDown, Mail, Lock } from 'lucide-react'

export const FormShowcase = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Form Control Elements & Search Inputs</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Search Bar with Filter Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">Combined Search Input Bar</label>
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition">
            <Search className="w-4 h-4 text-gray-400 ml-2.5" />
            <input 
              type="text"
              readOnly
              value="Full Stack React Developer"
              className="bg-transparent text-sm text-gray-900 px-2 py-1.5 focus:outline-none w-full font-medium"
            />
            <div className="flex items-center gap-1 border-l border-gray-200 pl-2 pr-1">
              <button className="flex items-center gap-1 text-xs text-gray-600 font-medium hover:text-gray-900 px-2 py-1 rounded bg-white border border-gray-200 shadow-2xs">
                <Filter className="w-3 h-3" />
                <span>Filters</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Label / Icon Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">Standard Form Text Input</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input 
              type="email"
              readOnly
              value="recruiter@eps-workforce.com"
              className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-600 shadow-2xs font-medium"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
