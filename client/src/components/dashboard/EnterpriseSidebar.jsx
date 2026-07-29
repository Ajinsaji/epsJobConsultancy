import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth } from '../../redux/slices/authSlice'
import { 
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, 
  BookOpen, Sparkles, Bell, Settings, LogOut, ChevronLeft, ChevronRight,
  Building2, FileCheck, BarChart2, ShieldCheck, Users, Building, CreditCard,
  Cpu, Server, Activity, HelpCircle, Award
} from 'lucide-react'

export function EnterpriseSidebar({ portalType = 'candidate', collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  // Navigation configs per portal
  const candidateNav = [
    { to: '/candidate', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/candidate/profile', label: 'My Profile', icon: User },
    { to: '/candidate/resume-analyzer', label: 'Resume Intelligence', icon: FileText, badge: 'AI' },
    { to: '/candidate/jobs', label: 'Job Search', icon: Briefcase },
    { to: '/candidate/applied', label: 'Applications', icon: Bookmark },
    { to: '/candidate/saved', label: 'Saved Jobs', icon: Award },
    { to: '/candidate/interviews', label: 'Interview Centre', icon: CalendarIcon },
    { to: '/candidate/placements', label: 'Placement Tracker', icon: Sparkles },
    { to: '/candidate/notifications', label: 'Notifications', icon: Bell, badge: '3' },
  ]

  const companyNav = [
    { to: '/company', label: 'Dashboard', icon: Building2 },
    { to: '/company/profile', label: 'Company Profile', icon: Building },
    { to: '/company/jobs', label: 'Manage Jobs', icon: Briefcase, badge: '8' },
    { to: '/company/talent-search', label: 'AI Candidate Search', icon: Sparkles },
    { to: '/company/shortlisted', label: 'Shortlisted Talent', icon: UserCheckIcon },
    { to: '/company/saved', label: 'Saved Candidates', icon: Bookmark },
    { to: '/company/communications', label: 'Messages & Center', icon: MessageSquare },
    { to: '/company/feedback', label: 'Interview Reviews', icon: BarChart2 },
  ]

  const adminNav = [
    { to: '/eps', label: 'Platform Telemetry', icon: Activity },
    { to: '/eps/manage-candidates', label: 'Candidates DB', icon: Users, badge: '2.8k' },
    { to: '/eps/manage-jobs', label: 'Active Jobs', icon: Briefcase },
    { to: '/eps/applications', label: 'Applications', icon: FileCheck },
    { to: '/eps/interviews', label: 'Interviews Pipeline', icon: CalendarIcon },
    { to: '/eps/analytics', label: 'System Analytics', icon: BarChart2 },
    { to: '/eps/homepage', label: 'CMS & Page Builder', icon: Server },
  ]

  const navItems = portalType === 'candidate' ? candidateNav : portalType === 'company' ? companyNav : adminNav
  const portalTitle = portalType === 'candidate' ? 'CANDIDATE PORTAL' : portalType === 'company' ? 'EMPLOYER PORTAL' : 'SUPER ADMIN'

  return (
    <aside 
      className={`fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-[#E5E7EB] transition-all duration-300 flex flex-col justify-between shrink-0 shadow-2xs ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header & Brand Logo */}
      <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black text-base shrink-0 shadow-sm">
            EPS
          </div>
          {!collapsed && (
            <div className="leading-tight overflow-hidden">
              <span className="font-extrabold text-sm text-gray-900 tracking-tight block truncate">
                EPS WORKFORCE
              </span>
              <span className="text-[9px] font-bold text-blue-600 tracking-widest uppercase block -mt-0.5 truncate">
                {portalTitle}
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition hidden md:block"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {!collapsed && (
          <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Main Menu
          </div>
        )}

        {navItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link
              key={idx}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-[#2563EB] font-bold border border-blue-100 shadow-2xs' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isActive ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Sidebar Footer User Card */}
      <div className="p-3 border-t border-[#E5E7EB] bg-[#F8FAFC]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'EU'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden leading-tight">
                <p className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Enterprise User'}</p>
                <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role || portalType}</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </aside>
  )
}

function CalendarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function UserCheckIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
