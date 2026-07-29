import React from 'react'
import { Sparkles, Brain, AlertTriangle, BookOpen, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react'

// 1. AI Match Score Circular Gauge
export const MatchScoreGauge = ({ percentage = 94, size = 100, label = "94% Match", status = "Excellent Fit" }) => {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={7}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2563EB"
            strokeWidth={7}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center text-center">
          <span className="text-xl font-extrabold text-gray-900 leading-none">{percentage}%</span>
          <span className="text-[9px] font-bold text-emerald-600 mt-0.5 uppercase tracking-wider">{status}</span>
        </div>
      </div>
    </div>
  )
}

// 2. Skill Gap Analyzer
export const SkillGapAnalyzer = ({ skills = [] }) => {
  const defaultSkills = [
    { name: 'React 18 & TypeScript', current: 95, target: 90, status: 'Strong' },
    { name: 'GraphQL & Next.js SSR', current: 70, target: 85, status: 'Improvement Suggested' },
    { name: 'AWS & Microservices', current: 85, target: 80, status: 'Met' },
  ]
  const skillList = skills.length > 0 ? skills : defaultSkills

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-gray-900">AI Skill Gap Analysis</h4>
        </div>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          Target Fit Target
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {skillList.map((sk, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between font-semibold text-gray-700">
              <span>{sk.name}</span>
              <span className={sk.current >= sk.target ? 'text-emerald-600' : 'text-amber-600'}>
                {sk.current}% / {sk.target}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  sk.current >= sk.target ? 'bg-blue-600' : 'bg-amber-500'
                }`}
                style={{ width: `${sk.current}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 3. Explainable AI Explanation Panel
export const AIExplanationPanel = ({ title = "Why This Candidate Matched", reasons = [] }) => {
  const defaultReasons = [
    'Matches 12 of 14 required skill matrices (React, TypeScript, GraphQL).',
    '6 years enterprise SaaS development experience (Target: 5+ years).',
    'Verified previous role tenure stability > 2.5 years average.',
    'Available for immediate full-time remote or onsite onboarding.',
  ]
  const list = reasons.length > 0 ? reasons : defaultReasons

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-100 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <h4 className="text-sm font-bold text-blue-900">{title}</h4>
      </div>

      <div className="space-y-2 text-xs">
        {list.map((r, idx) => (
          <div key={idx} className="flex items-start gap-2 text-gray-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <p className="leading-relaxed">{r}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
