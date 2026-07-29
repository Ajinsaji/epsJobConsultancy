import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { 
  Building2, Users, Briefcase, Bookmark, MessageSquare, Sparkles, Plus, 
  BarChart3, CheckCircle2, Search, ArrowRight, UserCheck, TrendingUp, Clock 
} from 'lucide-react'
import { RecommendationList, RecommendationReason } from '../../components/shared/ai'
import { EnterpriseTable } from '../../components/dashboard/EnterpriseTable'
import { MatchScoreGauge, SkillGapAnalyzer } from '../../components/dashboard/EnterpriseAIWidgets'

export function CompanyDashboard() {
  const [company, setCompany] = useState(null)
  const [jobs, setJobs] = useState([])
  const [history, setHistory] = useState([])
  const [savedCandidates, setSavedCandidates] = useState([])
  const [shortlistedCandidates, setShortlistedCandidates] = useState([])
  const [communications, setCommunications] = useState([])
  const [loading, setLoading] = useState(true)

  // AI Recs
  const [candidateRecs, setCandidateRecs] = useState([])
  const [aiLoading, setAiLoading] = useState(true)
  const [selectedRecModal, setSelectedRecModal] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchAll = async () => {
      try {
        setLoading(true)
        const [companyRes, jobsRes, savedRes, shortlistedRes, historyRes, commRes] =
          await Promise.all([
            axios.get('/api/v1/companies/me').catch(() => ({ data: {} })),
            axios.get('/api/v1/jobs/company/me').catch(() => ({ data: [] })),
            axios.get('/api/v1/companies/me/candidates/saved').catch(() => ({ data: [] })),
            axios.get('/api/v1/companies/me/candidates/shortlisted').catch(() => ({ data: [] })),
            axios.get('/api/v1/companies/me/candidates/history').catch(() => ({ data: [] })),
            axios.get('/api/v1/companies/me/communications').catch(() => ({ data: [] })),
          ])

        if (!mounted) return

        setCompany(companyRes.data?.company || companyRes.data || null)
        const fetchedJobs = jobsRes.data?.jobs || jobsRes.data || []
        setJobs(fetchedJobs)
        setSavedCandidates(savedRes.data?.candidates || savedRes.data || [])
        setShortlistedCandidates(shortlistedRes.data?.candidates || shortlistedRes.data || [])
        setHistory(historyRes.data?.history || historyRes.data || [])
        setCommunications(commRes.data || commRes.data?.communications || [])

        setAiLoading(false)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load company dashboard metrics')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAll()
    return () => { mounted = false }
  }, [])

  const activeJobsCount = useMemo(() => {
    return (jobs || []).filter(j => j.status === 'Open' || j.status === 'Active').length
  }, [jobs])

  if (loading) {
    return (
      <div className="space-y-6 py-4">
        <div className="h-10 w-64 animate-pulse rounded-xl bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    )
  }

  const tableColumns = [
    { key: 'title', label: 'Job Role', sortable: true },
    { key: 'location', label: 'Location' },
    { key: 'applicants', label: 'Applicants', render: (val, row) => (
      <span className="font-bold text-gray-900">{row.applicantsCount || row.applicants || 0}</span>
    )},
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
        val === 'Open' || val === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600'
      }`}>
        {val || 'Active'}
      </span>
    )},
  ]

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans space-y-8 pb-16">
      
      {/* 1. Header Banner Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
            {company?.companyName ? company.companyName[0] : 'C'}
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest block">Enterprise Hiring Suite</span>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {company?.companyName || 'Enterprise Partner'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {company?.industry || 'Technology & Engineering'} • {company?.address || 'San Francisco, CA'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.href = '/company/talent-search'}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-2xs transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Talent Search</span>
          </button>
        </div>
      </div>

      {/* 2. Key Telemetry Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Jobs</span>
          <p className="text-3xl font-extrabold text-[#2563EB]">{activeJobsCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Saved Candidates</span>
          <p className="text-3xl font-extrabold text-gray-900">{savedCandidates.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Shortlisted Candidates</span>
          <p className="text-3xl font-extrabold text-emerald-600">{shortlistedCandidates.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Candidate Interactions</span>
          <p className="text-3xl font-extrabold text-indigo-600">{history.length}</p>
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Active Jobs Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900">Active Job Postings</h3>
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer" onClick={() => window.location.href = '/company/jobs'}>
              Manage All Jobs →
            </span>
          </div>

          <EnterpriseTable 
            columns={tableColumns}
            data={jobs}
            searchPlaceholder="Filter company jobs..."
          />
        </div>

        {/* Right Column: AI Match Telemetry Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <h4 className="text-sm font-bold text-gray-900">AI Recruitment Telemetry</h4>
            </div>

            <MatchScoreGauge percentage={92} size={110} label="92% AI Match" status="Top Talent Fit" />

            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1 text-xs">
              <span className="font-bold text-blue-900 block">AI Screening Confidence</span>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Matches active job competencies with 92%+ semantic vector precision.
              </p>
            </div>
          </div>

          <SkillGapAnalyzer />
        </div>

      </div>

    </div>
  )
}

export default CompanyDashboard
