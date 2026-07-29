import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, LayoutDashboard, Briefcase, Bookmark, User, Building, Settings, X, ArrowRight } from 'lucide-react'

export function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // If modal isn't open, open it
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const items = [
    { label: 'Candidate Dashboard', path: '/candidate', icon: LayoutDashboard, category: 'Candidate' },
    { label: 'Job Search & Matches', path: '/candidate/jobs', icon: Briefcase, category: 'Candidate' },
    { label: 'My Applications', path: '/candidate/applied', icon: Bookmark, category: 'Candidate' },
    { label: 'AI Resume Intelligence', path: '/candidate/resume-analyzer', icon: Sparkles, category: 'AI Tools' },
    { label: 'Company Hiring Portal', path: '/company', icon: Building, category: 'Employer' },
    { label: 'AI Talent Search', path: '/company/talent-search', icon: Sparkles, category: 'Employer' },
    { label: 'Super Admin Telemetry', path: '/eps', icon: LayoutDashboard, category: 'Admin' },
    { label: 'Design System & Case Study', path: '/case-study', icon: Sparkles, category: 'Docs' },
  ]

  const filtered = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Type a command or search pages (e.g. Candidate, AI, Jobs)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-gray-900 bg-transparent focus:outline-none font-medium"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-500">
              No matching pages found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full p-3 rounded-xl hover:bg-blue-50 text-left flex items-center justify-between transition group text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition">{item.label}</p>
                      <p className="text-[10px] text-gray-400">{item.path}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 group-hover:bg-blue-100 group-hover:text-blue-700 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
          <span>Use ARROW keys to navigate, ENTER to select</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  )
}
