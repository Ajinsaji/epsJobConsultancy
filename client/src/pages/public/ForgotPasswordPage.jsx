import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/auth/forgot-password', data)
      toast.success('Reset instructions sent (demo)')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Request failed')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <input className="w-full rounded-lg border p-2" placeholder="Email" {...register('email')} />
        <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">
          Send reset link
        </button>
      </form>
    </div>
  )
}

