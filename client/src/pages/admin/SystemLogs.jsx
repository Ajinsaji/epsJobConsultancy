import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Server, Search, Filter, Download, Activity, Clock, Shield } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import moment from 'moment'

export default function SystemLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/v1/admin/system-logs')
      setLogs(response.data.logs || [])
    } catch (e) {
      toast.error('Failed to load system logs')
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Action']
    const csvContent = [
      headers.join(','),
      ...logs.map(log => [
        moment(log.createdAt).toISOString(),
        log.user || 'System',
        `"${log.action || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `system_logs_${moment().format('YYYYMMDD')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredLogs = logs.filter(log => 
    (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.user || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Server className="h-6 w-6 text-[#CCA43B]" />
            System & Audit Logs
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Track system activities, configuration changes, and administrative actions.
          </p>
        </div>
        <Button variant="secondary" className="flex items-center gap-2" onClick={handleExportCSV}>
          <Download className="h-4 w-4" /> Export Logs
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-950/40 border-white/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by action or user email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="px-4 text-white/70 hover:text-white border border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Last 7 Days
          </Button>
        </div>
      </Card>

      {/* Log Feed */}
      <Card className="overflow-hidden bg-slate-950/40 border-white/10">
        <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Activity Feed</h3>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Monitoring
          </span>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-6 h-6 rounded-full border-2 border-[#CCA43B] border-t-transparent animate-spin" />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              No logs found matching your criteria.
            </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {filteredLogs.map((log, index) => (
                <motion.div 
                  key={log._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-900 text-[#CCA43B] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                    {log.user === 'System' ? <Server className="w-4 h-4" /> : <Shield className="w-4 h-4 text-emerald-400" />}
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#CCA43B]/30 transition shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">
                        {log.user || 'Unknown User'}
                      </span>
                      <span className="text-[10px] font-bold text-white/40 flex items-center gap-1 uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {moment(log.createdAt).format('HH:mm:ss')}
                      </span>
                    </div>
                    <div className="text-xs text-white/70 leading-relaxed">
                      {log.action}
                    </div>
                    <div className="text-[10px] text-white/30 mt-3 pt-2 border-t border-white/5 uppercase tracking-widest font-bold">
                      {moment(log.createdAt).format('MMM D, YYYY')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
