import React, { useState } from 'react'
import { Sparkles, Bell, CheckCircle2, Loader2, Play } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { CircularMatchGauge } from '../../design-system/charts/ChartPrimitives'

export const MotionShowcase = () => {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(91)

  const triggerToast = () => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-slate-900 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700`}>
        <Sparkles className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-xs font-bold">AI Resume Parsed Successfully</p>
          <p className="text-[10px] text-gray-400">Match score updated to 94%</p>
        </div>
      </div>
    ))
  }

  const animateScore = () => {
    setLoading(true)
    setTimeout(() => {
      setScore(score === 91 ? 96 : 91)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <Toaster position="top-right" />

      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Interactive Specimen</span>
          <h4 className="text-lg font-bold text-gray-900">Motion & Micro-Interaction Showcase</h4>
        </div>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded">60 FPS Micro-Animations</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Progress Gauge Animation */}
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 space-y-3 text-center">
          <span className="text-xs font-bold text-gray-700 block">AI Match Score Animation</span>
          <CircularMatchGauge percentage={score} size={90} strokeWidth={8} subtitle={`${score}% Match`} />
          <button 
            onClick={animateScore}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5 shadow-2xs"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>{loading ? 'Re-calculating...' : 'Trigger Score Pulse'}</span>
          </button>
        </div>

        {/* 2. Toast Notifications & Alerts */}
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 space-y-3">
          <span className="text-xs font-bold text-gray-700 block">Toast Notifications</span>
          <p className="text-xs text-gray-500">Test real-time async notification popups with custom styling.</p>
          <button 
            onClick={triggerToast}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Bell className="w-3.5 h-3.5 text-yellow-400" />
            <span>Show Toast Alert</span>
          </button>
        </div>

        {/* 3. Skeleton Loading State */}
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 space-y-3">
          <span className="text-xs font-bold text-gray-700 block">Skeleton Shimmer State</span>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
          </div>
        </div>

      </div>
    </div>
  )
}
