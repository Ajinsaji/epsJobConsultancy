import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'
import { Button } from '../ui/Button'

export default function Navbar() {
  const { user } = useSelector(selectAuth)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-95 transition"
        >
          <img src="/logo.png" alt="EPS Job Consultancy" className="h-11 w-auto object-contain" />
          <div className="leading-tight hidden sm:block">
            <div className="text-sm font-bold text-white tracking-wide">EPS Job Consultancy</div>
            <div className="text-[9px] font-extrabold text-[#CCA43B] uppercase tracking-wider">Connecting Talent, Creating Futures</div>
          </div>
        </Link>

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
              <span className="h-2 w-2 rounded-full bg-[#CCA43B] animate-pulse" />

              <span>Hi, {user.name}</span>
            </div>
          ) : (
            <Button as={Link} to="/login" variant="primary" className="hidden md:inline-flex">
              Login
            </Button>
          )}

          {!user ? (
            <Button as={Link} to="/login" variant="ghost" className="md:hidden">
              Sign in
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

