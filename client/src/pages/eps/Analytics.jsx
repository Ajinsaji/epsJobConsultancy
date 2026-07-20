import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { PieChart, TrendingUp, Users, Briefcase, Building2, Calendar, Target, Award, ArrowUpRight } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import moment from 'moment'

export default function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics/dashboard')
      setData(response.data)
    } catch (e) {
      toast.error('Failed to load analytics data')
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

  const { kpis, applicationStatusDistribution, recentPlacements } = data

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <GlassCard className="p-6 bg-slate-950/40 border-white/10 relative overflow-hidden group hover:border-[#CCA43B]/30 transition">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0B4C8C]/20 rounded-full blur-2xl group-hover:bg-[#CCA43B]/20 transition" />
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-bold text-white/50 uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-black text-white">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-400">
              <TrendingUp className="w-3 h-3" /> {trend} this month
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
          <Icon className="w-6 h-6 text-[#CCA43B]" />
        </div>
      </div>
    </GlassCard>
  )

  // Calculate percentages for the CSS "chart"
  const totalAppsForChart = Object.values(applicationStatusDistribution || {}).reduce((a, b) => a + b, 0)
  const getPercentage = (count) => totalAppsForChart ? ((count / totalAppsForChart) * 100).toFixed(1) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <PieChart className="h-6 w-6 text-[#CCA43B]" />
          Platform Analytics
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Real-time metrics and performance insights across the entire ecosystem.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Placements" value={kpis.totalPlacements} icon={Award} trend="+12%" />
        <StatCard title="Active Jobs" value={kpis.totalJobs} icon={Briefcase} trend="+5%" />
        <StatCard title="Candidates" value={kpis.totalCandidates} icon={Users} trend="+24%" />
        <StatCard title="Partner Companies" value={kpis.totalCompanies} icon={Building2} trend="+3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Application Funnel Chart (CSS Based) */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 bg-slate-950/40 border-white/10 h-full">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#CCA43B]" />
              Application Pipeline Distribution
            </h3>
            
            <div className="space-y-6">
              {Object.entries(applicationStatusDistribution || {}).map(([status, count], idx) => {
                const percentage = getPercentage(count)
                return (
                  <div key={status} className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-white bg-white/10 border border-white/5">
                          {status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold inline-block text-white">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B]"
                      />
                    </div>
                  </div>
                )
              })}

              {totalAppsForChart === 0 && (
                <div className="text-center py-10 text-white/40 text-sm">
                  No application data available yet.
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <div>
                <p className="text-xs text-white/50 uppercase font-bold tracking-wider mb-1">Overall Success Rate</p>
                <div className="text-2xl font-black text-emerald-400">{kpis.successRate}%</div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50 uppercase font-bold tracking-wider mb-1">Total Applications</p>
                <div className="text-2xl font-black text-white">{kpis.totalApplications}</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Placements Feed */}
        <div className="lg:col-span-1">
          <GlassCard className="p-6 bg-[#0B4C8C]/10 border-[#0B4C8C]/30 h-full">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#CCA43B]" />
              Recent Placements
            </h3>
            
            <div className="space-y-4">
              {recentPlacements && recentPlacements.length > 0 ? (
                recentPlacements.map((placement, idx) => (
                  <motion.div 
                    key={placement._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#CCA43B]/40 transition group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-white group-hover:text-[#CCA43B] transition">
                        {placement.candidateName}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#CCA43B] transition" />
                    </div>
                    <div className="text-xs text-white/70 mb-1">{placement.position}</div>
                    <div className="text-xs font-bold text-[#CCA43B]">{placement.companyName}</div>
                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-wider">
                      <span>Joined {moment(placement.joiningDate).format('MMM YYYY')}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 text-white/40 text-sm">
                  No recent placements found.
                </div>
              )}
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}
