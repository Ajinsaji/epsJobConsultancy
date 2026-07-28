import React from 'react'
import { LayoutDashboard, Briefcase, Bookmark, User, Bell, ChevronRight } from 'lucide-react'
import { CircularMatchGauge } from '../../design-system/charts/ChartPrimitives'

export const CandidateMobile = () => {
  return (
    <div className="w-full flex-1 bg-[#F8FAFC] flex flex-col justify-between text-gray-900 font-sans">
      
      {/* Top Header */}
      <div className="bg-white p-3.5 border-b border-gray-100 flex items-center justify-between">
        <span className="font-bold text-xs text-gray-900">Candidate Dashboard</span>
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
          JD
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        
        {/* Match Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center space-y-2">
          <CircularMatchGauge percentage={91} size={85} strokeWidth={7} subtitle="91% Excellent Match" />
          <h4 className="text-xs font-bold text-gray-900">Senior Full Stack React Engineer</h4>
          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            Recommended Today
          </span>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span>Recommended Jobs</span>
            <span className="text-blue-600 text-[10px]">View all</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Frontend Developer</p>
                <p className="text-[10px] text-gray-500">TechCorp • Remote</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">92% Match</span>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Data Analyst</p>
                <p className="text-[10px] text-gray-500">GlobalSoft • Hyderabad</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">85% Match</span>
            </div>
          </div>
        </div>

      </div>

      {/* Native Bottom Bar */}
      <div className="bg-white border-t border-gray-200 py-2 px-4 flex justify-around text-[10px] text-gray-500 font-semibold">
        <div className="flex flex-col items-center text-blue-600">
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center">
          <Briefcase className="w-4 h-4" />
          <span>Jobs</span>
        </div>
        <div className="flex flex-col items-center">
          <Bookmark className="w-4 h-4" />
          <span>Applied</span>
        </div>
        <div className="flex flex-col items-center">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </div>
      </div>

    </div>
  )
}
