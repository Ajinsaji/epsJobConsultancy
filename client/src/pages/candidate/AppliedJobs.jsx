import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const STEP_ORDER = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Forwarded',
  'Interview Scheduled',
  'Selected',
  'Rejected',
]

function normalizeStatus(status) {
  if (!status) return 'Applied'
  const s = String(status)
  return s
}

function StatusChip({ status }) {
  const s = normalizeStatus(status)

  const cls =
    s === 'Selected'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : s === 'Rejected'
        ? 'bg-rose-100 text-rose-800 border-rose-200'
        : s === 'Interview Scheduled'
          ? 'bg-cyan-100 text-cyan-800 border-cyan-200'
          : s === 'Shortlisted'
            ? 'bg-purple-100 text-purple-800 border-purple-200'
            : s === 'Forwarded'
              ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
              : s === 'Under Review'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {s}
    </span>
  )
}

function Stepper({ status }) {
  const s = normalizeStatus(status)
  const currentIdx = STEP_ORDER.indexOf(s)
  const safeCurrent = currentIdx === -1 ? 0 : currentIdx

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {STEP_ORDER.map((step, idx) => {
          const isDone = idx < safeCurrent
          const isCurrent = idx === safeCurrent

          const dotCls = isCurrent
            ? 'bg-indigo-500'
            : isDone
              ? 'bg-emerald-500'
              : 'bg-slate-300'

          const lineCls = idx < STEP_ORDER.length - 1 ? 'flex-1' : ''

          return (
            <div key={step} className="min-w-[120px]">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${dotCls}`} />
                <span className="text-[11px] font-semibold text-slate-600 whitespace-nowrap">
                  {step}
                </span>
              </div>
              {idx < STEP_ORDER.length - 1 ? <div className={`mt-2 h-[2px] ${lineCls} bg-slate-200`} /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AppliedJobs() {
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/api/applications/me')
      setApplications(res.data?.applications || [])
    } catch (err) {
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const list = useMemo(() => {
    return [...applications].sort((a, b) => {
      const ad = new Date(a.appliedAt || a.createdAt || 0)
      const bd = new Date(b.appliedAt || b.createdAt || 0)
      return bd - ad
    })
  }, [applications])

  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-44 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent">
          Applications
        </h1>
        <p className="text-sm text-slate-500">Track status from Applied to Rejected.</p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center text-slate-500">
          No applications found.
        </div>
      ) : (
        <div className="grid gap-4">
          {list.map((app) => (
            <div key={app._id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-800">{app.jobId?.title || 'Unknown Role'}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {app.companyId?.companyName || app.companyId?.companyName || 'Unknown Company'}
                    {app.jobId?.location ? ` • ${app.jobId?.location}` : app.location ? ` • ${app.location}` : ''}
                  </div>

                </div>
                <StatusChip status={app.status} />
              </div>

              <Stepper status={app.status} />

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Applied: {new Date(app.appliedAt || app.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


