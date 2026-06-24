import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

function asArray(v) {
  if (!v) return []
  if (Array.isArray(v)) return v
  if (typeof v === 'string') {
    return v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export default function ShortlistedCandidates() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [candidates, setCandidates] = useState([])

  const fetchShortlisted = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/company/candidates/shortlisted')
      setCandidates(res.data?.candidates || res.data || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load shortlisted candidates')
      setCandidates([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShortlisted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleContact = async (candidateId) => {
    try {
      await axios.post(`/api/company/candidates/${candidateId}/contact`)
      toast.success('Contact request sent')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to contact candidate')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Shortlisted Candidates
          </h1>
          <p className="mt-1 text-sm text-slate-500">Manage your shortlisted candidates and contact them.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-[240px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
          ))}
        </div>
      ) : candidates.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm font-semibold text-slate-700">No shortlisted candidates yet.</p>
          <p className="mt-1 text-xs text-slate-500">Shortlist candidates from Talent Search.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {candidates.map((c) => (
            <GlassCard key={c._id} className="bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                  {c.photo ? (
                    <img src={c.photo} alt={c.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-400">No Photo</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-extrabold text-slate-900 truncate">{c.fullName}</div>
                  <div className="text-xs text-indigo-700 font-semibold truncate">{c.title}</div>
                  <div className="mt-2 text-xs text-slate-600 space-y-1">
                    <div>
                      <span className="font-semibold text-slate-700">Location:</span> {c.location}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Skills:</span>{' '}
                      {(asArray(c.skills) || []).slice(0, 3).join(', ') || '—'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-700">Profile Score</div>
                <div className="text-sm font-extrabold text-slate-900">{c.profileScore ?? c.score ?? '—'}%</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <GlassButton
                  variant="ghost"
                  className="col-span-1 text-xs py-2"
                  onClick={() => navigate(`/company/candidates/${c._id}`)}
                >
                  View Profile
                </GlassButton>

                <GlassButton
                  variant="primary"
                  className="col-span-1 text-xs py-2"
                  onClick={() => handleContact(c._id)}
                >
                  Contact Candidate
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}


