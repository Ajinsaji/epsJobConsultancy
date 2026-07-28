import React from 'react'
import { 
  ShieldAlert, Users, Building, Briefcase, FileText, CreditCard, 
  Settings, Activity, Cpu, Server, TrendingUp, Bell 
} from 'lucide-react'
import { MultiSeriesLineChart } from '../../design-system/charts/ChartPrimitives'

export const AdminDashboard = () => {
  return (
    <div className="flex min-h-[700px] w-full bg-[#F8FAFC] text-gray-900 font-sans">
      
      {/* 1. Admin Sidebar */}
      <aside className="w-56 bg-slate-900 text-white p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              EPS
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">SUPER ADMIN</span>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            {[
              { label: 'Dashboard', icon: Activity, active: true },
              { label: 'Users', icon: Users, badge: '2,845' },
              { label: 'Companies', icon: Building, badge: '532' },
              { label: 'Jobs', icon: Briefcase },
              { label: 'Applications', icon: FileText },
              { label: 'Subscriptions', icon: CreditCard },
              { label: 'AI Usage', icon: Cpu },
              { label: 'CMS', icon: Server },
              { label: 'Settings', icon: Settings },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${
                    item.active 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-900 font-black text-xs flex items-center justify-center">
            SA
          </div>
          <div>
            <p className="text-xs font-bold text-white">System Admin</p>
            <p className="text-[10px] text-emerald-400">All Nodes Active</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Platform Overview</h2>
            <p className="text-xs text-gray-500">Real-time system health, revenue trends, and AI telemetry.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              System Health 99.9%
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Top Platform Overview KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Total Users</span>
              <p className="text-2xl font-extrabold text-gray-900">2,845</p>
              <span className="text-[10px] font-bold text-emerald-600">+12% this month</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Companies</span>
              <p className="text-2xl font-extrabold text-gray-900">532</p>
              <span className="text-[10px] font-bold text-blue-600">+8 active</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Jobs Posted</span>
              <p className="text-2xl font-extrabold text-gray-900">8,421</p>
              <span className="text-[10px] font-bold text-emerald-600">+142 this week</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">Applications</span>
              <p className="text-2xl font-extrabold text-gray-900">12,458</p>
              <span className="text-[10px] font-bold text-blue-600">+1.2k total</span>
            </div>
          </div>

          {/* SVG Analytics Line Chart */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Platform Growth & Telemetry Analytics</h4>
                <p className="text-xs text-gray-500">Users (Blue) vs Applications (Green) monthly trend</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Users</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Applications</span>
              </div>
            </div>
            <MultiSeriesLineChart height={160} />
          </div>

          {/* Activity Audit Timeline */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Recent System Activity Feed</h4>
            
            <div className="space-y-3 text-xs">
              {[
                { time: '2m ago', msg: 'New company registered: Innovate Solutions Ltd.', type: 'Company' },
                { time: '5m ago', msg: 'New candidate user registered: john.doe@example.com', type: 'User' },
                { time: '10m ago', msg: 'Job posted: Frontend Developer at TechCorp', type: 'Job' },
                { time: '15m ago', msg: 'Application received: UI/UX Designer by Priya Sharma', type: 'Application' },
              ].map((act, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="font-medium text-gray-800">{act.msg}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}
