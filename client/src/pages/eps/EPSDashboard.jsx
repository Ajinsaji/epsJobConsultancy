import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { 
  Activity, Users, Briefcase, FileCheck, Calendar, BarChart2, ShieldCheck, 
  Plus, CheckCircle2, Search, ArrowRight, Building, Sparkles 
} from 'lucide-react'
import { EnterpriseTable } from '../../components/dashboard/EnterpriseTable'
import { MatchScoreGauge } from '../../components/dashboard/EnterpriseAIWidgets'

export function EPSDashboard() {
  const [stats, setStats] = useState(null)
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCompanyForm, setShowCompanyForm] = useState(false)

  const loadAllData = async () => {
    try {
      setLoading(true)
      const [statsRes, jobsRes, appsRes, intsRes] = await Promise.all([
        axios.get('/api/v1/public/stats').catch(() => ({ data: {} })),
        axios.get('/api/v1/jobs').catch(() => ({ data: [] })),
        axios.get('/api/v1/applications').catch(() => ({ data: [] })),
        axios.get('/api/v1/interviews').catch(() => ({ data: [] })),
      ])

      setStats(statsRes.data)
      setJobs(jobsRes.data?.jobs || [])
      setApplications(appsRes.data?.applications || [])
      setInterviews(intsRes.data?.interviews || [])
    } catch (err) {
      console.error('Failed to load EPS telemetry:', err)
      toast.error('Failed to sync telemetry metrics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 py-4">
        <div className="h-10 w-64 animate-pulse rounded-xl bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    )
  }

  const appTableColumns = [
    { key: 'candidate', label: 'Candidate', render: (val, row) => (
      <div>
        <p className="font-bold text-gray-900">{row.candidateId?.fullName || 'Candidate'}</p>
        <p className="text-[10px] text-gray-400">{row.candidateId?.phone || 'No Phone'}</p>
      </div>
    )},
    { key: 'job', label: 'Applied Role', render: (val, row) => (
      <div>
        <p className="font-bold text-gray-800">{row.jobId?.title || 'Role'}</p>
        <p className="text-[10px] text-gray-400">{row.companyId?.companyName || 'EPS Client'}</p>
      </div>
    )},
    { key: 'status', label: 'Workflow Status', render: (val, row) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
        row.status === 'Selected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
        row.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
        row.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
        'bg-amber-50 text-amber-700 border border-amber-200'
      }`}>
        {row.status || 'Applied'}
      </span>
    )},
  ]

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans space-y-8 pb-16">
      
      {/* 1. Telemetry Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest block">System Telemetry & Controls</span>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Super Admin Platform Console</h2>
          <p className="text-xs text-gray-500 font-medium">Real-time candidate pipelines, enterprise partner accounts, and platform health.</p>
        </div>

        <button 
          onClick={() => setShowCompanyForm(!showCompanyForm)}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-2xs transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showCompanyForm ? 'View Pipeline' : 'Register Enterprise Partner'}</span>
        </button>
      </div>

      {/* 2. Platform Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Candidates</span>
          <p className="text-3xl font-extrabold text-[#2563EB]">{stats?.candidates ?? 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Companies</span>
          <p className="text-3xl font-extrabold text-gray-900">{stats?.companies ?? 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Jobs</span>
          <p className="text-3xl font-extrabold text-emerald-600">{stats?.openJobs ?? 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Applications</span>
          <p className="text-3xl font-extrabold text-indigo-600">{stats?.applications ?? 0}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Interviews</span>
          <p className="text-3xl font-extrabold text-amber-600">{stats?.interviews ?? 0}</p>
        </div>
      </div>

      {/* 3. Pipeline Review Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-gray-900">Application Pipeline Telemetry</h3>
          <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer" onClick={() => window.location.href = '/eps/applications'}>
            View All Applications →
          </span>
        </div>

        <EnterpriseTable
          columns={appTableColumns}
          data={applications}
          searchPlaceholder="Search candidate application telemetry..."
        />
      </div>

    </div>
  )
}

export default EPSDashboard
