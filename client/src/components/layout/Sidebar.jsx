import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'

const itemsByRole = {
  candidate: [
    { to: '/candidate', label: 'Dashboard' },
    { to: '/candidate/jobs', label: 'Jobs' },
    { to: '/candidate/applied', label: 'Applied' },
    { to: '/candidate/saved', label: 'Saved' },
    { to: '/candidate/notifications', label: 'Notifications' },
  ],
  company: [
    { to: '/company', label: 'Dashboard' },
    { to: '/company/jobs', label: 'Jobs' },
    { to: '/company/shortlisted', label: 'Shortlists' },
    { to: '/company/feedback', label: 'Feedback' },
  ],
  eps_admin: [
    { to: '/eps', label: 'EPS Dashboard' },
    { to: '/eps/manage-jobs', label: 'Manage Jobs' },
    { to: '/eps/manage-candidates', label: 'Manage Candidates' },
    { to: '/eps/applications', label: 'Applications' },
    { to: '/eps/interviews', label: 'Interviews' },
    { to: '/eps/analytics', label: 'Analytics' },
    { to: '/admin', label: 'Admin' },
  ],
}

export default function Sidebar() {
  const location = useLocation()
  const { user } = useSelector(selectAuth)
  const role = user?.role
  const items = itemsByRole[role] ?? []

  if (!user) return null

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950/20 p-4 lg:block">
      <div className="space-y-2">
        {items.map((it) => {
          const active = location.pathname === it.to ||
            location.pathname.startsWith(it.to)
          return (
            <motion.div
              key={it.to}
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            >
              <Link
                to={it.to}
                className={
                  'flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ' +
                  (active
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white')
                }
              >
                <span>{it.label}</span>
                {active ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                ) : null}
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-semibold text-white/70">Status</div>
        <div className="mt-2 text-sm text-white">
          {role === 'candidate'
            ? 'Candidate mode'
            : role === 'company'
              ? 'Company mode'
              : 'EPS Admin mode'}
        </div>
        <div className="mt-3 text-xs text-white/60">
          Premium analytics + AI matching.
        </div>
      </div>
    </aside>
  )
}

