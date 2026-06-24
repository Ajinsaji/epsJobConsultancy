import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

export default function CandidateDashboard() {
  const [loading, setLoading] = useState(true)

  const [profileCompletion, setProfileCompletion] = useState(0)
  const [applications, setApplications] = useState([])
  const [interviews, setInterviews] = useState([])
  const [notifications, setNotifications] = useState([])
  const [recommendedJobs, setRecommendedJobs] = useState([])

  const [candidateName, setCandidateName] = useState('Candidate')

  useEffect(() => {
    let active = true

    const fetchData = async () => {
      try {
        const [candRes, appsRes, intsRes, notifsRes, recRes] = await Promise.all([
          axios.get('/api/candidates/me'),
          axios.get('/api/applications/me'),
          axios.get('/api/interviews/me'),
          axios.get('/api/notifications/me'),
          axios.get('/api/jobs/recommended'),
        ])

        if (!active) return

        const cand = candRes.data?.candidate
        setCandidateName(cand?.fullName || cand?.name || 'Candidate')
        setProfileCompletion(candRes.data?.profileCompletion || 0)

        setApplications(appsRes.data?.applications || [])
        setInterviews(intsRes.data?.interviews || [])
        setNotifications(notifsRes.data?.notifications || [])
        setRecommendedJobs(recRes.data?.jobs || [])
      } catch (e) {
        toast.error('Failed to load dashboard')
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [])

  const unreadCount = useMemo(() => {
    return (notifications || []).filter((n) => !n.read).length
  }, [notifications])

  const upcomingInterviews = useMemo(() => {
    const now = new Date()
    return (interviews || []).filter((i) => {
      const iDate = new Date(i.interviewDate || i.date)
      return iDate >= now && i.status !== 'Cancelled'
    })
  }, [interviews])

  const recentApplications = useMemo(() => {
    return [...(applications || [])]
      .sort((a, b) => new Date(b.appliedAt || b.createdAt || 0) - new Date(a.appliedAt || a.createdAt || 0))
      .slice(0, 5)
  }, [applications])

  const recommendedTop = useMemo(() => {
    return [...(recommendedJobs || [])].slice(0, 5)
  }, [recommendedJobs])

  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <div className="h-10 w-56 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-28 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    )
  }

  return (
    <div className="space-y-4 py-4">
      {/* Welcome Card */}
      <GlassCard className="bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {candidateName}</h1>
            <p className="mt-1 text-sm text-slate-500">Your EPS recruitment dashboard.</p>
          </div>
          <Link to="/candidate/profile" aria-label="Edit profile">
            <GlassButton variant="primary" className="shrink-0" style={{ minHeight: '44px' }}>
              Edit Profile
            </GlassButton>
          </Link>
        </div>

        {/* Profile completion */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Profile Completion</span>
            <span className="text-sm font-bold text-slate-900">{profileCompletion}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: `${profileCompletion}%` }} />
          </div>
        </div>
      </GlassCard>

      {/* Stat row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Applications</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{applications.length}</div>
        </GlassCard>

        <GlassCard className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Interviews</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{upcomingInterviews.length}</div>
        </GlassCard>

        <GlassCard className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Unread Notifications</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{unreadCount}</div>
        </GlassCard>

        <GlassCard className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Recent Activity</div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            {recentApplications[0]?.jobId?.title ? 'Active' : '—'}
          </div>
        </GlassCard>
      </div>

      {/* Recommended Jobs + Recent Applications */}
      <div className="grid gap-4">
        <GlassCard className="bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recommended Jobs</h2>
          <p className="mt-1 text-sm text-slate-500">Top matches for your profile.</p>

          {recommendedTop.length === 0 ? (
            <div className="mt-4 text-sm text-slate-500">No recommended jobs right now.</div>
          ) : (
            <div className="mt-4 space-y-3">
              {recommendedTop.map((job) => (
                <motion.div key={job._id} whileHover={{ y: -1 }}>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-900">{job.title}</div>
                        <div className="mt-1 text-xs text-slate-600">
                          {job.companyId?.companyName || 'Unknown'} • {job.location || 'Remote'}
                        </div>
                        {job.salary ? (
                          <div className="mt-2 text-sm font-bold text-indigo-600">{job.salary}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>


        <GlassCard className="bg-white p-4 shadow-sm">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
            <Link to="/candidate/applied" className="text-sm font-semibold text-indigo-600">
              View all
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="mt-4 text-sm text-slate-500">No recent applications yet.</div>
          ) : (
            <div className="mt-4 space-y-3">
              {recentApplications.map((app) => (
                <div key={app._id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{app.jobId?.title || 'Unknown Role'}</div>
                      <div className="mt-1 text-xs text-slate-600">
                        {app.companyId?.companyName || 'Unknown Company'}
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">
                      {app.status || 'Applied'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    {new Date(app.appliedAt || app.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard className="bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Upcoming Interviews</h2>
          {upcomingInterviews.length === 0 ? (
            <div className="mt-4 text-sm text-slate-500">No upcoming interviews scheduled.</div>
          ) : (
            <div className="mt-4 space-y-3">
              {upcomingInterviews.slice(0, 3).map((int) => (
                <div key={int._id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{int.applicationId?.jobId?.title || 'Job Interview'}</div>
                      <div className="mt-1 text-xs text-slate-600">
                        {new Date(int.interviewDate || int.date).toLocaleDateString()} • {int.mode || 'Online'}
                      </div>
                    </div>
                    {int.time ? (
                      <span className="text-xs font-bold text-indigo-600 whitespace-nowrap">{int.time}</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

