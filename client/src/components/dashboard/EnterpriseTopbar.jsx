import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectAuth } from '../../redux/slices/authSlice'
import { 
  Search, Bell, Plus, User, Settings, LogOut, Sparkles, ChevronDown, 
  Command, CheckCircle2, ShieldCheck, X 
} from 'lucide-react'
import { CommandPalette } from './CommandPalette'

export function EnterpriseTopbar({ title = "Dashboard", subtitle, onQuickAction }) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)

  const [cmdOpen, setCmdOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  // Generate dynamic breadcrumb
  const pathParts = location.pathname.split('/').filter(Boolean)

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-3.5 flex items-center justify-between shadow-2xs">
      
      {/* Left: Breadcrumbs & Page Title */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 capitalize">
          <Link to="/" className="hover:text-gray-700 transition">Home</Link>
          {pathParts.map((part, idx) => (
            <React.Fragment key={idx}>
              <span>/</span>
              <span className={idx === pathParts.length - 1 ? 'text-blue-600 font-bold' : 'hover:text-gray-700'}>
                {part.replace('-', ' ')}
              </span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <span>{title}</span>
          {subtitle && <span className="text-xs font-normal text-gray-500 hidden sm:inline">• {subtitle}</span>}
        </h1>
      </div>

      {/* Right: Actions, Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        
        {/* Command Palette Search Launcher */}
        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E5E7EB] hover:border-gray-300 rounded-xl px-3 py-1.5 text-xs text-gray-500 transition shadow-2xs group"
        >
          <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700" />
          <span className="hidden md:inline font-medium">Search or Ctrl+K...</span>
          <kbd className="hidden md:inline bg-white border border-gray-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-400 font-bold">
            ⌘K
          </kbd>
        </button>

        {/* Real-time Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen)
              setProfileOpen(false)
            }}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition relative border border-transparent hover:border-gray-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2 ring-2 ring-white"></span>
          </button>

          {/* Notifications Drawer */}
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 space-y-3 z-30 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-gray-900">Notifications</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  3 Unread
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-blue-600" /> New AI Match</span>
                    <span className="text-[9px] text-gray-400 font-mono">2m ago</span>
                  </div>
                  <p className="text-[11px] text-gray-600">Asha Sharma matched 94% with your Senior React job.</p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-gray-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-gray-900">
                    <span>Interview Scheduled</span>
                    <span className="text-[9px] text-gray-400 font-mono">1h ago</span>
                  </div>
                  <p className="text-[11px] text-gray-500">TechCorp scheduled an interview for tomorrow at 10 AM.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2 text-center">
                <button onClick={() => setNotifOpen(false)} className="text-[11px] font-bold text-blue-600 hover:underline">
                  Mark All as Read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Button */}
        {onQuickAction && (
          <button
            onClick={onQuickAction}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Action</span>
          </button>
        )}

        {/* Profile Avatar Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotifOpen(false)
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
          >
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'EU'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Profile Menu Popup */}
          {profileOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl border border-gray-200 shadow-xl p-2 space-y-1 z-30 animate-in fade-in duration-200 text-xs">
              <div className="p-2.5 border-b border-gray-100">
                <p className="font-bold text-gray-900 truncate">{user?.name || 'Enterprise User'}</p>
                <p className="text-[10px] text-gray-500 truncate">{user?.email || 'user@eps.com'}</p>
              </div>
              <button 
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/candidate/profile')
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-semibold"
              >
                <User className="w-4 h-4 text-gray-400" />
                <span>Account Profile</span>
              </button>
              <button 
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/presentation')
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-semibold"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Design System & Docs</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

    </header>
  )
}
