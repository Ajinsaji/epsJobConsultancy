import React from 'react'

export const SectionTitle = ({ number = "01", title, subtitle, tag = "SECTION" }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-gray-200/80 mb-8">
      <div className="flex items-start gap-4">
        <span className="text-3xl md:text-4xl font-extrabold text-blue-600/30 font-mono tracking-tighter">
          {number}
        </span>
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
            {tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
