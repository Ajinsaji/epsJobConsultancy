import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'

export default function DashboardLayout() {
  const { token } = useSelector(selectAuth)

  return (
    <div className="min-h-screen bg-[radial-gradient(900px_circle_at_10%_10%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(800px_circle_at_90%_20%,rgba(139,92,246,0.18),transparent_40%),radial-gradient(600px_circle_at_50%_90%,rgba(6,182,212,0.14),transparent_45%)] bg-[#0F172A] text-white">
      <Navbar />
      <div className="mx-auto flex max-w-6xl gap-0 px-0">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8">
          {!token ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              You need to log in.
            </motion.div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  )
}

