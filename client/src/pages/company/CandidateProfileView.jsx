import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GlassButton } from '../../components/ui/GlassButton'
import GlassCard from '../../components/ui/GlassCard'

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

function formatMaybeYears(v) {
  if (v === null || v === undefined || v === '') return '—'
  return `${v} yrs`
}

function ModalShell({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-[20px] border border-white/10 bg-[#0F172A] text-white/90 p-5 shadow-[0_0_60px_rgba(124,58,237,0.25)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">{title}</div>
          </div>
          <button
            type="button"
            className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}


export default function CandidateProfileView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [candidate, setCandidate] = useState(null)

  const [actionsBusy, setActionsBusy] = useState({ save: false, shortlist: false })
  const [modal, setModal] = useState({ open: false, kind: null })
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')


  const profile = useMemo(() => candidate || {}, [candidate])

  const fetchCandidate = async () => {
    setLoading(true)
    try {
      // Prefer existing candidate profile endpoint on company scope.
      // If it doesn't exist, server should add it per spec.
      const res = await axios.get(`/api/company/candidates/${id}`)
      setCandidate(res.data?.candidate || res.data || null)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load candidate profile')
      setCandidate(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const postAction = async (type) => {
    const map = {
      save: { busyKey: 'save', url: `/api/company/candidates/${id}/save` },
      shortlist: { busyKey: 'shortlist', url: `/api/company/candidates/${id}/shortlist` },
      contact: { busyKey: 'contact', url: `/api/company/candidates/${id}/contact` },
    }

    const cfg = map[type]
    if (!cfg) return

    setActionsBusy((s) => ({ ...s, [cfg.busyKey]: true }))
    try {
      await axios.post(cfg.url)
      const msg = type === 'save' ? 'Candidate saved' : type === 'shortlist' ? 'Candidate shortlisted' : 'Contact request sent'
      toast.success(msg)
    } catch (err) {
      toast.error(err?.response?.data?.message || `Failed to ${type} candidate`)
    } finally {
      setActionsBusy((s) => ({ ...s, [cfg.busyKey]: false }))
    }
  }

  const photoSrc = profile.photo || profile.profilePhoto || profile.avatar || ''

  const skills = asArray(profile.skills)
  const education = asArray(profile.education)
  const experience = asArray(profile.experience)
  const projects = asArray(profile.projects)
  const certifications = asArray(profile.certifications)
  const languages = asArray(profile.languages)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Candidate Profile
          </h1>
          <p className="text-sm text-slate-500">Review full profile details and take action.</p>
        </div>

        <div className="flex gap-2">
          <GlassButton
            variant="ghost"
            className="text-xs py-2 border border-slate-200/60"
            onClick={() => navigate(-1)}
          >
            Back
          </GlassButton>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="h-[150px] rounded-2xl border border-slate-200/60 bg-slate-50 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* HEADER */}
          <GlassCard className="bg-white p-5 shadow-sm">
            <div className="grid gap-5 md:grid-cols-[180px_1fr]">
              <div className="flex justify-center md:justify-start">
                <div className="h-[140px] w-[140px] rounded-[26px] overflow-hidden border border-slate-200 bg-slate-50">
                  {photoSrc ? (
                    <img src={photoSrc} alt={profile.fullName || profile.name || 'Candidate'} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">No Photo</div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-extrabold text-slate-900">
                    {profile.fullName || profile.name || '—'}
                  </div>
                  <div className="text-sm font-semibold text-indigo-700">
                    {profile.title || profile.professionalTitle || '—'}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700">Location:</span> {profile.location || '—'}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700">Experience:</span> {formatMaybeYears(profile.experienceYears ?? profile.experienceYearsTotal ?? profile.experience)}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700">Availability:</span> {profile.availability || '—'}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700">Expected Salary:</span> {profile.expectedSalary ?? profile.expectedCompensation ?? '—'}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-3 py-2">
                    <div className="text-xs font-semibold text-indigo-700">Profile Score</div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {profile.profileScore ?? profile.score ?? profile.rating ?? '—'}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* ACTIONS */}
          <div className="grid gap-3 sm:grid-cols-3">
            <GlassButton
              variant="ghost"
              className="w-full bg-white border border-slate-200/60 text-slate-700 py-2"
              disabled={actionsBusy.save}
              onClick={() => postAction('save')}
            >
              Save Candidate
            </GlassButton>
            <GlassButton
              variant="primary"
              className="w-full py-2"
              disabled={actionsBusy.shortlist}
              onClick={() => postAction('shortlist')}
            >
              Shortlist Candidate
            </GlassButton>
            <GlassButton
              variant="ghost"
              className="w-full bg-white border border-slate-200/60 text-slate-700 py-2"
              onClick={() => setModal({ open: true, kind: 'contact' })}
              disabled={actionsBusy.save || actionsBusy.shortlist}
            >
              Contact Candidate
            </GlassButton>
          </div>

          {/* Communication CTAs */}
          <div className="grid gap-3 sm:grid-cols-2">
            <GlassButton
              variant="ghost"
              className="w-full bg-white border border-slate-200/60 text-slate-700 py-2"
              onClick={() => setModal({ open: true, kind: 'interview' })}
              disabled={loading}
            >
              Invite To Interview
            </GlassButton>
            <GlassButton
              variant="ghost"
              className="w-full bg-white border border-slate-200/60 text-slate-700 py-2"
              onClick={() => setModal({ open: true, kind: 'message' })}
              disabled={loading}
            >
              Send Message
            </GlassButton>
          </div>

          {/* MODAL */}
          {modal.open ? (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-lg rounded-[20px] border border-white/10 bg-[#0F172A] text-white/90 p-5 shadow-[0_0_60px_rgba(124,58,237,0.25)] backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-extrabold">
                      {modal.kind === 'contact'
                        ? 'Contact Candidate'
                        : modal.kind === 'interview'
                          ? 'Invite To Interview'
                          : 'Send Message'}
                    </div>
                    <div className="mt-1 text-xs text-white/60">Send communication to the candidate.</div>
                  </div>
                  <button
                    type="button"
                    className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                    onClick={() => {
                      setModal({ open: false, kind: null })
                      setSubject('')
                      setMessage('')
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-4 grid gap-3">
                  <div>
                    <label className="text-xs font-semibold text-white/70">Subject</label>
                    <input
                      className="mt-2 w-full min-h-[42px] rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-[#8B5CF6]"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70">Message</label>
                    <textarea
                      className="mt-2 w-full min-h-[110px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#8B5CF6]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message..."
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <GlassButton
                      variant="ghost"
                      className="min-h-[40px] border border-white/10 bg-white/5"
                      onClick={() => {
                        setModal({ open: false, kind: null })
                        setSubject('')
                        setMessage('')
                      }}
                    >
                      Cancel
                    </GlassButton>
                    <GlassButton
                      variant="primary"
                      className="min-h-[40px]"
                      onClick={async () => {
                        try {
                          const kind = modal.kind
                          const url =
                            kind === 'contact'
                              ? `/api/company/candidates/${id}/contact-request`
                              : kind === 'interview'
                                ? `/api/company/candidates/${id}/interview-invite`
                                : `/api/company/candidates/${id}/message`

                          await axios.post(url, { subject, message })
                          toast.success('Communication sent')
                          setModal({ open: false, kind: null })
                          setSubject('')
                          setMessage('')
                        } catch (e) {
                          toast.error(e?.response?.data?.message || 'Failed to send communication')
                        }
                      }}
                    >
                      Send
                    </GlassButton>
                  </div>
                </div>
              </div>
            </div>
          ) : null}


          {/* SECTIONS */}
          <div className="grid gap-5">
            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock title="Skills" items={skills} />
            </GlassCard>

            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock title="Education" items={education} />
            </GlassCard>

            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock title="Experience" items={experience} />
            </GlassCard>

            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock title="Projects" items={projects} />
            </GlassCard>

            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock title="Certifications" items={certifications} />
            </GlassCard>

            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock title="Languages" items={languages} />
            </GlassCard>

            <GlassCard className="bg-white p-5 shadow-sm">
              <SectionBlock
                title="Resume"
                items={asArray(profile.resume || profile.resumeItems || profile.resumeSummary || profile.resumeText)}
                renderTail={
                  profile.resumeUrl ? (
                    <div className="mt-3">
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-indigo-700 underline"
                      >
                        Open resume
                      </a>
                    </div>
                  ) : null
                }
              />
            </GlassCard>
          </div>
        </>
      )}
    </div>
  )
}

function SectionBlock({ title, items, renderTail }) {
  const safe = items || []
  return (
    <div>
      <div className="text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-3">
        {safe.length === 0 ? (
          <div className="text-xs text-slate-500">No data available.</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {safe.slice(0, 30).map((it, idx) => (
              <span key={`${title}-${idx}`} className="rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 text-[11px] font-semibold">
                {typeof it === 'string' ? it : JSON.stringify(it)}
              </span>
            ))}
          </div>
        )}
        {renderTail}
      </div>
    </div>
  )
}

