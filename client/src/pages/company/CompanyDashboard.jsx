import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

function SafeValue({ value, fallback = '—' }) {
  if (value === null || value === undefined || value === '') return fallback
  return value
}

function MetricCard({ title, value }) {
  return (
    <GlassCard className="border border-white/10 bg-white/5 p-5">
      <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
        {title}
      </div>
      <div className="mt-2 text-3xl font-extrabold text-white">
        <SafeValue value={value} fallback={0} />
      </div>
    </GlassCard>
  )
}

function QuickActionCard({ title, onClick }) {
  return (
    <GlassCard className="bg-white/5 p-4 border border-white/10">
      <button type="button" onClick={onClick} className="w-full text-left">
        <div className="text-sm font-extrabold text-white">{title}</div>
      </button>
    </GlassCard>
  )
}

function CommunicationType({ type }) {
  const t = String(type || '')
  if (!t) return '—'
  if (t === 'hiring_message') return 'Hiring Message'
  if (t === 'interview_invite') return 'Interview Invite'
  return t
}

export default function CompanyDashboard() {
  const [company, setCompany] = useState(null)
  const [jobs, setJobs] = useState([])
  const [history, setHistory] = useState([])
  const [savedCandidates, setSavedCandidates] = useState([])
  const [shortlistedCandidates, setShortlistedCandidates] = useState([])
  const [communications, setCommunications] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchAll = async () => {
      try {
        setLoading(true)

        const [companyRes, jobsRes, savedRes, shortlistedRes, historyRes, commRes] =
          await Promise.all([
            axios.get('/api/companies/me'),
            axios.get('/api/company/jobs'),
            axios.get('/api/company/candidates/saved'),
            axios.get('/api/company/candidates/shortlisted'),
            axios.get('/api/company/candidates/history'),
            axios.get('/api/company/communications'),
          ])

        if (!mounted) return

        setCompany(companyRes.data?.company || companyRes.data || null)
        setJobs(jobsRes.data?.jobs || jobsRes.data || [])
        setSavedCandidates(savedRes.data?.candidates || savedRes.data || [])
        setShortlistedCandidates(shortlistedRes.data?.candidates || shortlistedRes.data || [])
        setHistory(historyRes.data?.history || historyRes.data || [])
        setCommunications(commRes.data || commRes.data?.communications || [])
      } catch (err) {
        console.error(err)
        toast.error('Failed to load company dashboard')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAll()

    return () => {
      mounted = false
    }
  }, [])

  // Active jobs
  const activeJobsCount = useMemo(() => {
    const list = jobs || []
    return list.filter((j) => j.status === 'Open' || j.status === 'Active').length
  }, [jobs])

  // Candidate interactions (from history API)
  const candidateInteractionsCount = useMemo(() => {
    const list = history || []
    return list.length
  }, [history])

  // Interview count heuristic from history
  const interviewsCount = useMemo(() => {
    const list = history || []
    return list.filter((h) => {
      const status = String(h?.status || '').toLowerCase()
      return (
        status.includes('interview') ||
        status === 'interview scheduled' ||
        status === 'completed'
      )
    }).length
  }, [history])

  const recentCandidates = useMemo(() => {
    return [...(history || [])].sort((a, b) => {
      const at = a?.timestamp || a?.createdAt || a?.date
      const bt = b?.timestamp || b?.createdAt || b?.date
      return new Date(bt || 0).getTime() - new Date(at || 0).getTime()
    })
  }, [history])

  const recentJobs = useMemo(() => {
    return [...(jobs || [])].sort((a, b) => {
      const at = a?.createdAt || a?.timestamp
      const bt = b?.createdAt || b?.timestamp
      return new Date(bt || 0).getTime() - new Date(at || 0).getTime()
    })
  }, [jobs])

  // Communications metrics (E.7.2)
  const messagesSentCount = useMemo(() => {
    const list = communications || []
    return list.filter((c) => c?.type === 'hiring_message').length
  }, [communications])

  const interviewInvitesCount = useMemo(() => {
    const list = communications || []
    return list.filter((c) => c?.type === 'interview_invite').length
  }, [communications])

  const candidateResponsesCount = useMemo(() => {
    const list = communications || []
    return list.filter((c) => c?.status === 'responded').length
  }, [communications])

  const recentCommunications = useMemo(() => {
    return [...(communications || [])].sort((a, b) => {
      const at = a?.createdAt || a?.timestamp || a?.date
      const bt = b?.createdAt || b?.timestamp || b?.date
      return new Date(bt || 0).getTime() - new Date(at || 0).getTime()
    })
  }, [communications])

  const companyLogo = company?.logoUrl || company?.logo || company?.image
  const companyName = company?.companyName || company?.name
  const industry = company?.industry
  const location = company?.address

  const openTalentSearch = () => {
    window.location.href = '/company/talent-search'
  }

  const openPostJob = () => {
    toast('Post New Job is available in legacy flow (not implemented in this phase).')
  }

  const handleNavigate = (path) => {
    window.location.href = path
  }

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <div className="h-10 w-64 animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 animate-pulse rounded bg-white/5" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="relative mx-auto max-w-[1400px] px-4 py-8 space-y-8">
        {/* SECTION 1 — HEADER */}
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt="Company logo"
                  className="h-12 w-12 rounded-xl object-cover border border-white/10 bg-white/5"
                />
              ) : (
                <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="text-sm font-extrabold text-white/70">LOGO</span>
                </div>
              )}
              <div>
                <div className="text-2xl font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                    {companyName || 'Company'}
                  </span>
                </div>
                <div className="mt-1 text-sm text-white/70">
                  {industry ? `${industry}` : 'Industry'} {location ? `• ${location}` : ''}
                </div>
              </div>
            </div>

            <div className="text-sm text-white/80">
              <div className="font-semibold">
                Welcome back{companyName ? `, ${companyName}` : ''}
              </div>
              <div className="mt-1 text-white/60">Manage hiring, discover talent, and track recruitment activity.</div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — METRIC CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard title="Active Jobs" value={activeJobsCount} />
          <MetricCard title="Saved Candidates" value={(savedCandidates || []).length} />
          <MetricCard title="Shortlisted Candidates" value={(shortlistedCandidates || []).length} />
          <MetricCard title="Candidate Interactions" value={candidateInteractionsCount} />
          <MetricCard title="Interviews" value={interviewsCount} />
        </div>

        {/* SECTION 2b — COMMUNICATION METRICS (E.7.2) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard title="Messages Sent" value={messagesSentCount} />
          <MetricCard title="Interview Invites" value={interviewInvitesCount} />
          <MetricCard title="Candidate Responses" value={candidateResponsesCount} />
        </div>

        {/* SECTION 3 — QUICK ACTIONS */}
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
          <div className="text-lg font-extrabold">Quick Actions</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <QuickActionCard title="Post New Job" onClick={openPostJob} />
            <QuickActionCard title="Talent Search" onClick={openTalentSearch} />
            <QuickActionCard title="Saved Candidates" onClick={() => handleNavigate('/company/saved')} />
            <QuickActionCard title="Shortlisted Candidates" onClick={() => handleNavigate('/company/shortlisted')} />
            <QuickActionCard title="Company Profile" onClick={() => handleNavigate('/company/profile')} />
          </div>
        </div>

        {/* SECTION 4 — RECENT CANDIDATE ACTIVITY */}
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="bg-white/5 border border-white/10 p-6">
            <div className="text-lg font-extrabold border-b border-white/10 pb-3">Recent Candidate Activity</div>
            {recentCandidates.length === 0 ? (
              <div className="mt-6 text-sm text-white/60">No candidate interactions yet.</div>
            ) : (
              <div className="mt-4 divide-y divide-white/10 max-h-[360px] overflow-y-auto">
                {recentCandidates.slice(0, 10).map((h) => (
                  <div
                    key={h._id || `${h.candidateId || ''}-${h.timestamp || h.createdAt || ''}`}
                    className="py-3 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">
                        {h.candidateName || h.candidateId?.fullName || 'Candidate'}
                      </div>
                      <div className="mt-1 text-xs text-white/60">Status: {h.status || '—'}</div>
                    </div>
                    <div className="text-xs text-white/50 whitespace-nowrap">
                      {h.timestamp || h.createdAt || h.date ? (
                        new Date(h.timestamp || h.createdAt || h.date).toLocaleString()
                      ) : (
                        '—'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* SECTION 5 — RECENT JOBS */}
          <GlassCard className="bg-white/5 border border-white/10 p-6">
            <div className="text-lg font-extrabold border-b border-white/10 pb-3">Recent Jobs</div>
            {recentJobs.length === 0 ? (
              <div className="mt-6 text-sm text-white/60">No jobs posted yet.</div>
            ) : (
              <div className="mt-4 divide-y divide-white/10">
                {recentJobs.slice(0, 6).map((job) => (
                  <div
                    key={job._id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">{job.title || 'Job'}</div>
                      <div className="mt-1 text-xs text-white/60">{job.location || '—'}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-white/70">
                        Applicants:{' '}
                        {job.applicantsCount ?? job.applicants ?? job.applicationsCount ?? job.applicantCount ?? '—'}
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          job.status === 'Open' || job.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-200'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {job.status || '—'}
                      </span>
                      <GlassButton
                        variant="ghost"
                        className="text-xs min-h-[32px]"
                        onClick={() => toast('View job is not implemented in this phase.')}
                      >
                        View
                      </GlassButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* SECTION 6 — RECENT COMMUNICATIONS (E.7.2) */}
        <GlassCard className="bg-white/5 border border-white/10 p-6">
          <div className="text-lg font-extrabold border-b border-white/10 pb-3">Recent Communications</div>
          {recentCommunications.length === 0 ? (
            <div className="mt-6 text-sm text-white/60">
              <div>No communications yet.</div>
              <div className="mt-2">Start reaching out to candidates from Talent Search.</div>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-white/10">
              {recentCommunications.slice(0, 5).map((c) => (
                <div
                  key={c._id || `${c.candidateId || ''}-${c.createdAt || c.timestamp || c.date || ''}`}
                  className="py-3 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-white truncate">
                      {c.candidateName || c.candidate?.fullName || c.candidate?.name || 'Candidate'}
                    </div>
                    <div className="mt-1 text-xs text-white/60">{CommunicationType({ type: c.type })}</div>
                    <div className="mt-1 text-xs text-white/60">Status: {c.status || '—'}</div>
                  </div>
                  <div className="text-xs text-white/50 whitespace-nowrap">
                    {c.createdAt || c.timestamp || c.date
                      ? new Date(c.createdAt || c.timestamp || c.date).toLocaleString()
                      : '—'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* SECTION 7 — HIRING OVERVIEW */}
        <GlassCard className="bg-white/5 border border-white/10 p-6">
          <div className="text-lg font-extrabold border-b border-white/10 pb-3">Hiring Overview</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-semibold text-white/60">Saved Candidates</div>
              <div className="mt-1 text-2xl font-extrabold">{(savedCandidates || []).length}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-semibold text-white/60">Shortlisted Candidates</div>
              <div className="mt-1 text-2xl font-extrabold">{(shortlistedCandidates || []).length}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-semibold text-white/60">Contacted Candidates</div>
              <div className="mt-1 text-2xl font-extrabold">{candidateResponsesCount}</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

