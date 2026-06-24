import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { GlassButton } from '../../components/ui/GlassButton'
import GlassCard from '../../components/ui/GlassCard'

function parseSkills(value) {
  return String(value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function toQueryParamSkills(value) {
  const arr = parseSkills(value)
  return arr.join(',')
}

function formatNumber(v) {
  if (v === null || v === undefined) return ''
  return String(v)
}

export default function TalentSearch() {
  const [loading, setLoading] = useState(false)
  const [candidates, setCandidates] = useState([])

  const [keyword, setKeyword] = useState('')
  const [skills, setSkills] = useState('')
  const [location, setLocation] = useState('')
  const [experienceYears, setExperienceYears] = useState('')
  const [availability, setAvailability] = useState('')
  const [expectedSalary, setExpectedSalary] = useState('')
  const [jobCategory, setJobCategory] = useState('')

  const query = useMemo(() => {
    const params = new URLSearchParams()

    if (keyword.trim()) params.set('keyword', keyword.trim())
    if (skills.trim()) params.set('skills', toQueryParamSkills(skills))
    if (location.trim()) params.set('location', location.trim())
    if (experienceYears.trim()) params.set('experienceYears', experienceYears.trim())
    if (availability.trim()) params.set('availability', availability.trim())
    if (expectedSalary.trim()) params.set('expectedSalary', expectedSalary.trim())
    if (jobCategory.trim()) params.set('jobCategory', jobCategory.trim())

    return params
  }, [keyword, skills, location, experienceYears, availability, expectedSalary, jobCategory])

  const fetchCandidates = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/company/talent-search?${query.toString()}`)
      setCandidates(res.data?.candidates || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to search candidates')
      setCandidates([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // optional: load initial empty search
    fetchCandidates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async (candidateId) => {
    try {
      await axios.post(`/api/company/candidates/${candidateId}/save`)
      toast.success('Candidate saved')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save candidate')
    }
  }

  const handleShortlist = async (candidateId) => {
    try {
      await axios.post(`/api/company/candidates/${candidateId}/shortlist`)
      toast.success('Candidate shortlisted')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to shortlist candidate')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Talent Search
        </h1>
        <p className="text-sm text-slate-500">Find candidates by skills, location, availability, and expectations.</p>
      </div>

      <GlassCard className="bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Keyword</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="Search name/title"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Skills</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="React, Node, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Location</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="Exact location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Experience Years</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="e.g. 4"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Availability</label>
            <select
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Immediate">Immediate</option>
              <option value="15 Days">15 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="60+ Days">60+ Days</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Expected Salary (max)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="e.g. 50000"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Job Category</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="e.g. Web Development"
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <GlassButton
            variant="primary"
            onClick={fetchCandidates}
            disabled={loading}
            style={{ minHeight: '44px' }}
          >
            {loading ? 'Searching...' : 'Search'}
          </GlassButton>
        </div>
      </GlassCard>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Results</h2>
          <div className="text-xs font-semibold text-slate-500">{candidates.length} candidates</div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-[210px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">No candidates found.</p>
            <p className="mt-1 text-xs text-slate-500">Try changing your filters.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {candidates.map((c) => (
              <GlassCard key={c._id} className="bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {c.photo ? (
                      <img src={c.photo} alt={c.fullName} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">No Photo</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold text-slate-900 truncate">{c.fullName}</div>
                    <div className="text-xs text-indigo-700 font-semibold">{c.title}</div>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Location: </span>
                    {c.location}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Experience: </span>
                    {formatNumber(c.experienceYears)} years
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Availability: </span>
                    {c.availability}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Expected Salary: </span>
                    {c.expectedSalary ?? 'N/A'}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-semibold text-slate-700">Top Skills</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(c.skills || []).slice(0, 4).map((s, idx) => (
                      <span key={`${s}-${idx}`} className="rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 text-[11px] font-semibold">
                        {s}
                      </span>
                    ))}
                    {(!c.skills || c.skills.length === 0) && (
                      <span className="text-[11px] text-slate-400">No skills provided</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-700">Profile Score</div>
                  <div className="text-sm font-extrabold text-slate-900">{c.profileScore}%</div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <GlassButton
                    as="a"
                    href={`/company/candidates/${c._id}`}
                    variant="ghost"
                    className="col-span-1 text-xs py-2"
                  >
                    View
                  </GlassButton>

                  <GlassButton
                    variant="primary"
                    className="col-span-1 text-xs py-2"
                    onClick={() => handleSave(c._id)}
                  >
                    Save
                  </GlassButton>
                  <GlassButton
                    variant="ghost"
                    className="col-span-1 text-xs py-2 border border-indigo-500/30"
                    onClick={() => handleShortlist(c._id)}
                  >
                    Shortlist
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

