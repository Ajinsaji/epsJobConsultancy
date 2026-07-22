import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bookmark, MapPin, Building2, IndianRupee, Briefcase, ExternalLink, Trash2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get('/api/v1/saved-jobs')
      setSavedJobs(response.data.jobs || [])
    } catch (e) {
      toast.error('Failed to load saved jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleUnsave = async (jobId) => {
    setRemovingId(jobId)
    try {
      await axios.delete(`/api/v1/saved-jobs/${jobId}`)
      toast.success('Job removed from saved list')
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId))
    } catch (e) {
      toast.error('Failed to remove job')
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Saved Jobs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 h-[220px] animate-pulse bg-white/5 border-white/5" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Saved Jobs</h1>
          <p className="text-sm text-white/60 mt-1">
            Jobs you have bookmarked for later review.
          </p>
        </div>
      </div>

      {/* Grid */}
      {savedJobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-[#0B4C8C]/20 flex items-center justify-center mb-4">
            <Bookmark className="h-8 w-8 text-[#CCA43B]" />
          </div>
          <h3 className="text-xl font-bold text-white">No saved jobs yet</h3>
          <p className="text-sm text-white/60 mt-2 mb-6">
            Start exploring the job board and bookmark opportunities you are interested in.
          </p>
          <Button as={Link} to="/candidate/search" variant="primary">
            Explore Jobs
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {savedJobs.map((job) => (
              <motion.div
                key={job.savedId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className="h-full flex flex-col p-6 bg-slate-950/40 border-white/10 hover:border-[#CCA43B]/30 transition-all duration-300 group">
                  
                  {/* Top Bar: Company Logo & Action */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0B4C8C] to-[#CCA43B] p-[1px]">
                      <div className="h-full w-full rounded-xl bg-[#070B1A] flex items-center justify-center overflow-hidden">
                        {job.companyId?.logo ? (
                          <img src={job.companyId.logo} alt={job.companyId?.companyName} className="object-cover" />
                        ) : (
                          <Building2 className="h-5 w-5 text-white/50" />
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnsave(job._id)}
                      disabled={removingId === job._id}
                      className="text-white/40 hover:text-red-400 transition bg-white/5 hover:bg-white/10 p-2 rounded-lg"
                      title="Remove from saved"
                    >
                      {removingId === job._id ? (
                        <div className="h-4 w-4 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Title & Company */}
                  <div>
                    <Link to={`/jobs/${job._id}`} className="text-lg font-extrabold text-white group-hover:text-[#CCA43B] transition line-clamp-1">
                      {job.title}
                    </Link>
                    <div className="text-sm text-white/70 mt-1">{job.companyId?.companyName || 'Unknown Company'}</div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <MapPin className="h-3.5 w-3.5 text-[#CCA43B]" />
                      {job.location} ({job.locationType})
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Briefcase className="h-3.5 w-3.5 text-[#CCA43B]" />
                      {job.type} • {job.experienceLevel}
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <IndianRupee className="h-3.5 w-3.5 text-[#CCA43B]" />
                        {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-auto pt-6">
                    <Button
                      as={Link}
                      to={`/jobs/${job._id}`}
                      variant="ghost"
                      className="w-full text-xs py-2 flex items-center justify-center gap-2"
                    >
                      View Details
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>

                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
