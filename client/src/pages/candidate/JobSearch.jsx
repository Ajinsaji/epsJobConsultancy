import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'




export default function JobSearch() {

  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  // Apply Modal
  const [selectedJob, setSelectedJob] = useState(null)
  const [remarks, setRemarks] = useState('')
  const [applying, setApplying] = useState(false)

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs')
      const open = (res.data?.jobs || []).filter((j) => j.status === 'Open')
      setJobs(open)
      setFilteredJobs(open)
    } catch (err) {
      toast.error('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const allLocations = useMemo(() => {
    const set = new Set()
    for (const j of jobs) {
      if (j.location) set.add(j.location)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [jobs])

  useEffect(() => {
    let result = jobs

    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (j) =>
          (j.title || '').toLowerCase().includes(q) ||
          (j.companyId?.companyName || '').toLowerCase().includes(q) ||
          (j.location || '').toLowerCase().includes(q),
      )
    }

    if (locationFilter) {
      result = result.filter((j) => j.location === locationFilter)
    }

    if (typeFilter) {
      result = result.filter((j) => j.jobType === typeFilter)
    }

    setFilteredJobs(result)
  }, [jobs, query, locationFilter, typeFilter])

  const handleApply = async () => {
    if (!selectedJob) return
    setApplying(true)
    try {
      await axios.post('/api/applications', {
        jobId: selectedJob._id,
        remarks,
      })
      toast.success('Application submitted successfully!')
      setSelectedJob(null)
      setRemarks('')
      // Optional: refresh list / recommended handled elsewhere
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <div className="h-10 w-52 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent">
          Jobs
        </h1>
        <p className="text-sm text-slate-500">Search, filter and apply in seconds.</p>
      </div>

      <GlassCard className="bg-white p-4 shadow-sm">
        <div className="space-y-3">
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
            placeholder="Search by title, company, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Job Types</option>
              {Array.from(new Set(jobs.map((j) => j.jobType).filter(Boolean)))
                .sort((a, b) => String(a).localeCompare(String(b)))
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center text-slate-500">
          No open jobs match your filters.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <motion.div key={job._id} whileHover={{ y: -2 }}>
              <GlassCard className="bg-white p-4 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 inline-block">
                      {job.jobType || 'Full-time'}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-800">{job.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {job.companyId?.companyName || 'Unknown Company'}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      {job.location || 'Remote'}
                    </p>
                    {job.salary ? (
                      <p className="mt-2 text-sm font-bold text-indigo-600">{job.salary}</p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4">
                  <GlassButton
                    variant="primary"
                    className="w-full text-center"
                    onClick={() => setSelectedJob(job)}
                    style={{ minHeight: '44px' }}
                  >
                    Apply
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border bg-white p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-800">
                Apply: {selectedJob.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {selectedJob.companyId?.companyName} • {selectedJob.location}
              </p>

              <div className="mt-4 space-y-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Remarks (Optional)
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition duration-200 focus:border-indigo-500 focus:bg-white"
                  placeholder="Add a short note about why you're a fit..."
                  rows={4}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <GlassButton
                  variant="ghost"
                  onClick={() => {
                    setSelectedJob(null)
                    setRemarks('')
                  }}
                  disabled={applying}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  variant="primary"
                  onClick={handleApply}
                  disabled={applying}
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </GlassButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

