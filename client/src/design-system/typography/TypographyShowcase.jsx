import React from 'react'

export const TypographyShowcase = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Typeface</span>
          <h4 className="text-lg font-bold text-gray-900">Inter Family Scale</h4>
        </div>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">weights: 400 | 500 | 600 | 700</span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-50 pb-3">
          <span className="text-xs font-mono text-gray-400 w-32">Display (36px/700)</span>
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight flex-1">
            AI-Powered Talent Matching
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-50 pb-3">
          <span className="text-xs font-mono text-gray-400 w-32">Heading 1 (28px/700)</span>
          <span className="text-2xl font-bold text-gray-900 tracking-tight flex-1">
            Enterprise Recruitment Solutions
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-50 pb-3">
          <span className="text-xs font-mono text-gray-400 w-32">Heading 2 (20px/600)</span>
          <span className="text-xl font-semibold text-gray-900 flex-1">
            Candidate AI Match Performance & Insight
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-50 pb-3">
          <span className="text-xs font-mono text-gray-400 w-32">Body Large (16px/400)</span>
          <span className="text-base text-gray-700 flex-1">
            Accelerate your hiring cycle by 65% with semantic resume parsing and automated candidate scoring.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-50 pb-3">
          <span className="text-xs font-mono text-gray-400 w-32">Body Small (14px/400)</span>
          <span className="text-sm text-gray-600 flex-1">
            Matched based on 14 key engineering competencies, real-world experience, and active availability.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
          <span className="text-xs font-mono text-gray-400 w-32">Caption / Tag (12px/600)</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex-1">
            LAST UPDATED • 2 MINUTES AGO
          </span>
        </div>
      </div>
    </div>
  )
}
