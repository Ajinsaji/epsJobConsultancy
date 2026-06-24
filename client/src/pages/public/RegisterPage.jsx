import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/auth/register', data)
      toast.success('Account created. Please login.')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">Register</h2>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <input className="w-full rounded-lg border p-2" placeholder="Name" {...register('name')} />
        <input className="w-full rounded-lg border p-2" placeholder="Email" {...register('email')} />
        <input className="w-full rounded-lg border p-2" placeholder="Phone" {...register('phone')} />
        <input type="hidden" {...register('role')} value="candidate" />

        <input
          type="password"
          className="w-full rounded-lg border p-2"
          placeholder="Password"
          {...register('password')}
        />
        <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">
          Create account
        </button>
      </form>
    </div>
  )
}

