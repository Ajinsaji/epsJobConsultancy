import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [clickTimes, setClickTimes] = useState([])

  const handleBetamindClick = () => {
    const now = Date.now()
    const validClicks = [...clickTimes.filter((t) => now - t < 3000), now]
    setClickTimes(validClicks)
    if (validClicks.length >= 3) {
      navigate('/admin-login')
    }
  }

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/auth/login', data)
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }))
      toast.success('Logged in successfully')
      
      const role = res.data?.user?.role
      if (role === 'candidate') {
        navigate('/candidate')
      } else if (role === 'company') {
        navigate('/company')
      } else if (role === 'eps_admin') {
        navigate('/eps')
      } else {
        navigate('/')
      }
      } catch (e) {
      toast.error(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-white/20 bg-white/40 p-8 shadow-xl backdrop-blur-md"
      >

        <h2 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Sign in to find your next opportunity
        </p>

        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
            <input 
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              placeholder="name@example.com" 
              type="email"
              required
              {...register('email')} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="••••••••"
              required
              {...register('password')}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to="/forgot-password">
              Forgot your password?
            </Link>
          </div>

          <button 
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:brightness-105 active:scale-[0.98]"
            style={{ minHeight: '44px' }}
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have a candidate account?{' '}
          <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to="/register">
            Register here
          </Link>
        </p>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-slate-400 select-none">
        Powered by{' '}
        <span 
          onClick={handleBetamindClick} 
          style={{ cursor: 'text' }}
          className="font-medium text-slate-400 hover:text-slate-400 transition-colors"
        >
          Betamind
        </span>{' '}
        Tech Solutions
      </footer>
    </div>
  )
}

