import React from 'react'
import { Activity, Users, BarChart, Settings, ShieldAlert } from 'lucide-react'

export const AdminMobile = () => {
  return (
    <div className="w-full flex-1 bg-[#F8FAFC] flex flex-col justify-between text-gray-900 font-sans">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
        <span className="font-bold text-xs">Admin Telemetry</span>
        <span className="bg-emerald-500 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded">ONLINE</span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        
        {/* Platform Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-gray-500 text-[10px]">Users</span>
            <p className="text-lg font-bold text-gray-900">2,845</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-gray-500 text-[10px]">Companies</span>
            <p className="text-lg font-bold text-gray-900">532</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-gray-500 text-[10px]">Jobs</span>
            <p className="text-lg font-bold text-gray-900">8,421</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-gray-500 text-[10px]">Applications</span>
            <p className="text-lg font-bold text-blue-600">12,458</p>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-2 text-xs">
          <span className="font-bold text-gray-900 block">Recent Activity</span>
          <div className="space-y-2 text-[11px]">
            <div className="p-2 bg-slate-50 rounded flex items-center justify-between">
              <span className="font-medium text-gray-800">New company registered</span>
              <span className="text-[9px] text-gray-400">2m ago</span>
            </div>
            <div className="p-2 bg-slate-50 rounded flex items-center justify-between">
              <span className="font-medium text-gray-800">New user registered</span>
              <span className="text-[9px] text-gray-400">5m ago</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-gray-200 py-2 px-4 flex justify-around text-[10px] text-gray-500 font-semibold">
        <div className="flex flex-col items-center text-blue-600">
          <Activity className="w-4 h-4" />
          <span>Dashboard</span>
        </div>
        <div className="flex flex-col items-center">
          <Users className="w-4 h-4" />
          <span>Users</span>
        </div>
        <div className="flex flex-col items-center">
          <BarChart className="w-4 h-4" />
          <span>Analytics</span>
        </div>
        <div className="flex flex-col items-center">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
      </div>

    </div>
  )
}
