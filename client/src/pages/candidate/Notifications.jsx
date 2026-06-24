import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

export default function Notifications() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications/me')
      setNotifications(res.data?.notifications || [])
    } catch (err) {
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const newestFirst = useMemo(() => {
    return [...(notifications || [])].sort((a, b) => {
      return new Date(b.createdAt || 0).valueOf() - new Date(a.createdAt || 0).valueOf()
    })
  }, [notifications])

  const unreadCount = useMemo(() => {
    return (notifications || []).filter((n) => !n.read).length
  }, [notifications])

  const markRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`)
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)))
    } catch (err) {
      toast.error('Failed to mark notification as read')
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <div className="h-10 w-56 animate-pulse rounded-lg bg-slate-200" />
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent">
            Notifications
          </h1>
          <p className="text-sm text-slate-500">Newest first • Keep track of your updates.</p>
        </div>
        {unreadCount > 0 ? (
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {unreadCount} unread
          </span>
        ) : null}
      </div>

      <GlassCard className="bg-white p-4 shadow-sm">
        {newestFirst.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500">No notifications available.</div>
        ) : (
          <div className="space-y-3">
            {newestFirst.map((n) => (
              <motion.div
                key={n._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className={`rounded-xl border p-4 ${
                    n.read
                      ? 'border-slate-100 bg-slate-50'
                      : 'border-indigo-100 bg-indigo-50/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 truncate">{n.title}</h3>
                        {!n.read ? (
                          <span className="h-2 w-2 rounded-full bg-indigo-500" aria-label="unread" />
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{n.message}</p>
                      <p className="mt-2 text-[11px] text-slate-400">
                        {n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {!n.read ? (
                        <GlassButton
                          variant="primary"
                          className="min-h-[44px] px-4"
                          style={{ minHeight: '44px' }}
                          onClick={() => markRead(n._id)}
                        >
                          Mark Read
                        </GlassButton>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  )
}


