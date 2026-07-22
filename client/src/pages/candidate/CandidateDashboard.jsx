import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { recommendationService } from '../../services/recommendation.service'
import { RecommendationList, LearningSuggestionCard, CareerInsightCard, RecommendationReason } from '../../components/shared/ai'

export default function CandidateDashboard() {
  const [loading, setLoading] = useState(true)

  const [profileCompletion, setProfileCompletion] = useState(0)
  const [applications, setApplications] = useState([])
  const [interviews, setInterviews] = useState([])
  const [notifications, setNotifications] = useState([])

  const [candidateId, setCandidateId] = useState(null)
  const [candidateName, setCandidateName] = useState('Candidate')
  
  // AI Recs
  const [jobRecs, setJobRecs] = useState([])
  const [learningRecs, setLearningRecs] = useState([])
  const [careerRecs, setCareerRecs] = useState([])
  const [aiLoading, setAiLoading] = useState(true)
  const [selectedRecModal, setSelectedRecModal] = useState(null)

  useEffect(() => {
    let active = true

    const fetchData = async () => {
      try {
        const [candRes, appsRes, intsRes, notifsRes] = await Promise.all([
          axios.get('/api/candidates/me'),
          axios.get('/api/applications/me'),
          axios.get('/api/interviews/me'),
          axios.get('/api/notifications/me')
        ])

        if (!active) return

        const cand = candRes.data?.candidate
        setCandidateId(cand?._id)
        setCandidateName(cand?.fullName || cand?.name || 'Candidate')
        setProfileCompletion(candRes.data?.profileCompletion || 0)

        setApplications(appsRes.data?.applications || [])
        setInterviews(intsRes.data?.interviews || [])
        setNotifications(notifsRes.data?.notifications || [])
        
        if (cand?._id) {
          Promise.all([
            recommendationService.getJobRecommendations(cand._id),
            recommendationService.getLearningRecommendations(cand._id),
            recommendationService.getCareerRecommendations(cand._id)
          ]).then(([jobRes, learnRes, careerRes]) => {
            if (!active) return
            setJobRecs(jobRes?.data?.recommendations || [])
            setLearningRecs(learnRes?.data?.recommendations?.[0]?.learningPaths || [])
            setCareerRecs(careerRes?.data?.recommendations?.[0]?.careerInsights || null)
          }).catch(() => {
            toast.error('Failed to load AI insights')
          }).finally(() => {
            if (active) setAiLoading(false)
          })
        } else {
          setAiLoading(false)
        }
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
      <Card className="bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {candidateName}</h1>
            <p className="mt-1 text-sm text-slate-500">Your EPS recruitment dashboard.</p>
          </div>
          <Link to="/candidate/profile" aria-label="Edit profile">
            <Button variant="primary" className="shrink-0" style={{ minHeight: '44px' }}>
              Edit Profile
            </Button>
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
      </Card>

      {/* Stat row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Applications</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{applications.length}</div>
        </Card>

        <Card className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Interviews</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{upcomingInterviews.length}</div>
        </Card>

        <Card className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Unread Notifications</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{unreadCount}</div>
        </Card>

        <Card className="bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Recent Activity</div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            {recentApplications[0]?.jobId?.title ? 'Active' : '—'}
          </div>
        </Card>
      </div>

      {/* Recommended Jobs + Recent Applications */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 mt-8">AI Career Insights</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Recommended Learning</h3>
              {aiLoading ? (
                <div className="h-32 animate-pulse rounded-xl bg-slate-200" />
              ) : learningRecs.length > 0 ? (
                <div className="space-y-3">
                  {learningRecs.map((rec, i) => <LearningSuggestionCard key={i} suggestion={rec} />)}
                </div>
              ) : (
                <div className="text-sm text-slate-500">No learning suggestions available.</div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Career Advisor</h3>
              {aiLoading ? (
                <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
              ) : careerRecs ? (
                <CareerInsightCard insights={careerRecs} />
              ) : (
                <div className="text-sm text-slate-500">No career insights available.</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-extrabold text-slate-900">Recommended Jobs</h2>
          </div>
          <RecommendationList 
            recommendations={jobRecs}
            isLoading={aiLoading}
            emptyTitle="No Job Matches Found"
            emptyMessage="Update your skills and experience to get better job recommendations."
            onAction={(job) => {
               // Usually navigates to apply or opens modal. We'll just alert for now.
               window.location.href = '/candidate/search';
            }}
            onViewDetails={(rec) => setSelectedRecModal(rec)}
          />
        </div>


        <div className="grid gap-4 mt-8">
          <Card className="bg-white p-4 shadow-sm">
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
        </Card>

        <Card className="bg-white p-4 shadow-sm">
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
        </Card>
      </div>

      {selectedRecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-2xl my-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">
                AI Recommendation Insights
              </h3>
              <button onClick={() => setSelectedRecModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <RecommendationReason explanation={selectedRecModal.explanation} />
            
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setSelectedRecModal(null)}>Close</Button>
              <Button variant="primary" onClick={() => { window.location.href = '/candidate/search'; }}>View Job</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

