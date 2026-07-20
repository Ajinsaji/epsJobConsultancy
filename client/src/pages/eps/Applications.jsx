import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, User, Briefcase, Calendar, ChevronRight } from 'lucide-react'
import moment from 'moment'

const COLUMNS = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Forwarded',
  'Interview Scheduled',
  'Interview Completed',
  'Selected',
  'Offer Generated',
  'Joined',
  'Placed',
  'Rejected'
]

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [draggedApp, setDraggedApp] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/applications')
      setApplications(response.data.applications || [])
    } catch (e) {
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e, app) => {
    setDraggedApp(app)
    e.dataTransfer.effectAllowed = 'move'
    // For Firefox support
    e.dataTransfer.setData('text/plain', app._id)
    setTimeout(() => {
      e.target.style.opacity = '0.5'
    }, 0)
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedApp(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault()
    if (!draggedApp) return
    if (draggedApp.status === targetStatus) return

    // Optimistic UI update
    setApplications(prev => prev.map(a => 
      a._id === draggedApp._id ? { ...a, status: targetStatus } : a
    ))

    try {
      await axios.patch(`/api/applications/${draggedApp._id}/status`, { status: targetStatus })
      toast.success(`Application moved to ${targetStatus}`)
    } catch (error) {
      toast.error('Failed to update status')
      // Revert on failure
      fetchApplications()
    }
    setDraggedApp(null)
  }

  const getColumnColor = (status) => {
    switch (status) {
      case 'Applied': return 'border-blue-400/30 bg-blue-400/10'
      case 'Under Review': return 'border-amber-400/30 bg-amber-400/10'
      case 'Shortlisted': return 'border-indigo-400/30 bg-indigo-400/10'
      case 'Forwarded': return 'border-purple-400/30 bg-purple-400/10'
      case 'Interview Scheduled': return 'border-pink-400/30 bg-pink-400/10'
      case 'Interview Completed': return 'border-orange-400/30 bg-orange-400/10'
      case 'Selected': return 'border-emerald-400/30 bg-emerald-400/10'
      case 'Offer Generated': return 'border-lime-400/30 bg-lime-400/10'
      case 'Joined': return 'border-teal-400/30 bg-teal-400/10'
      case 'Placed': return 'border-cyan-400/30 bg-cyan-400/10'
      case 'Rejected': return 'border-red-400/30 bg-red-400/10'
      default: return 'border-white/10 bg-white/5'
    }
  }

  const getColumnTitleColor = (status) => {
    switch (status) {
      case 'Applied': return 'text-blue-400'
      case 'Under Review': return 'text-amber-400'
      case 'Shortlisted': return 'text-indigo-400'
      case 'Forwarded': return 'text-purple-400'
      case 'Interview Scheduled': return 'text-pink-400'
      case 'Interview Completed': return 'text-orange-400'
      case 'Selected': return 'text-emerald-400'
      case 'Offer Generated': return 'text-lime-400'
      case 'Joined': return 'text-teal-400'
      case 'Placed': return 'text-cyan-400'
      case 'Rejected': return 'text-red-400'
      default: return 'text-white'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-4 border-[#CCA43B] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col space-y-6 overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-[#CCA43B]" />
          Application Pipeline
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Drag and drop candidates across stages to update their application status.
        </p>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {COLUMNS.map((col) => {
            const columnApps = applications.filter(a => a.status === col)
            
            return (
              <div 
                key={col}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col)}
                className={`w-[320px] flex flex-col rounded-2xl border ${getColumnColor(col)} backdrop-blur-md overflow-hidden transition-colors duration-200 ${draggedApp ? 'hover:bg-white/10' : ''}`}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
                  <h3 className={`font-bold text-sm uppercase tracking-wider ${getColumnTitleColor(col)}`}>
                    {col}
                  </h3>
                  <span className="bg-black/40 text-white/80 text-xs font-black px-2 py-0.5 rounded-full">
                    {columnApps.length}
                  </span>
                </div>

                {/* Column Body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                  <AnimatePresence>
                    {columnApps.map((app) => (
                      <motion.div
                        key={app._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, app)}
                        onDragEnd={handleDragEnd}
                        className="bg-slate-900/80 border border-white/10 p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing hover:border-[#CCA43B]/50 transition group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white text-sm">
                            {app.candidateId?.firstName} {app.candidateId?.lastName}
                          </h4>
                          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#CCA43B] transition" />
                        </div>
                        
                        <div className="space-y-1.5 mt-3">
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <Briefcase className="w-3.5 h-3.5 text-[#CCA43B]" />
                            <span className="truncate">{app.jobId?.title}</span>
                          </div>
                          
                          {app.companyId && (
                            <div className="flex items-center gap-2 text-xs text-white/60">
                              <User className="w-3.5 h-3.5 text-[#CCA43B]" />
                              <span className="truncate">{app.companyId.companyName}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs text-white/40 pt-1 mt-1 border-t border-white/5">
                            <Calendar className="w-3 h-3" />
                            {moment(app.createdAt).format('MMM D, YYYY')}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {columnApps.length === 0 && (
                    <div className="text-center py-8 text-xs font-bold text-white/20 uppercase tracking-widest border-2 border-dashed border-white/5 rounded-xl">
                      Drop Here
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
