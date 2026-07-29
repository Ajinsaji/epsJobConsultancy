import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/slices/authSlice'
import { EnterpriseSidebar } from '../components/dashboard/EnterpriseSidebar'
import { EnterpriseTopbar } from '../components/dashboard/EnterpriseTopbar'

export default function CompanyLayout() {
  const { user } = useSelector(selectAuth)
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (!user) return
    if (user.role !== 'company') {
      navigate(user.role === 'candidate' ? '/candidate' : '/eps')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Fixed Enterprise Sidebar */}
      <EnterpriseSidebar portalType="company" collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Layout */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        
        {/* Topbar */}
        <EnterpriseTopbar 
          title="Employer Portal" 
          subtitle="Enterprise Hiring & AI Candidate Intelligence" 
          onQuickAction={() => navigate('/company/jobs')}
        />

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
