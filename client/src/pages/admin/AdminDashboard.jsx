import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ShieldCheck, Activity, Users, Building2, Briefcase, FileText, Database, Server, ChevronRight } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'
import moment from 'moment'

export default function AdminDashboard() {
  const [healthData, setHealthData] = useState(null)
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [healthRes, activityRes] = await Promise.all([
        axios.get('/api/admin/health'),
        axios.get('/api/admin/activities')
      ])
      
      if (healthRes.data.success) {
        setHealthData(healthRes.data.data)
      }
      setActivities(activityRes.data || [])
    } catch (e) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-4 border-[#CCA43B] border-t-transparent animate-spin" />
      </div>
    )
  }

  const { overview, health } = healthData || {}

  const StatCard = ({ title, value, icon: Icon, to }) => (
    <GlassCard className="p-5 bg-slate-950/40 border-white/10 hover:border-[#CCA43B]/30 transition group">
      <Link to={to} className="flex justify-between items-center h-full">
        <div>
          <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-black text-white group-hover:text-[#CCA43B] transition">{value || 0}</h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white/40 group-hover:text-[#CCA43B] transition" />
        </div>
      </Link>
    </GlassCard>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-[#CCA43B]" />
          Super Admin Control Panel
        </h1>
        <p className="text-sm text-white/60 mt-1">
          System health, quick metrics, and latest platform activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Health */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Candidates" value={overview?.totalCandidates} icon={Users} to="/admin/users" />
            <StatCard title="Companies" value={overview?.totalEmployers} icon={Building2} to="/admin/companies" />
            <StatCard title="Active Jobs" value={overview?.totalJobs} icon={Briefcase} to="/admin/jobs" />
            <StatCard title="Partners" value={overview?.totalPartners} icon={ShieldCheck} to="/admin/companies" />
          </div>

          {/* System Health */}
          <GlassCard className="p-6 bg-slate-950/40 border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#CCA43B]" />
              System Health Overview
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* API Status */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center mb-3">
                  <Activity className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">API Status</div>
                <div className="text-lg font-black text-white">{health?.apiStatus || 'Healthy'}</div>
              </div>

              {/* DB Status */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${health?.dbStatus === 'Connected' ? 'bg-emerald-400/20' : 'bg-red-400/20'}`}>
                  <Database className={`w-6 h-6 ${health?.dbStatus === 'Connected' ? 'text-emerald-400' : 'text-red-400'}`} />
                </div>
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Database</div>
                <div className="text-lg font-black text-white">{health?.dbStatus || 'Unknown'}</div>
              </div>

              {/* CMS Status */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Homepage CMS</div>
                <div className="text-lg font-black text-white">{health?.homepageConfigStatus || 'Default'}</div>
                <div className="text-[10px] text-white/40 mt-1">
                  {health?.visibleSectionsCount || 0} active sections
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-1">
          <GlassCard className="p-6 bg-slate-950/40 border-white/10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#CCA43B]" />
                Recent Activity
              </h3>
              <Link to="/admin/system-logs" className="text-xs font-bold text-[#CCA43B] hover:text-white transition">
                View All
              </Link>
            </div>
            
            <div className="flex-1 space-y-4">
              {activities.length > 0 ? (
                activities.map((act) => (
                  <div key={act._id} className="relative pl-4 border-l-2 border-[#CCA43B]/30 pb-4 last:pb-0 last:border-transparent">
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#CCA43B] -left-[6px] top-1" />
                    <div className="text-xs font-bold text-white/50 mb-1">
                      {moment(act.createdAt).fromNow()} • {act.user}
                    </div>
                    <div className="text-sm text-white/90 leading-snug">
                      {act.action}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-white/40 text-sm">
                  No recent activities logged.
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <GlassButton variant="secondary" as={Link} to="/admin/system-logs" className="w-full flex justify-center items-center gap-2 text-xs">
                Open Full System Logs <ChevronRight className="w-3 h-3" />
              </GlassButton>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}
