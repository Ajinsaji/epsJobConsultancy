import React from 'react'
import { 
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, 
  BookOpen, Sparkles, TrendingUp, Bell, Search, Calendar, ChevronRight, Award, AlertTriangle 
} from 'lucide-react'
import { CircularMatchGauge } from '../../design-system/charts/ChartPrimitives'

export const CandidateDashboard = () => {
  return (
    <div className="flex min-h-[700px] w-full bg-[#F8FAFC] text-gray-900 font-sans">
      
      {/* 1. Candidate Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              EPS
            </div>
            <span className="font-extrabold text-sm tracking-tight text-gray-900">CANDIDATE PORTAL</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'My Profile', icon: User },
              { label: 'Resume Analyzer', icon: FileText },
              { label: 'Job Search', icon: Briefcase },
              { label: 'Applications', icon: Bookmark },
              { label: 'AI Matches', icon: Sparkles, badge: '91%' },
              { label: 'Learning Center', icon: BookOpen },
              { label: 'Messages', icon: MessageSquare, badge: '2' },
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
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {/* User Card in Sidebar */}
        <div className="p-3 bg-slate-50 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-gray-900 truncate">John Doe</p>
            <p className="text-[10px] text-gray-500 truncate">john.doe@example.com</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Welcome back, John!</h2>
            <p className="text-xs text-gray-500">Here is your daily AI candidate intelligence overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              <input 
                type="text" 
                readOnly 
                value="Search roles..." 
                className="bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-700 w-44 focus:outline-none"
              />
            </div>
            <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-1.5 right-1.5"></span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Top Row: AI Gauge & Quick Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* AI Match Gauge Card */}
            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-6">
              <CircularMatchGauge percentage={91} size={110} strokeWidth={9} subtitle="91% Excellent Match" />
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">AI Match Rating</span>
                <h4 className="text-sm font-bold text-gray-900">Senior Full Stack React Engineer</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Matched across 12 skill vectors with TechCorp Inc. and 4 other high-growth tech companies.
                </p>
                <div className="pt-1">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition shadow-2xs">
                    Update Profile Skills
                  </button>
                </div>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-xs text-gray-500 font-medium">Recommended Jobs</span>
                <p className="text-2xl font-extrabold text-gray-900">12</p>
                <span className="text-[10px] font-bold text-emerald-600">+4 new today</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-xs text-gray-500 font-medium">Applications</span>
                <p className="text-2xl font-extrabold text-gray-900">5</p>
                <span className="text-[10px] font-bold text-blue-600">2 under review</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
                <span className="text-xs text-gray-500 font-medium">Upcoming Interview</span>
                <p className="text-2xl font-extrabold text-emerald-600">1</p>
                <span className="text-[10px] font-bold text-gray-500">Tomorrow at 10 AM</span>
              </div>
            </div>

          </div>

          {/* Bottom Grid: Recommended Jobs & Skill Gap Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recommended Jobs */}
            <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="text-sm font-bold text-gray-900">Top Recommended Roles</h4>
                <button className="text-xs font-semibold text-blue-600 hover:underline">View All →</button>
              </div>

              <div className="space-y-3">
                {[
                  { role: 'Full Stack Developer', company: 'TechCorp', loc: 'Remote', match: '92%' },
                  { role: 'Frontend Engineer (React/TS)', company: 'InnovateX', loc: 'Bangalore, India', match: '89%' },
                  { role: 'Data Analyst', company: 'GlobalSoft', loc: 'Hyderabad, India', match: '85%' },
                ].map((job, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 bg-slate-50/50 transition">
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">{job.role}</h5>
                      <p className="text-[11px] text-gray-500">{job.company} • {job.loc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {job.match} Match
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis & Learning */}
            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-gray-900">AI Skill Gap Analysis</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-gray-700 mb-1">
                    <span>GraphQL & Next.js SSR</span>
                    <span className="text-amber-600">Suggested Boost</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-amber-500 rounded-full"></div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg">
                  <p className="font-bold text-blue-900 mb-1">Suggested Learning</p>
                  <p className="text-gray-600">Completing the 20-min Next.js SSR tutorial will increase your match score to 96%.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  )
}
