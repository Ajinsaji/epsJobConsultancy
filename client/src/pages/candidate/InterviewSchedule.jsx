import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Calendar, Video, MapPin, Clock, Briefcase, FileText, ExternalLink, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function InterviewSchedule() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('/api/interviews/me')
      setInterviews(response.data.interviews || [])
    } catch (e) {
      toast.error('Failed to load interview schedule')
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

  const upcoming = interviews.filter(i => i.status === 'Scheduled' || i.status === 'Rescheduled')
  const past = interviews.filter(i => i.status === 'Completed' || i.status === 'Cancelled')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-[#CCA43B]" />
          Interview Schedule
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Manage your upcoming interviews and review past feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Upcoming Interviews</h2>
          
          {upcoming.length === 0 ? (
            <Card className="p-10 text-center text-white/50 border-dashed border-2">
              <Calendar className="w-10 h-10 mx-auto mb-4 opacity-20" />
              <p>No upcoming interviews scheduled right now.</p>
              <p className="text-xs mt-2">Keep applying to jobs to increase your chances!</p>
            </Card>
          ) : (
            upcoming.map(interview => (
              <Card key={interview._id} className="p-6 bg-slate-950/40 border-l-4 border-l-[#CCA43B] border-t-white/10 border-r-white/10 border-b-white/10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {interview.applicationId?.jobId?.title || 'Position'}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Briefcase className="w-4 h-4 text-[#CCA43B]" />
                      <span>{interview.applicationId?.companyId?.companyName || 'Partner Company'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#CCA43B]">
                      {moment(interview.interviewDate).format('DD MMM')}
                    </div>
                    <div className="text-sm font-bold text-white/80">
                      {moment(interview.interviewDate).format('hh:mm A')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Clock className="w-4 h-4" />
                    <span>{moment(interview.interviewDate).fromNow()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    {interview.mode === 'Online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    <span>{interview.mode}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {interview.meetingLink && interview.mode === 'Online' && (
                    <Button as="a" href={interview.meetingLink} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2">
                      <Video className="w-4 h-4" /> Join Meeting
                    </Button>
                  )}
                  {interview.location && interview.mode === 'Offline' && (
                    <Button variant="secondary" className="flex-1 flex justify-center items-center gap-2">
                      <MapPin className="w-4 h-4" /> View Location
                    </Button>
                  )}
                  <Button variant="danger" outline className="px-4">
                    Request Reschedule
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Tips & Past */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#0B4C8C]/20 to-[#CCA43B]/20 border-white/10">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#CCA43B]" />
              Preparation Tips
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Test your camera and microphone 15 mins before online interviews.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Keep a digital copy of your resume open.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Research the company profile and values thoroughly.</span>
              </li>
            </ul>
          </Card>

          <div>
            <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">Past Interviews</h2>
            <div className="space-y-4">
              {past.length === 0 ? (
                <div className="text-center py-6 text-sm text-white/40">No past interviews.</div>
              ) : (
                past.map(interview => (
                  <Card key={interview._id} className="p-4 bg-white/5 border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white text-sm">
                        {interview.applicationId?.jobId?.title}
                      </h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${interview.status === 'Completed' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'}`}>
                        {interview.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/50">
                      {moment(interview.interviewDate).format('MMM D, YYYY')}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
