import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Users, Search, Filter, Download, MoreVertical, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import moment from 'moment'

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/admin/candidates')
      setCandidates(response.data || [])
    } catch (e) {
      toast.error('Failed to load candidates')
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Location', 'Experience', 'Registered Date']
    const csvContent = [
      headers.join(','),
      ...candidates.map(c => [
        c.firstName,
        c.lastName,
        c.userId?.email || '',
        c.phone || '',
        `"${c.location || ''}"`,
        c.experienceLevel || '',
        moment(c.createdAt).format('YYYY-MM-DD')
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'eps_candidates.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = 
      c.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Status filter logic (assuming we add placement status or profile completion later)
    // For now, if 'all', just return matchesSearch
    return matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-[#CCA43B]" />
            Manage Candidates
          </h1>
          <p className="text-sm text-white/60 mt-1">
            View and manage all registered candidates on the platform.
          </p>
        </div>
        <Button variant="secondary" className="flex items-center gap-2" onClick={handleExportCSV}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-950/40 border-white/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition appearance-none"
            >
              <option value="all">All Candidates</option>
              <option value="placed">Placed</option>
              <option value="active">Actively Looking</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden bg-slate-950/40 border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase font-bold text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Registered</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#CCA43B] border-t-transparent animate-spin" />
                      Loading candidates...
                    </div>
                  </td>
                </tr>
              ) : filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-white/50">
                    No candidates found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => (
                  <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B4C8C] to-[#CCA43B] flex items-center justify-center text-white font-bold text-sm">
                          {c.firstName?.charAt(0)}{c.lastName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{c.firstName} {c.lastName}</div>
                          <div className="text-xs text-white/50">{c.currentJobTitle || 'No title set'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{c.userId?.email}</div>
                      <div className="text-xs text-white/50">{c.phone || 'No phone'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white capitalize">{c.experienceLevel || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{moment(c.createdAt).format('MMM D, YYYY')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition" title="View Profile">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-white/70 hover:text-amber-400 transition" title="Suspend/Flag">
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
