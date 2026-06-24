import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'
import { useFieldArray, useForm } from 'react-hook-form'

function ProjectsEditor({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  })

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
        Projects
      </div>

      {fields.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">
              Project {idx + 1}
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 active:scale-[0.98]"
              onClick={() => remove(idx)}
            >
              Remove Project
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Project Title
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-indigo-500"
                placeholder="e.g. Job Portal App"
                {...register(`projects.${idx}.title`)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Technologies
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-indigo-500"
                placeholder="React, Node, MongoDB"
                {...register(`projects.${idx}.technologiesText`)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Project Description
            </label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-indigo-500"
              placeholder="Describe what you built and your impact..."
              {...register(`projects.${idx}.description`)}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="mt-1 w-full rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-500/15 active:scale-[0.98]"
        onClick={() =>
          append({
            title: '',
            description: '',
            technologies: [],
            technologiesText: '',
          })
        }
      >
        + Add Project
      </button>
    </div>
  )
}

function CertificationsEditor({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  })

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
        Certifications
      </div>

      {fields.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">
              Certification {idx + 1}
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 active:scale-[0.98]"
              onClick={() => remove(idx)}
            >
              Remove Certification
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Certification Title
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-indigo-500"
                placeholder="e.g. AWS Certified Developer"
                {...register(`certifications.${idx}.title`)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Issuer
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-indigo-500"
                placeholder="e.g. Amazon Web Services"
                {...register(`certifications.${idx}.issuer`)}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="mt-1 w-full rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-500/15 active:scale-[0.98]"
        onClick={() =>
          append({
            title: '',
            issuer: '',
          })
        }
      >
        + Add Certification
      </button>
    </div>
  )
}

export default function CandidateProfile() {
  const { register, handleSubmit, reset, control, watch } = useForm()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState(null)
  const [completion, setCompletion] = useState(0)

  const computeCompletion = (p) => {
    // Best-effort completion score based on which fields are present.
    // Includes Phase E.1 talent-search fields to improve accuracy.
    const fields = [
      // Existing
      p?.fullName,
      p?.email,
      p?.phone,
      p?.education,
      p?.experience,
      p?.skills,
      p?.languages,
      p?.resume,
      p?.photo,

      // Phase E.1
      p?.title,
      p?.location,
      typeof p?.experienceYears === 'number' ? p?.experienceYears : undefined,
      p?.availability,
      typeof p?.expectedSalary === 'number' ? p?.expectedSalary : undefined,
      p?.jobCategories,
      p?.projects,
      p?.certifications,
    ]

    const filled = fields.reduce((acc, v) => {
      if (Array.isArray(v)) return acc + (v.length > 0 ? 1 : 0)
      if (typeof v === 'number') return acc + (!Number.isNaN(v) && v > -1 ? 1 : 0)
      return acc + (v ? 1 : 0)
    }, 0)

    return fields.length === 0 ? 0 : Math.round((filled / fields.length) * 100)
  }




  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/candidates/me')
      const p = res.data?.candidate || {}
      setProfile(p)
      setCompletion(computeCompletion(p))
      // Format skills and languages arrays as comma separated strings for editing
      reset({

        fullName: p.fullName || '',
        email: p.email || '',
        phone: p.phone || '',
        dob: p.dob ? new Date(p.dob).toISOString().substring(0, 10) : '',
        gender: p.gender || '',
        address: p.address || '',
        education: p.education || '',
        experience: p.experience || '',

        // Phase E.1
        title: p.title || '',
        location: p.location || '',
        experienceYears: typeof p.experienceYears === 'number' ? String(p.experienceYears) : '',
        availability: p.availability || '',
        expectedSalary: typeof p.expectedSalary === 'number' ? String(p.expectedSalary) : '',
        jobCategories: p.jobCategories ? p.jobCategories.join(', ') : '',

        projects: p.projects && Array.isArray(p.projects)
          ? p.projects.map((proj) => ({
              title: proj?.title || '',
              description: proj?.description || '',
              technologies: Array.isArray(proj?.technologies) ? proj.technologies : [],
              technologiesText: Array.isArray(proj?.technologies) ? proj.technologies.join(', ') : '',
            }))
          : [],
        certifications:
          p.certifications && Array.isArray(p.certifications)
            ? p.certifications.map((c) => ({
                title: c?.title || '',
                issuer: c?.issuer || '',
              }))
            : [],

        // Existing
        skills: p.skills ? p.skills.join(', ') : '',
        languages: p.languages ? p.languages.join(', ') : '',
        resumePath: p.resume || '',
        photoPath: p.photo || '',
      })


    } catch (err) {
      toast.error('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const res = await axios.put('/api/candidates/profile', data)
      toast.success('Profile updated successfully!')
      const updated = res.data?.profile
      setProfile(updated)
      setCompletion(computeCompletion(updated))

    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-96 animate-pulse rounded-xl bg-slate-200" />
      </div>
    )
  }

  return (
    <div className="space-y-6 py-4 max-w-3xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent">
            Candidate Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">Update your profile to unlock better opportunities.</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Profile</div>
            <div className="mt-1 text-lg font-extrabold text-slate-900">{completion}%</div>
          </div>
          <Link to="/candidate">
            <GlassButton variant="ghost">Back to Dashboard</GlassButton>
          </Link>
        </div>
      </div>


      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard className="bg-white p-6 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  placeholder="John Doe"
                  required
                  {...register('fullName')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  {...register('email')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone Number</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  placeholder="+1 (555) 000-0000"
                  {...register('phone')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Date of Birth</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  type="date"
                  {...register('dob')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Gender</label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  {...register('gender')}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Address</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  placeholder="123 Main St, New York, NY"
                  {...register('address')}
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Phase E.1 additions (Talent Search fields) */}
            <div className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Professional Title</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="e.g. MERN Stack Developer"
                    {...register('title')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Location</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="e.g. Bengaluru, India"
                    {...register('location')}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Experience Years</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="e.g. 4"
                    {...register('experienceYears')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Availability</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    {...register('availability')}
                  >
                    <option value="">Select availability</option>
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60+ Days">60+ Days</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Expected Salary</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="e.g. 80000"
                    {...register('expectedSalary')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Job Categories</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="comma separated, e.g. Web Development, UI/UX"
                    {...register('jobCategories')}
                  />
                </div>
              </div>

              <ProjectsEditor control={register} />

              <CertificationsEditor control={register} />


              <hr className="border-slate-100" />

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Education</label>
                <textarea
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  placeholder="Degree, Major - University (Graduation Year)"
                  rows={2}
                  {...register('education')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Work Experience</label>
                <textarea
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  placeholder="Describe your previous job roles, companies, and timelines..."
                  rows={4}
                  {...register('experience')}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Skills (comma separated)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="React, Node.js, Mongoose, CSS"
                    {...register('skills')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Languages (comma separated)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="English, Spanish, French"
                    {...register('languages')}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Resume File Link / Path</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="/uploads/resume.pdf"
                    {...register('resumePath')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Photo URL / Path</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                    placeholder="/uploads/photo.jpg"
                    {...register('photoPath')}
                  />
                </div>
              </div>
            </div>


            <div className="flex justify-end pt-4">
              <GlassButton
                variant="primary"
                type="submit"
                disabled={saving}
                style={{ minHeight: '44px' }}
              >
                {saving ? 'Saving...' : 'Save Profile Changes'}
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
