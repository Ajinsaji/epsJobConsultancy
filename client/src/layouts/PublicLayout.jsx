import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/slices/authSlice'
import { PublicNavbar } from '../components/public/PublicNavbar'
import { PublicFooter } from '../components/public/PublicFooter'
import { DemoModal } from '../components/public/DemoModal'

export default function PublicLayout() {
  const navigate = useNavigate()
  const { user } = useSelector(selectAuth)
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  // Redirect authenticated users to their respective dashboard portals
  useEffect(() => {
    if (!user) return
    if (user.role === 'candidate') navigate('/candidate')
    else if (user.role === 'company') navigate('/company')
    else navigate('/eps')
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col justify-between font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Sticky Header Navbar */}
      <PublicNavbar onRequestDemo={() => setDemoModalOpen(true)} />

      {/* Main Page Route Content */}
      <main className="flex-1 w-full">
        <Outlet context={{ onRequestDemo: () => setDemoModalOpen(true) }} />
      </main>

      {/* Multi-Column Footer */}
      <PublicFooter />

      {/* Global Request Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </div>
  )
}
