import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Search, Briefcase, Users, Filter, Clock, MoreVertical, Building2, UserPlus, Eye, Edit2, Trash2, MapPin, ExternalLink, Power } from 'lucide-react'
import { GlassButton } from '../../components/ui/GlassButton'
import GlassCard from '../../components/ui/GlassCard'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function ManageJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs')
      setJobs(response.data.jobs || [])
    } catch (e) {
      toast.error('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (jobId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'closed' : 'active'
      await axios.put(`/api/jobs/${jobId}`, { status: newStatus })
      toast.success(`Job marked as ${newStatus}`)
      fetchJobs()
    } catch (e) {
      toast.error('Failed to update job status')
    }
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) return
    try {
      await axios.delete(`/api/jobs/${jobId}`)
      toast.success('Job deleted successfully')
      fetchJobs()
    } catch (e) {
      toast.error('Failed to delete job')
    }
  }

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = 
      j.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      j.companyId?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    return matchesSearch && j.status === filterStatus
  })

  const getStatusBadge = (status) => {
    if (status === 'active') return <span className="px-2.5 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Active</span>
    if (status === 'closed') return <span className="px-2.5 py-1 rounded-full border border-red-400/20 bg-red-400/10 text-red-400 text-[10px] font-bold uppercase tracking-wider">Closed</span>
    return <span className="px-2.5 py-1 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider">{status}</span>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-[#CCA43B]" />
          Manage Jobs
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Monitor and manage all job postings across the platform.
        </p>
      </div>

      {/* Toolbar */}
      <GlassCard className="p-4 bg-slate-950/40 border-white/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Jobs Table */}
      <GlassCard className="overflow-hidden bg-slate-950/40 border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase font-bold text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Job Details</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Applications</th>
                <th className="px-6 py-4">Posted Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#CCA43B] border-t-transparent animate-spin" />
                      Loading jobs...
                    </div>
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-white/50">
                    No jobs found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((j) => (
                  <tr key={j._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <Link to={`/jobs/${j._id}`} className="font-bold text-white hover:text-[#CCA43B] transition block mb-1">
                        {j.title}
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {j.location}</span>
                        <span>• {j.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {j.companyId?.logo ? (
                          <img src={j.companyId.logo} alt={j.companyId.companyName} className="w-6 h-6 rounded object-cover" />
                        ) : (
                          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                            <Building2 className="w-3 h-3 text-white/50" />
                          </div>
                        )}
                        <span className="font-semibold text-white">{j.companyId?.companyName || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(j.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-black text-white">{j.applicationsCount || 0}</span>
                    </td>
                    <td className="px-6 py-4 text-white/60">
                      {moment(j.createdAt).format('MMM D, YYYY')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/jobs/${j._id}`} className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/70 hover:text-blue-400 transition" title="View Job">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleToggleStatus(j._id, j.status)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-white/70 hover:text-amber-400 transition" 
                          title={j.status === 'active' ? 'Force Close' : 'Reopen'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(j._id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition" 
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
