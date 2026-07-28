import React from 'react'
import { ArrowRight, User, Building, ShieldCheck } from 'lucide-react'

export const UserJourneyMaps = () => {
  const candidateFlow = ['Landing', 'Register', 'Upload Resume', 'AI Analysis', 'Recommended Jobs', 'Apply', 'Interview', 'Offer']
  const companyFlow = ['Login', 'Create Job', 'AI Matches', 'Shortlist', 'Interview', 'Hire']
  const adminFlow = ['Dashboard', 'Approve Company', 'CMS', 'Analytics', 'Platform Health']

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">User Journeys & Workflow Mapping</span>
          <h4 className="text-lg font-bold text-gray-900">Multi-Persona Ecosystem Flows</h4>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Candidate Flow */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
            <User className="w-4 h-4 text-blue-600" />
            <span>1. CANDIDATE USER JOURNEY</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {candidateFlow.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs">
                  {step}
                </span>
                {idx < candidateFlow.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Company Flow */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>2. COMPANY EMPLOYER JOURNEY</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {companyFlow.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs">
                  {step}
                </span>
                {idx < companyFlow.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Admin Flow */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
            <ShieldCheck className="w-4 h-4 text-slate-800" />
            <span>3. SUPER ADMIN PLATFORM JOURNEY</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {adminFlow.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs">
                  {step}
                </span>
                {idx < adminFlow.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
