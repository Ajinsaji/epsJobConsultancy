import React from 'react'

// Circular AI Match Progress Gauge
export const CircularMatchGauge = ({ percentage = 91, size = 120, strokeWidth = 10, title = "Match Score", subtitle = "Excellent Match" }) => {
  const radius = (size - strokeWidth) / 2
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
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#16A34A"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center text-center">
          <span className="text-2xl font-extrabold text-gray-900 leading-none">{percentage}%</span>
          <span className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-wider">{subtitle}</span>
        </div>
      </div>
    </div>
  )
}

// Multi-series SVG Analytics Area/Line Chart
export const MultiSeriesLineChart = ({ height = 180 }) => {
  return (
    <div className="w-full relative" style={{ height }}>
      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="75" x2="500" y2="75" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />

        {/* Series 1 Area */}
        <path
          d="M 0,110 Q 75,40 150,70 T 300,30 T 420,50 T 500,20 L 500,140 L 0,140 Z"
          fill="url(#blueGrad)"
        />
        {/* Series 1 Line */}
        <path
          d="M 0,110 Q 75,40 150,70 T 300,30 T 420,50 T 500,20"
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Series 2 Line */}
        <path
          d="M 0,130 Q 80,90 160,110 T 310,70 T 430,85 T 500,60"
          fill="none"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeDasharray="5 3"
        />

        {/* Highlight Data Points */}
        <circle cx="300" cy="30" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="500" cy="20" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    </div>
  )
}
