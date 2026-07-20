import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { MessageSquare, Star, CheckCircle2, XCircle, Clock, Download, ChevronRight } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'
import moment from 'moment'

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback/company')
      setFeedbacks(response.data.feedbacks || [])
    } catch (e) {
      toast.error('Failed to load feedback history')
    } finally {
      setLoading(false)
    }
  }

  const getRecommendationIcon = (rec) => {
    if (rec === 'hire') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    if (rec === 'reject') return <XCircle className="h-4 w-4 text-red-400" />
    return <Clock className="h-4 w-4 text-amber-400" />
  }

  const getRecommendationColor = (rec) => {
    if (rec === 'hire') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    if (rec === 'reject') return 'text-red-400 bg-red-400/10 border-red-400/20'
    return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Interview Feedback</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <GlassCard key={i} className="p-6 h-[180px] animate-pulse bg-white/5 border-white/5" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-[#CCA43B]" />
            Interview Feedback
          </h1>
          <p className="text-sm text-white/60 mt-1">
            History of evaluations and recommendations for interviewed candidates.
          </p>
        </div>
        <GlassButton variant="secondary" className="flex items-center gap-2" onClick={() => window.print()}>
          <Download className="h-4 w-4" /> Export Report
        </GlassButton>
      </div>

      {feedbacks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-[#0B4C8C]/20 flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-[#CCA43B]" />
          </div>
          <h3 className="text-xl font-bold text-white">No feedback submitted yet</h3>
          <p className="text-sm text-white/60 mt-2">
            Submit feedback from the Interviews section after completing a candidate interview.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {feedbacks.map((fb, idx) => (
            <motion.div
              key={fb._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="p-6 bg-slate-950/40 border-white/10 hover:border-[#CCA43B]/30 transition group h-full flex flex-col">
                
                {/* Top Section */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      {fb.candidateId?.firstName} {fb.candidateId?.lastName}
                    </h3>
                    <div className="text-sm text-white/60 mt-0.5">
                      Interviewed on {moment(fb.interviewId?.date).format('MMM D, YYYY')}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${getRecommendationColor(fb.recommendation)}`}>
                    {getRecommendationIcon(fb.recommendation)}
                    {fb.recommendation}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= fb.rating ? 'fill-[#CCA43B] text-[#CCA43B]' : 'text-white/20'}`} 
                    />
                  ))}
                  <span className="text-sm font-bold text-white ml-2">{fb.rating}.0</span>
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1">
                  {fb.strengths && fb.strengths.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Strengths</div>
                      <div className="flex flex-wrap gap-2">
                        {fb.strengths.map((s, i) => (
                          <span key={i} className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-1 rounded border border-emerald-400/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {fb.weaknesses && fb.weaknesses.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Areas to Improve</div>
                      <div className="flex flex-wrap gap-2">
                        {fb.weaknesses.map((w, i) => (
                          <span key={i} className="text-xs bg-amber-400/10 text-amber-400 px-2 py-1 rounded border border-amber-400/20">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {fb.notes && (
                    <div>
                      <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Notes</div>
                      <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                        "{fb.notes}"
                      </p>
                    </div>
                  )}
                </div>

              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
