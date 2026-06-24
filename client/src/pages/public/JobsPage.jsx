import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'
import RevealOnScroll from '../../animations/RevealOnScroll'
import { useNavigate } from 'react-router-dom'

function uniqNonEmpty(arr) {
  const set = new Set((arr || []).filter((x) => typeof x === 'string' && x.trim().length > 0))
  return Array.from(set)
}

export default function JobsPage() {
  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    let active = true

    const run = async () => {
      try {
        const res = await axios.get('/api/public/jobs')
        if (!active) return
        setJobs(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        console.error('Failed to load public jobs', err)
      } finally {
        if (active) setLoading(false)
      }
    }

    run()

    return () => {
      active = false
    }
  }, [])

  const locations = useMemo(() => uniqNonEmpty(jobs.map((j) => j.location || '')), [jobs])

  const jobTypes = useMemo(() => uniqNonEmpty(jobs.map((j) => j.jobType || '')), [jobs])


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return (jobs || []).filter((j) => {
      const title = (j.title || '').toLowerCase()
      const company = (j.companyName || '').toLowerCase()
      const loc = (j.location || '').toLowerCase()
      const type = (j.jobType || '').toLowerCase()

      const matchesQuery = q.length === 0 || title.includes(q) || company.includes(q)
      const matchesLocation = !locationFilter || loc === locationFilter.toLowerCase()
      const matchesType = !typeFilter || type === typeFilter.toLowerCase()

      return matchesQuery && matchesLocation && matchesType
    })
  }, [jobs, query, locationFilter, typeFilter])

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:py-14">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white/70">Jobs</div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Explore open opportunities</h1>
              <p className="mt-2 text-sm text-white/60">
                Browse and filter live job postings.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Filters */}
        <RevealOnScroll>
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <div className="md:col-span-5">
              <GlassCard className="p-4">
                <div className="text-xs font-semibold text-white/70">Search</div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
                  placeholder="Job title or company"
                />
              </GlassCard>
            </div>

            <div className="md:col-span-3">
              <GlassCard className="p-4">
                <div className="text-xs font-semibold text-white/70">Location</div>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
                >
                  <option value="">All</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </GlassCard>
            </div>

            <div className="md:col-span-4">
              <GlassCard className="p-4">
                <div className="text-xs font-semibold text-white/70">Job type</div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60"
                >
                  <option value="">All</option>
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </GlassCard>
            </div>
          </div>
        </RevealOnScroll>

        {/* Job list */}
        <RevealOnScroll>
          <div className="mt-8">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[0, 1, 2, 3].map((n) => (
                  <div key={n} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center text-slate-300">
                No jobs match your filters.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((job) => (
                  <motion.div
                    key={job._id}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  >
                    <GlassCard className="flex h-full flex-col justify-between p-6">
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                            {job.jobType || 'Full-time'}
                          </span>
                          <span className="text-xs text-white/50">{job.location || 'Remote'}</span>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-white leading-tight">{job.title}</h3>
                        <p className="mt-1 text-sm text-slate-300">{job.companyName}</p>
                        {job.salary ? (
                          <p className="mt-3 text-sm font-semibold text-cyan-300">{job.salary}</p>
                        ) : null}
                      </div>

                      <div className="mt-6">
                        <GlassButton
                          className="w-full text-center"
                          variant="primary"
                          onClick={() => navigate('/login')}
                        >
                          Apply
                        </GlassButton>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </RevealOnScroll>

        <div className="h-6" />
      </div>
    </div>
  )
}

