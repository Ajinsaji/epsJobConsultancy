import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/slices/authSlice'
import { EnterpriseSidebar } from '../components/dashboard/EnterpriseSidebar'
import { EnterpriseTopbar } from '../components/dashboard/EnterpriseTopbar'

export default function CandidateLayout() {
  const { user } = useSelector(selectAuth)
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (!user) return
    if (user.role !== 'candidate') {
      navigate(user.role === 'company' ? '/company' : '/eps')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Fixed Enterprise Sidebar */}
      <EnterpriseSidebar portalType="candidate" collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Layout */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        
        {/* Topbar */}
        <EnterpriseTopbar 
          title="Candidate Portal" 
          subtitle="AI Talent & Career Intelligence" 
          onQuickAction={() => navigate('/candidate/jobs')}
        />

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
