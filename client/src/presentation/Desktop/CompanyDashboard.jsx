import React from 'react'
import { 
  Building2, Briefcase, Users, FileCheck, MessageSquare, BarChart2, 
  Settings, Search, Plus, Filter, Sparkles, ChevronRight, CheckCircle2 
} from 'lucide-react'

export const CompanyDashboard = () => {
  return (
    <div className="flex min-h-[700px] w-full bg-[#F8FAFC] text-gray-900 font-sans">
      
      {/* 1. Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              EPS
            </div>
            <span className="font-extrabold text-sm tracking-tight text-gray-900">COMPANY PORTAL</span>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { label: 'Dashboard', icon: Building2, active: true },
              { label: 'Jobs', icon: Briefcase, badge: '8' },
              { label: 'Candidates', icon: Users },
              { label: 'Applications', icon: FileCheck, badge: '127' },
              { label: 'AI Matching', icon: Sparkles },
              { label: 'Interviews', icon: BarChart2 },
              { label: 'Messages', icon: MessageSquare },
              { label: 'Settings', icon: Settings },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600 font-bold' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600 font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            TC
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">TechCorp Inc.</p>
            <p className="text-[10px] text-gray-500">Enterprise Plan</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">HI, EPS Tech Solutions</h2>
            <p className="text-xs text-gray-500">Manage your hiring and find the right talent faster.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-2xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Job</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Top KPI Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Open Jobs</span>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <button className="text-[11px] font-semibold text-blue-600">View →</button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Applications</span>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <button className="text-[11px] font-semibold text-blue-600">View →</button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Shortlisted</span>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <button className="text-[11px] font-semibold text-blue-600">View →</button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Hired</span>
              <p className="text-2xl font-bold text-emerald-600">5</p>
              <button className="text-[11px] font-semibold text-blue-600">View →</button>
            </div>
          </div>

          {/* AI Recommended Candidates Grid */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-gray-900">Top Recommended Candidates</h4>
              </div>
              <span className="text-xs text-gray-500 font-mono">Semantic Score Filter &gt; 85%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Asha Sharma', role: 'UI/UX Designer', match: '92%', bg: 'bg-indigo-600' },
                { name: 'Rohan Mehta', role: 'Frontend Developer', match: '89%', bg: 'bg-blue-600' },
                { name: 'Priya Nair', role: 'Data Analyst', match: '87%', bg: 'bg-emerald-600' },
                { name: 'Arjun Das', role: 'Backend Developer', match: '85%', bg: 'bg-slate-800' },
              ].map((cand, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-gray-200 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${cand.bg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {cand.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-bold text-gray-900 truncate">{cand.name}</h5>
                      <p className="text-[11px] text-gray-500 truncate">{cand.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200/60 pt-2 text-xs">
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      {cand.match} Match
                    </span>
                    <button className="text-blue-600 hover:underline font-semibold text-[11px]">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900">Recent Applications Table</h4>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View All →</button>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="p-3 pl-4">Candidate</th>
                  <th className="p-3">Position</th>
                  <th className="p-3">Applied On</th>
                  <th className="p-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'John Doe', role: 'Frontend Developer', date: 'May 20, 2025', status: 'New', statusBg: 'bg-blue-50 text-blue-700' },
                  { name: 'Priya Sharma', role: 'UI/UX Designer', date: 'May 19, 2025', status: 'Shortlisted', statusBg: 'bg-emerald-50 text-emerald-700' },
                  { name: 'Michael Johnson', role: 'Full Stack Developer', date: 'May 18, 2025', status: 'Interview', statusBg: 'bg-amber-50 text-amber-700' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3 pl-4 font-semibold text-gray-900">{row.name}</td>
                    <td className="p-3 text-gray-600">{row.role}</td>
                    <td className="p-3 text-gray-500">{row.date}</td>
                    <td className="p-3 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.statusBg}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>

    </div>
  )
}
