import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCredentials, logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password,
      })

      const { user, token } = res.data
      
      if (user.role !== 'eps_admin') {
        toast.error('Access Denied: Only EPS Admins can log in here.')
        return
      }

      dispatch(setCredentials({ token, user }))
      toast.success('Admin authenticated successfully')
      navigate('/eps')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Authentication failed')
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-red-500/20 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md text-white"
      >
        <h2 className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          Secure Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          EPS Admin System Access
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin Email</label>
            <input 
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white shadow-sm outline-none transition duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
              placeholder="admin@eps.com" 
              type="email"
              required
              {...register('email')} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white shadow-sm outline-none transition duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="••••••••"
              required
              {...register('password')}
            />
          </div>

          <button 
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-4 py-3 font-semibold text-white shadow-lg shadow-red-950 transition duration-200 hover:brightness-105 active:scale-[0.98]"
            style={{ minHeight: '44px' }}
          >
            Authenticate Admin
          </button>
        </form>
      </motion.div>
    </div>
  )
}
