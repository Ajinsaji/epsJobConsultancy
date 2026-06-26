import React from 'react'

export default function EmptyState({ title, description, buttonText, onClick }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-white/10 bg-white/5 py-12">
      <div className="text-4xl mb-4 animate-bounce">📁</div>
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-white/50 mb-6 max-w-sm">{description}</p>
      {buttonText && onClick && (
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
