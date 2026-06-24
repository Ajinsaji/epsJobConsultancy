import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

function EmptyState({ title, subtitle }) {
  return (
    <div className="mt-6 rounded-[20px] border border-white/10 bg-white/5 px-6 py-10 text-center">
      <div className="text-sm font-extrabold">{title}</div>
      {subtitle ? <div className="mt-2 text-xs text-white/60">{subtitle}</div> : null}
    </div>
  )
}

export default function CommunicationCenter() {
  const [communications, setCommunications] = useState([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/company/communications')
        if (!active) return
        setCommunications(res.data?.communications || res.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    const list = communications || []
    if (filter === 'all') return list
    if (filter === 'contact_request') {
      return list.filter((c) => c.type === 'contact_request')
    }
    if (filter === 'interview_invite') {
      return list.filter((c) => c.type === 'interview_invite')
    }
    if (filter === 'hiring_message') {
      return list.filter((c) => c.type === 'hiring_message')
    }
    return list
  }, [communications, filter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const at = a?.createdAt ? new Date(a.createdAt).getTime() : 0
      const bt = b?.createdAt ? new Date(b.createdAt).getTime() : 0
      return bt - at
    })
  }, [filtered])

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="relative mx-auto max-w-[1200px] px-4 py-8 space-y-6">
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-6">
          <div className="text-2xl font-extrabold">Communications</div>
          <div className="mt-1 text-sm text-white/60">Recent conversations with candidates</div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <GlassButton
              variant={filter === 'all' ? 'primary' : 'ghost'}
              className="min-h-[38px]"
              onClick={() => setFilter('all')}
            >
              All
            </GlassButton>
            <GlassButton
              variant={filter === 'contact_request' ? 'primary' : 'ghost'}
              className="min-h-[38px]"
              onClick={() => setFilter('contact_request')}
            >
              Contact Requests
            </GlassButton>
            <GlassButton
              variant={filter === 'interview_invite' ? 'primary' : 'ghost'}
              className="min-h-[38px]"
              onClick={() => setFilter('interview_invite')}
            >
              Interview Invites
            </GlassButton>
            <GlassButton
              variant={filter === 'hiring_message' ? 'primary' : 'ghost'}
              className="min-h-[38px]"
              onClick={() => setFilter('hiring_message')}
            >
              Messages
            </GlassButton>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((n) => (
              <GlassCard key={n} className="h-[110px] animate-pulse border border-white/10 bg-white/5 p-5" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState title="No communications yet" subtitle="Start outreach to candidates to see updates here." />
        ) : (
          <div className="grid gap-4">
            {sorted.slice(0, 50).map((c) => (
              <GlassCard key={c._id} className="border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold truncate">
                      {c.candidateName || c.candidateId?.fullName || c.candidateId || 'Candidate'}
                    </div>
                    <div className="mt-1 text-xs text-white/60 truncate">
                      {c.subject ? `${c.subject} — ` : ''}
                      {c.message || '—'}
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/70">
                        {c.type === 'contact_request'
                          ? 'Contact Request'
                          : c.type === 'interview_invite'
                            ? 'Interview Invite'
                            : 'Message'}
                      </span>
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold border border-white/10 bg-white/5 text-white/70">
                        {c.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-white/50 whitespace-nowrap">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

