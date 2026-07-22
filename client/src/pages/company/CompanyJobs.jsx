import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2, Power, Briefcase, Eye, Users } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import moment from 'moment'

export default function CompanyJobs() {
  const { user } = useSelector((state) => state.auth)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (user?.companyId) {
      fetchJobs()
    }
  }, [user])

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`/api/jobs/company/${user.companyId}`)
      setJobs(response.data.jobs || [])
    } catch (e) {
      toast.error('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (jobId, currentStatus) => {
    try {
      // In a real app we'd have a specific toggle endpoint, or use the /close patch.
      // Let's assume PATCH /api/jobs/:id/close toggles it or sets it to closed.
      // For this demo, let's just make a PUT update to toggle status.
      const newStatus = currentStatus === 'active' ? 'closed' : 'active'
      await axios.put(`/api/jobs/${jobId}`, { status: newStatus })
      toast.success(`Job marked as ${newStatus}`)
      fetchJobs()
    } catch (e) {
      toast.error('Failed to update job status')
    }
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      await axios.delete(`/api/jobs/${jobId}`)
      toast.success('Job deleted successfully')
      fetchJobs()
    } catch (e) {
      toast.error('Failed to delete job')
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      case 'closed':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      default:
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#CCA43B]" />
            Manage Jobs
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Create, edit, and track the status of your job postings.
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" as={Link} to="/company/jobs/new">
          <Plus className="h-4 w-4" /> Post New Job
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-950/40 border-white/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by job title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
        <div className="flex gap-2">
          {/* Add filters here if needed */}
        </div>
      </Card>

      {/* Jobs Table/List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-24 animate-pulse bg-white/5 border-white/5" />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-[#0B4C8C]/20 flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-[#CCA43B]" />
          </div>
          <h3 className="text-xl font-bold text-white">No jobs found</h3>
          <p className="text-sm text-white/60 mt-2 mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : "You haven't posted any jobs yet."}
          </p>
          {!searchTerm && (
            <Button variant="primary" as={Link} to="/company/jobs/new">
              Post Your First Job
            </Button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job, idx) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-5 bg-slate-950/40 border-white/10 hover:border-white/20 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <Link to={`/jobs/${job._id}`} className="text-lg font-bold text-white hover:text-[#CCA43B] transition truncate">
                      {job.title}
                    </Link>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>Posted {moment(job.createdAt).fromNow()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mx-4">
                  <div className="text-center">
                    <div className="text-xl font-black text-white">{job.applicationsCount || 0}</div>
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider flex items-center gap-1 justify-center mt-1">
                      <Users className="w-3 h-3" /> Applications
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-end">
                  <button 
                    onClick={() => handleToggleStatus(job._id, job.status)}
                    title={job.status === 'active' ? 'Close Job' : 'Reopen Job'}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                  >
                    <Power className={`w-4 h-4 ${job.status === 'active' ? 'text-amber-400' : 'text-emerald-400'}`} />
                  </button>
                  <Link 
                    to={`/jobs/${job._id}`}
                    title="View Job"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                  </Link>
                  <Link 
                    to={`/company/jobs/${job._id}/edit`}
                    title="Edit Job"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(job._id)}
                    title="Delete Job"
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
