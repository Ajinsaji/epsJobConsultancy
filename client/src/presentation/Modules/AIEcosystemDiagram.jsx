import React from 'react'
import { ArrowRight, Cpu, Sparkles, Award } from 'lucide-react'

export const AIEcosystemDiagram = () => {
  const nodes = [
    'Resume Upload', 
    'Resume Intelligence', 
    'Semantic Matching', 
    'Recommendation Engine', 
    'Interview Intelligence', 
    'Learning Suggestions', 
    'Hiring Analytics'
  ]

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-xl text-white shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-bold">End-to-End AI Recruitment Ecosystem</h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
          Neural Matching Engine v2.0
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl text-xs font-bold text-white shadow-md hover:bg-white/20 transition text-center flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{node}</span>
            </div>
            {idx < nodes.length - 1 && <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export const VisionSlide = () => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border border-slate-800 space-y-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-transparent pointer-events-none"></div>

      <span className="inline-flex items-center gap-2 bg-blue-600/30 text-blue-300 border border-blue-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
        <Award className="w-4 h-4 text-yellow-400" /> Executive Vision
      </span>

      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
        EPS Workforce Solutions
      </h2>

      <p className="text-base md:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
        Enterprise AI Recruitment SaaS Platform powering talent acquisition for global organizations.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        {['AI Driven', 'Cloud Native', 'Responsive', 'Scalable', 'Secure', 'Future Ready'].map((pill, idx) => (
          <span key={idx} className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold">
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}
