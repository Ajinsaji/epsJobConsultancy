import React from 'react'
import { Building2, Briefcase, Users, MoreHorizontal, Search } from 'lucide-react'

export const CompanyMobile = () => {
  return (
    <div className="w-full flex-1 bg-[#F8FAFC] flex flex-col justify-between text-gray-900 font-sans">
      
      {/* Header */}
      <div className="bg-white p-3.5 border-b border-gray-100 flex items-center justify-between">
        <span className="font-bold text-xs text-gray-900">Employer Hiring Dashboard</span>
        <Search className="w-4 h-4 text-gray-500" />
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        
        {/* Metric Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium">Open Jobs</p>
            <p className="text-base font-extrabold text-gray-900">8</p>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium">Applicants</p>
            <p className="text-base font-extrabold text-blue-600">127</p>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium">Shortlisted</p>
            <p className="text-base font-extrabold text-emerald-600">24</p>
          </div>
        </div>

        {/* Recent Applications Feed */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
          <span className="text-xs font-bold text-gray-900 block">Recent Applications</span>
          
          <div className="space-y-2 text-xs">
            {[
              { name: 'John Doe', role: 'Frontend Developer', status: 'New', statusBg: 'bg-blue-50 text-blue-700' },
              { name: 'Priya Sharma', role: 'UI/UX Designer', status: 'Shortlisted', statusBg: 'bg-emerald-50 text-emerald-700' },
              { name: 'Michael Johnson', role: 'Full Stack Dev', status: 'Interview', statusBg: 'bg-amber-50 text-amber-700' },
            ].map((app, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center">
                    {app.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 leading-none">{app.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{app.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${app.statusBg}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-gray-200 py-2 px-4 flex justify-around text-[10px] text-gray-500 font-semibold">
        <div className="flex flex-col items-center text-blue-600">
          <Building2 className="w-4 h-4" />
          <span>Dashboard</span>
        </div>
        <div className="flex flex-col items-center">
          <Briefcase className="w-4 h-4" />
          <span>Jobs</span>
        </div>
        <div className="flex flex-col items-center">
          <Users className="w-4 h-4" />
          <span>Candidates</span>
        </div>
        <div className="flex flex-col items-center">
          <MoreHorizontal className="w-4 h-4" />
          <span>More</span>
        </div>
      </div>

    </div>
  )
}
