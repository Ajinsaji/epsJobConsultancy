import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

export default function EPSDashboard() {
  const [stats, setStats] = useState(null)
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  // Modals / forms state
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [credentials, setCredentials] = useState(null)

  // Company creation inputs
  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [compEmail, setCompEmail] = useState('')
  const [compPhone, setCompPhone] = useState('')
  const [compAddress, setCompAddress] = useState('')
  const [compIndustry, setCompIndustry] = useState('')
  const [compWebsite, setCompWebsite] = useState('')
  const [creatingCompany, setCreatingCompany] = useState(false)

  // Interview scheduling state
  const [schedulingApp, setSchedulingApp] = useState(null)
  const [intDate, setIntDate] = useState('')
  const [intTime, setIntTime] = useState('')
  const [intMode, setIntMode] = useState('Online')
  const [intLink, setIntLink] = useState('')
  const [intLoc, setIntLoc] = useState('')
  const [intRemarks, setIntRemarks] = useState('')
  const [scheduling, setScheduling] = useState(false)

  const loadAllData = async () => {
    try {
      const [statsRes, jobsRes, appsRes, intsRes] = await Promise.all([
        axios.get('/api/public/stats'),
        axios.get('/api/jobs'),
        axios.get('/api/applications'),
        axios.get('/api/interviews'),
      ])

      setStats(statsRes.data)
      setJobs(jobsRes.data?.jobs || [])
      setApplications(appsRes.data?.applications || [])
      setInterviews(intsRes.data?.interviews || [])
    } catch (err) {
      console.error('Failed to load EPS admin metrics:', err)
      toast.error('Failed to sync database metrics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllData()
  }, [])

  const handleRegisterCompany = async (e) => {
    e.preventDefault()
    setCreatingCompany(true)
    setCredentials(null)

    const payload = {
      companyName,
      contactPerson,
      email: compEmail,
      phone: compPhone,
      address: compAddress,
      industry: compIndustry,
      website: compWebsite,
    }

    try {
      const res = await axios.post('/api/companies', payload)
      toast.success('Company registered successfully!')
      setCredentials(res.data?.credentials)
      
      // Reset form
      setCompanyName('')
      setContactPerson('')
      setCompEmail('')
      setCompPhone('')
      setCompAddress('')
      setCompIndustry('')
      setCompWebsite('')
      
      loadAllData()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to register company')
    } finally {
      setCreatingCompany(false)
    }
  }

  const handleStatusTransition = async (appId, currentStatus, nextStatus) => {
    try {
      await axios.patch(`/api/applications/${appId}/status`, {
        status: nextStatus,
        remarks: `Status updated by EPS Admin to: ${nextStatus}`,
      })
      toast.success(`Application updated to ${nextStatus}`)
      loadAllData()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update application status')
    }
  }

  const handleScheduleInterview = async (e) => {
    e.preventDefault()
    setScheduling(true)

    // First transition status to 'Interview Scheduled' so backend accepts scheduling
    try {
      await handleStatusTransition(schedulingApp._id, schedulingApp.status, 'Interview Scheduled')
      
      await axios.post('/api/interviews', {
        applicationId: schedulingApp._id,
        interviewDate: intDate,
        time: intTime,
        mode: intMode,
        meetingLink: intLink,
        location: intLoc,
        remarks: intRemarks,
      })

      // Auto-create notification for candidate
      await axios.post('/api/notifications', {
        userId: schedulingApp.candidateId?.userId || schedulingApp.candidateId,
        title: 'Interview Scheduled',
        message: `An interview has been scheduled for you for the position of ${schedulingApp.jobId?.title || 'Job'}. Check your upcoming interviews widget.`,
      }).catch(() => {})

      toast.success('Interview scheduled successfully!')
      setSchedulingApp(null)
      
      // Reset inputs
      setIntDate('')
      setIntTime('')
      setIntLink('')
      setIntLoc('')
      setIntRemarks('')
      
      loadAllData()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to schedule interview')
    } finally {
      setScheduling(false)
    }
  }

  // Derived Metrics
  const today = new Date().toDateString()
  
  const newCandidatesToday = applications.filter(a => {
    const candidateReg = new Date(a.candidateId?.createdAt).toDateString()
    return candidateReg === today
  }).length

  const newAppsToday = applications.filter(a => {
    const appDate = new Date(a.appliedAt || a.createdAt).toDateString()
    return appDate === today
  }).length

  const jobConversionRate = applications.length
    ? Math.round((applications.filter(a => a.status === 'Selected').length / applications.length) * 100)
    : 0

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-28 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-4">
      {/* Greet & Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold text-transparent">
            EPS consultancy admin
          </h1>
          <p className="text-sm text-slate-500">Manage candidate reviews, register companies, and schedule interviews</p>
        </div>
        <div className="flex items-center gap-3">
          <GlassButton variant="primary" onClick={() => setShowCompanyForm(!showCompanyForm)} style={{ minHeight: '44px' }}>
            {showCompanyForm ? 'Show Pipeline' : 'Register Partner Company'}
          </GlassButton>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <GlassCard className="border-l-4 border-l-indigo-500 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Candidates</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-800">{stats?.candidates ?? 0}</h3>
        </GlassCard>
        <GlassCard className="border-l-4 border-l-violet-500 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Companies</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-800">{stats?.companies ?? 0}</h3>
        </GlassCard>
        <GlassCard className="border-l-4 border-l-amber-500 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Jobs Open</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-800">{stats?.openJobs ?? 0}</h3>
        </GlassCard>
        <GlassCard className="border-l-4 border-l-cyan-500 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Applications</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-800">{stats?.applications ?? 0}</h3>
        </GlassCard>
        <GlassCard className="border-l-4 border-l-emerald-500 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Interviews</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-800">{stats?.interviews ?? 0}</h3>
        </GlassCard>
      </div>

      {/* Middle row: Consultancy metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase">New candidates today</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{newCandidatesToday}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase">New applications today</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{newAppsToday}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Interviews Scheduled</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{interviews.length}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase">Placement Rate</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{jobConversionRate}%</p>
        </div>
      </div>

      {showCompanyForm ? (
        /* Company creation form */
        <GlassCard className="bg-white p-6 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Register Partner Company</h2>
          
          <form onSubmit={handleRegisterCompany} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase">Company Name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase">Contact Person</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase">Email Address</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                  type="email"
                  required
                  value={compEmail}
                  onChange={(e) => setCompEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase">Phone Number</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                  value={compPhone}
                  onChange={(e) => setCompPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase">Physical Address</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                value={compAddress}
                onChange={(e) => setCompAddress(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase">Industry Sector</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                  placeholder="e.g. Technology"
                  value={compIndustry}
                  onChange={(e) => setCompIndustry(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase">Website URL</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                  placeholder="e.g. https://website.com"
                  value={compWebsite}
                  onChange={(e) => setCompWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <GlassButton variant="primary" type="submit" disabled={creatingCompany} style={{ minHeight: '44px' }}>
                {creatingCompany ? 'Registering...' : 'Register Company'}
              </GlassButton>
            </div>
          </form>

          {/* Display generated credentials */}
          {credentials && (
            <div className="mt-6 border border-emerald-500/20 bg-emerald-50/50 rounded-xl p-4 text-sm text-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-800">Credentials Generated! Please copy:</h4>
              <p><strong>Username:</strong> {credentials.username}</p>
              <p><strong>Email:</strong> {credentials.email}</p>
              <p><strong>Temporary Password:</strong> <span className="bg-white/80 px-2 py-0.5 rounded font-mono font-bold select-all border">{credentials.temporaryPassword}</span></p>
              <p className="text-xs text-emerald-600 italic">This temporary password must be changed by the company upon their first sign-in.</p>
            </div>
          )}
        </GlassCard>
      ) : (
        /* Candidates Pipeline Review */
        <GlassCard className="bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-3">Hiring Funnel & Candidate Management</h2>
          
          {applications.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500 py-6 text-center">No applications exist in the platform yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 font-medium">
                <thead>
                  <tr className="border-b text-xs text-slate-400 font-semibold uppercase">
                    <th className="py-2">Candidate</th>
                    <th className="py-2">Applied Role</th>
                    <th className="py-2">Resume Snapshot</th>
                    <th className="py-2">Current Status</th>
                    <th className="py-2 text-right">Workflow Transition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50">
                      <td className="py-3">
                        <div className="font-semibold text-slate-800">{app.candidateId?.fullName || 'Candidate'}</div>
                        <div className="text-xs text-slate-400">{app.candidateId?.phone || 'No phone'}</div>
                      </td>
                      <td className="py-3">
                        <div className="font-semibold text-slate-700">{app.jobId?.title || 'Unknown'}</div>
                        <div className="text-xs text-slate-400">Company: {app.companyId?.companyName || 'N/A'}</div>
                      </td>
                      <td className="py-3 text-xs">
                        <div className="text-slate-700">Skills: {app.resumeSnapshot?.skills?.join(', ') || 'N/A'}</div>
                        <div className="text-slate-500">Exp: {app.resumeSnapshot?.experience || 'N/A'}</div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                          app.status === 'Interview Scheduled' ? 'bg-cyan-100 text-cyan-800' :
                          app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-1.5 flex-wrap">
                          {app.status === 'Applied' && (
                            <button
                              onClick={() => handleStatusTransition(app._id, app.status, 'Under Review')}
                              className="bg-indigo-600 text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                            >
                              Review
                            </button>
                          )}
                          {app.status === 'Under Review' && (
                            <button
                              onClick={() => handleStatusTransition(app._id, app.status, 'Shortlisted')}
                              className="bg-purple-600 text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-purple-700 transition"
                            >
                              Shortlist
                            </button>
                          )}
                          {app.status === 'Shortlisted' && (
                            <button
                              onClick={() => handleStatusTransition(app._id, app.status, 'Forwarded')}
                              className="bg-blue-600 text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-blue-700 transition"
                            >
                              Forward Profile
                            </button>
                          )}
                          {app.status === 'Forwarded' && (
                            <button
                              onClick={() => setSchedulingApp(app)}
                              className="bg-cyan-600 text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-cyan-700 transition"
                            >
                              Schedule Interview
                            </button>
                          )}
                          {(app.status === 'Selected' || app.status === 'Rejected') && (
                            <span className="text-xs text-slate-400 italic">Hiring Complete</span>
                          )}
                          {app.status === 'Interview Scheduled' && (
                            <span className="text-xs text-slate-400 italic">Waiting Company Decision</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      )}

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {schedulingApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h3 className="text-xl font-bold text-slate-800">Schedule Interview</h3>
              <p className="text-sm text-slate-500 mt-1">
                Candidate: {schedulingApp.candidateId?.fullName} • Job: {schedulingApp.jobId?.title}
              </p>

              <form onSubmit={handleScheduleInterview} className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase">Interview Date</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                      type="date"
                      required
                      value={intDate}
                      onChange={(e) => setIntDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase">Time Slot</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                      placeholder="e.g. 10:00 AM - 10:30 AM"
                      required
                      value={intTime}
                      onChange={(e) => setIntTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase">Interview Mode</label>
                    <select
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                      value={intMode}
                      onChange={(e) => setIntMode(e.target.value)}
                    >
                      <option value="Online">Online (Video Call)</option>
                      <option value="Offline">Offline (Face to Face)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase">Meeting Link</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                      placeholder="https://meet.google.com/xyz"
                      value={intLink}
                      onChange={(e) => setIntLink(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase">Location / Address (if Offline)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                    placeholder="Physical interview address..."
                    value={intLoc}
                    onChange={(e) => setIntLoc(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase">Special Instructions / Remarks</label>
                  <textarea
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-500"
                    placeholder="Enter instructions for candidate..."
                    rows={3}
                    value={intRemarks}
                    onChange={(e) => setIntRemarks(e.target.value)}
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                  <GlassButton 
                    variant="ghost" 
                    type="button"
                    onClick={() => setSchedulingApp(null)}
                    disabled={scheduling}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton 
                    variant="primary" 
                    type="submit"
                    disabled={scheduling}
                  >
                    {scheduling ? 'Scheduling...' : 'Schedule Interview'}
                  </GlassButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
