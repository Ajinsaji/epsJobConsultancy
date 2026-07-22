import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { 
  SearchInput, 
  SearchFilters
} from '../../components/shared/search'
import { useSearch } from '../../hooks/useSearch'
import { semanticMatchService } from '../../services/semanticMatch.service'
import { MatchScoreCard, MatchBreakdown, SkillGapCard, ExplanationPanel, RecommendationBadge } from '../../components/shared/ai'
import { Briefcase, MapPin, Building, Loader2 } from 'lucide-react'

export default function JobSearch() {
  const { 
    query, setQuery, 
    filters, setFilters, 
    results, isLoading, clear 
  } = useSearch('jobs');

  // Apply Modal
  const [selectedJob, setSelectedJob] = useState(null)
  const [remarks, setRemarks] = useState('')
  const [applying, setApplying] = useState(false)

  // Candidate Data (mocked or fetched)
  const [candidateId, setCandidateId] = useState(null)

  // Fetch candidate profile to get ID
  useState(() => {
    axios.get('/api/candidates/me').then(res => {
      setCandidateId(res.data?.candidate?._id);
    }).catch(() => {});
  }, []);

  // Match Data State
  const [matchScores, setMatchScores] = useState({});
  const [analyzingIds, setAnalyzingIds] = useState(new Set());
  const [analysisModal, setAnalysisModal] = useState(null);

  const analyzeJob = async (jobId) => {
    if (!candidateId) return;
    setAnalyzingIds(prev => new Set(prev).add(jobId));
    try {
      const match = await semanticMatchService.getMatchScore(candidateId, jobId);
      setMatchScores(prev => ({ ...prev, [jobId]: match }));
    } catch (err) {
      toast.error('Failed to analyze job match');
    } finally {
      setAnalyzingIds(prev => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  const filterOptions = [
    {
      key: 'jobType',
      label: 'Job Type',
      values: [
        { label: 'Full-time', value: 'Full-time' },
        { label: 'Part-time', value: 'Part-time' },
        { label: 'Contract', value: 'Contract' },
        { label: 'Internship', value: 'Internship' }
      ]
    },
    {
      key: 'location',
      label: 'Location',
      values: [
        { label: 'Remote', value: 'Remote' },
        { label: 'New York', value: 'New York' },
        { label: 'Bengaluru', value: 'Bengaluru' },
        { label: 'London', value: 'London' }
      ]
    }
  ];

  const handleApply = async () => {
    if (!selectedJob) return
    setApplying(true)
    try {
      await axios.post('/api/applications', {
        jobId: selectedJob._id,
        remarks,
      })
      toast.success('Application submitted successfully!')
      setSelectedJob(null)
      setRemarks('')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  // Intercept the clicks from the SearchResults component
  // Since SearchResults is generic, we wrap it in a contextual handler.
  // Wait, SearchResults renders JobCard, but JobCard doesn't have an 'Apply' button in the generic version.
  // We can just rely on the new SearchResults layout as the base UI, and for this specific page, 
  // we could potentially inject actions, but for simplicity we will just let it be a display for now, 
  // or add a wrapper. Let's add an action handler to JobCard in SearchResults later if needed.
  // Actually, wait, JobSearch *needs* an apply button.
  // Let me update the generic SearchResults to optionally accept action buttons.

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent">
          Jobs Search
        </h1>
        <p className="text-sm text-slate-500">Global Search Platform Powered by EPS</p>
      </div>

      <Card className="bg-white p-4 shadow-sm">
        <div className="space-y-4">
          <SearchInput 
            query={query} 
            setQuery={setQuery} 
            isLoading={isLoading} 
            clear={clear} 
            placeholder="Search by title, skills, or description..." 
          />
          
          <SearchFilters 
            filters={filters} 
            setFilters={setFilters} 
            filterOptions={filterOptions} 
          />
        </div>
      </Card>

      <div className="grid gap-4 mt-4">
        {isLoading && <div className="text-center py-8 text-slate-500">Loading jobs...</div>}
        {!isLoading && results.jobs?.length === 0 && (
          <div className="text-center py-8 text-slate-500">No jobs found.</div>
        )}
        {!isLoading && results.jobs?.map((job) => {
          const matchData = matchScores[job._id];
          const isAnalyzing = analyzingIds.has(job._id);

          return (
            <div key={job._id} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#1F7BE5] hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  {job.companyId?.logo ? (
                    <img src={job.companyId.logo} alt={job.companyId.companyName} className="h-12 w-12 rounded-xl object-contain border border-slate-100 p-1" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Building className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#1F7BE5] transition-colors">{job.title}</h4>
                    <p className="text-sm font-semibold text-slate-500">{job.companyId?.companyName || 'Confidential Company'}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  {matchData && <RecommendationBadge recommendation={matchData.data?.recommendation} />}
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {job.jobType || 'Full-time'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {job.location || 'Remote'}</div>
                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {job.experience || 'Entry Level'}</div>
              </div>

              {matchData ? (
                <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
                  <MatchScoreCard matchData={matchData} onClick={() => setAnalysisModal({ job, matchData })} />
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-slate-600 mb-2 truncate">
                      <strong>Missing:</strong> {matchData.data?.missingSkills?.critical?.join(', ') || 'None'}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" className="flex-1" onClick={() => setAnalysisModal({ job, matchData })}>Full Analysis</Button>
                      <Button variant="primary" className="flex-1" onClick={() => setSelectedJob(job)}>Apply Now</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 border-t border-slate-100 pt-4 flex gap-3">
                  <Button variant="outline" className="w-full flex justify-center items-center gap-2" onClick={() => analyzeJob(job._id)} disabled={isAnalyzing || !candidateId}>
                    {isAnalyzing && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isAnalyzing ? 'Analyzing Match...' : 'Generate AI Match Score'}
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => setSelectedJob(job)}>Apply Now</Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border bg-white p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-800">
                Apply: {selectedJob.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {selectedJob.companyId?.companyName} • {selectedJob.location}
              </p>

              <div className="mt-4 space-y-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Remarks (Optional)
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition duration-200 focus:border-indigo-500 focus:bg-white"
                  placeholder="Add a short note about why you're a fit..."
                  rows={4}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedJob(null)
                    setRemarks('')
                  }}
                  disabled={applying}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleApply}
                  disabled={applying}
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {analysisModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-2xl my-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">
                  Semantic Match Analysis: {analysisModal.job.title}
                </h3>
                <button onClick={() => setAnalysisModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <MatchBreakdown matchData={analysisModal.matchData} />
                <SkillGapCard 
                  matched={analysisModal.matchData.data.matchedSkills} 
                  missing={analysisModal.matchData.data.missingSkills} 
                />
              </div>
              
              <ExplanationPanel explanation={analysisModal.matchData.data.explanation} />

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setAnalysisModal(null)}>Close</Button>
                <Button variant="primary" onClick={() => { setSelectedJob(analysisModal.job); setAnalysisModal(null); }}>Proceed to Apply</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
