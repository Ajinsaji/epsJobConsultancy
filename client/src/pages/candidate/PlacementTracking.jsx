import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Award, Briefcase, Calendar, CheckCircle2, Circle, ArrowRight, Building2, Download, Upload } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

export default function PlacementTracking() {
  const [placements, setPlacements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlacements()
  }, [])

  const fetchPlacements = async () => {
    try {
      const response = await axios.get('/api/placements/me')
      setPlacements(response.data.placements || [])
    } catch (e) {
      toast.error('Failed to load placement data')
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

  const getStepStatus = (currentStatus, stepStatus) => {
    const statuses = ['Draft', 'Offer Generated', 'Offer Accepted', 'Joined', 'Placed']
    const currentIndex = statuses.indexOf(currentStatus)
    const stepIndex = statuses.indexOf(stepStatus)
    
    if (currentIndex >= stepIndex) return 'completed'
    if (currentIndex === stepIndex - 1) return 'current'
    return 'pending'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Award className="h-6 w-6 text-[#CCA43B]" />
          Placement Tracking
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Track your job offers, upload acceptance letters, and monitor your joining status.
        </p>
      </div>

      {placements.length === 0 ? (
        <GlassCard className="p-12 text-center text-white/50 border-dashed border-2">
          <Award className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <h2 className="text-lg font-bold text-white mb-2">No active placements yet.</h2>
          <p className="text-sm">Keep applying and attending interviews. Your job offers will appear here.</p>
        </GlassCard>
      ) : (
        placements.map(placement => (
          <GlassCard key={placement._id} className="p-0 bg-slate-950/40 border-white/10 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#0B4C8C]/20 to-transparent border-b border-white/10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                    {placement.companyId?.logo ? (
                      <img src={placement.companyId.logo} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-8 h-8 text-white/30" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{placement.jobId?.title || placement.position}</h2>
                    <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-[#CCA43B]" /> {placement.companyId?.companyName || placement.companyName}</span>
                      <span className="flex items-center gap-1"><Award className="w-4 h-4 text-[#CCA43B]" /> {placement.salary || 'Salary pending'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">Status</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#CCA43B]/20 border border-[#CCA43B]/30 text-[#CCA43B] font-black text-sm uppercase tracking-wider">
                    {placement.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
                <div className="space-y-8">
                  
                  {/* Step 1 */}
                  <div className="relative pl-12">
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${getStepStatus(placement.status, 'Offer Generated') === 'completed' ? 'bg-emerald-400 border-emerald-400' : 'bg-slate-900 border-white/20'}`}>
                      {getStepStatus(placement.status, 'Offer Generated') === 'completed' ? <CheckCircle2 className="w-5 h-5 text-slate-900" /> : <Circle className="w-3 h-3 text-white/20" />}
                    </div>
                    <h3 className="font-bold text-white mb-1">Offer Generated</h3>
                    <p className="text-sm text-white/60 mb-3">The company has extended a formal job offer.</p>
                    {placement.offerLetterUrl && (
                      <GlassButton as="a" href={placement.offerLetterUrl} target="_blank" download variant="secondary" className="text-xs flex items-center gap-2 max-w-xs">
                        <Download className="w-3 h-3" /> Download Offer Letter
                      </GlassButton>
                    )}
                  </div>

                  {/* Step 2 */}
                  <div className="relative pl-12">
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${getStepStatus(placement.status, 'Offer Accepted') === 'completed' ? 'bg-emerald-400 border-emerald-400' : 'bg-slate-900 border-white/20'}`}>
                      {getStepStatus(placement.status, 'Offer Accepted') === 'completed' ? <CheckCircle2 className="w-5 h-5 text-slate-900" /> : <Circle className="w-3 h-3 text-white/20" />}
                    </div>
                    <h3 className="font-bold text-white mb-1">Offer Acceptance</h3>
                    <p className="text-sm text-white/60 mb-3">Upload your signed offer letter to accept the job.</p>
                    {getStepStatus(placement.status, 'Offer Accepted') !== 'completed' && placement.status !== 'Draft' && (
                      <div className="flex gap-2">
                        <GlassButton className="text-xs flex items-center gap-2">
                          <Upload className="w-3 h-3" /> Upload Signed Copy
                        </GlassButton>
                      </div>
                    )}
                  </div>

                  {/* Step 3 */}
                  <div className="relative pl-12">
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${getStepStatus(placement.status, 'Joined') === 'completed' ? 'bg-emerald-400 border-emerald-400' : 'bg-slate-900 border-white/20'}`}>
                      {getStepStatus(placement.status, 'Joined') === 'completed' ? <CheckCircle2 className="w-5 h-5 text-slate-900" /> : <Circle className="w-3 h-3 text-white/20" />}
                    </div>
                    <h3 className="font-bold text-white mb-1">Joining Setup</h3>
                    <p className="text-sm text-white/60">
                      {placement.joiningDate 
                        ? `Your scheduled joining date is ${moment(placement.joiningDate).format('MMMM Do, YYYY')}.`
                        : 'Waiting for company to schedule joining date.'}
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative pl-12">
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${getStepStatus(placement.status, 'Placed') === 'completed' ? 'bg-emerald-400 border-emerald-400' : 'bg-slate-900 border-white/20'}`}>
                      {getStepStatus(placement.status, 'Placed') === 'completed' ? <CheckCircle2 className="w-5 h-5 text-slate-900" /> : <Circle className="w-3 h-3 text-white/20" />}
                    </div>
                    <h3 className="font-bold text-white mb-1">Successfully Placed</h3>
                    <p className="text-sm text-white/60">Placement confirmed by EPS and employer.</p>
                  </div>

                </div>
              </div>
            </div>
          </GlassCard>
        ))
      )}
    </div>
  )
}
