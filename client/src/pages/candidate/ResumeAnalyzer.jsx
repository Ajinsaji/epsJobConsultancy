import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2, BarChart2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please select a resume file to analyze')
      return
    }

    setIsAnalyzing(true)
    const formData = new FormData()
    formData.append('resume', file)

    try {
      const response = await axios.post('/api/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setAnalysisResult(response.data.analysis)
      toast.success('Resume analyzed successfully!')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    if (score >= 60) return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    return 'text-red-400 bg-red-400/10 border-red-400/20'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#CCA43B]" />
          AI Resume Analyzer
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Upload your resume to get an instant ATS compatibility score and improvement suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-slate-950/40 border-white/10">
            <h3 className="text-sm font-bold text-white mb-4">Upload Resume</h3>
            
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center bg-white/5 hover:bg-white/10 transition group cursor-pointer"
              onClick={() => document.getElementById('resume-upload').click()}
            >
              <input id="resume-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-[#0B4C8C]/40 group-hover:text-[#CCA43B] transition">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-white mb-1">
                {file ? file.name : 'Click or drag file here'}
              </p>
              <p className="text-xs text-white/50">
                PDF, DOCX up to 5MB
              </p>
            </div>

            <div className="mt-6">
              <Button 
                variant="primary" 
                className="w-full py-3 flex items-center justify-center gap-2"
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart2 className="h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!analysisResult && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[300px] rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0B4C8C]/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-[#CCA43B] opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-white/80">Awaiting Resume</h3>
                <p className="text-sm text-white/50 mt-2 max-w-sm">
                  Upload your resume to see your ATS score, detected skills, and actionable feedback.
                </p>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full min-h-[300px] rounded-2xl border border-[#CCA43B]/30 bg-[#0B4C8C]/10 flex flex-col items-center justify-center p-8 text-center"
              >
                <Loader2 className="h-10 w-10 text-[#CCA43B] animate-spin mb-4" />
                <h3 className="text-lg font-bold text-[#CCA43B]">Scanning Document...</h3>
                <p className="text-sm text-white/60 mt-2 max-w-sm">
                  Our AI is analyzing formatting, keywords, and overall structure.
                </p>
              </motion.div>
            )}

            {analysisResult && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className={`p-6 border flex items-center justify-between ${getScoreColor(analysisResult.score)}`}>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider opacity-70">Overall ATS Score</div>
                      <div className="text-4xl font-black mt-1">{analysisResult.score}/100</div>
                    </div>
                    <BarChart2 className="h-10 w-10 opacity-30" />
                  </Card>

                  <Card className="p-6 border border-white/10 bg-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-white/50">Detected Skills</div>
                      <div className="text-4xl font-black mt-1 text-white">{analysisResult.skillsCount || 0}</div>
                    </div>
                    <FileText className="h-10 w-10 opacity-30" />
                  </Card>
                </div>

                {/* Feedback lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card className="p-6 border-white/10 bg-white/5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Strengths
                    </h3>
                    <ul className="space-y-3">
                      {analysisResult.strengths?.map((str, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-white/70">
                          <span className="text-emerald-400 shrink-0">✓</span>
                          {str}
                        </li>
                      ))}
                      {(!analysisResult.strengths || analysisResult.strengths.length === 0) && (
                        <li className="text-sm text-white/40">No major strengths detected.</li>
                      )}
                    </ul>
                  </Card>

                  {/* Improvements */}
                  <Card className="p-6 border-white/10 bg-white/5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-3">
                      {analysisResult.improvements?.map((imp, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-white/70">
                          <span className="text-amber-400 shrink-0">•</span>
                          {imp}
                        </li>
                      ))}
                      {(!analysisResult.improvements || analysisResult.improvements.length === 0) && (
                        <li className="text-sm text-emerald-400">Your resume looks perfect!</li>
                      )}
                    </ul>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
