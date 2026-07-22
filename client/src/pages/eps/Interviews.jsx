import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, Building2, User, Search, MapPin, Link2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import moment from 'moment'

export default function Interviews() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('/api/v1/interviews')
      setInterviews(response.data.interviews || [])
    } catch (e) {
      toast.error('Failed to load interviews')
    } finally {
      setLoading(false)
    }
  }

  const filteredInterviews = interviews.filter((i) => {
    const candidateName = `${i.candidateId?.firstName} ${i.candidateId?.lastName}`.toLowerCase()
    const companyName = i.companyId?.companyName?.toLowerCase() || ''
    return candidateName.includes(searchTerm.toLowerCase()) || companyName.includes(searchTerm.toLowerCase())
  })

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled': return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
      case 'completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-white/70 bg-white/5 border-white/10'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-[#CCA43B]" />
          Interview Schedule
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Monitor all upcoming and past interviews across candidates and companies.
        </p>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-950/40 border-white/10">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by candidate or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
      </Card>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32 animate-pulse bg-white/5 border-white/5" />
          ))}
        </div>
      ) : filteredInterviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-[#0B4C8C]/20 flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-[#CCA43B]" />
          </div>
          <h3 className="text-xl font-bold text-white">No interviews found</h3>
          <p className="text-sm text-white/60 mt-2">
            Interviews will appear here once scheduled by EPS Admins.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredInterviews.map((interview, idx) => (
            <motion.div
              key={interview._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-6 bg-slate-950/40 border-white/10 hover:border-[#CCA43B]/30 transition group h-full flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(interview.status)}`}>
                    {interview.status || 'Scheduled'}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-white">{moment(interview.date).format('MMM D')}</div>
                    <div className="text-xs font-bold text-[#CCA43B] uppercase tracking-wider">{moment(interview.date).format('dddd')}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 flex-1">
                  
                  {/* Time & Mode */}
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Clock className="w-4 h-4 text-[#CCA43B]" />
                      {interview.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white capitalize">
                      {interview.mode === 'online' ? (
                        <Video className="w-4 h-4 text-blue-400" />
                      ) : (
                        <MapPin className="w-4 h-4 text-emerald-400" />
                      )}
                      {interview.mode}
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-white/70" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Candidate</div>
                        <div className="text-sm font-bold text-white">
                          {interview.candidateId?.firstName} {interview.candidateId?.lastName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-white/70" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Company</div>
                        <div className="text-sm font-bold text-white">
                          {interview.companyId?.companyName || 'Unknown Company'}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action / Link */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  {interview.mode === 'online' && interview.meetingLink ? (
                    <a 
                      href={interview.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition text-sm font-bold"
                    >
                      <Link2 className="w-4 h-4" /> Join Meeting
                    </a>
                  ) : interview.mode === 'offline' && interview.location ? (
                    <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 p-3 rounded-xl border border-white/5">
                      <MapPin className="w-4 h-4 text-[#CCA43B] shrink-0" />
                      <span className="truncate">{interview.location}</span>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-white/40 italic py-2">
                      No location or link provided
                    </div>
                  )}
                </div>

              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
