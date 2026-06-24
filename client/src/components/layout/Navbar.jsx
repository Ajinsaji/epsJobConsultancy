import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'
import { GlassButton } from '../ui/GlassButton'

export default function Navbar() {
  const { user } = useSelector(selectAuth)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_0_30px_rgba(99,102,241,0.35)]" />
          <div>
            <div className="text-sm font-semibold text-white">EPS Jobs</div>
            <div className="text-[11px] text-white/60">AI-powered matching</div>
          </div>
        </motion.div>

        <nav className="hidden items-center gap-5 md:flex">
          <Link className="text-sm text-white/70 hover:text-white" to="/">
            Home
          </Link>
          <Link
            className="text-sm text-white/70 hover:text-white"
            to="/services"
          >
            Services
          </Link>
          <Link
            className="text-sm text-white/70 hover:text-white"
            to="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Hi, {user.name}</span>
            </div>
          ) : (
            <GlassButton as={Link} to="/login" variant="primary" className="hidden md:inline-flex">
              Login
            </GlassButton>
          )}

          {!user ? (
            <GlassButton as={Link} to="/login" variant="ghost" className="md:hidden">
              Sign in
            </GlassButton>
          ) : null}
        </div>
      </div>
    </header>
  )
}

