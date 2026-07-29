import React, { useState, useMemo } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { 
  Search, MapPin, DollarSign, Briefcase, Filter, Sparkles, ChevronRight, 
  CheckCircle2, Building, RefreshCw, X, AlertCircle, Bookmark, ArrowRightLeft 
} from 'lucide-react'

export function JobsPage() {
  const context = useOutletContext()
  const onRequestDemo = context?.onRequestDemo || (() => {})

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [savedJobs, setSavedJobs] = useState([])
  const [comparedJobs, setComparedJobs] = useState([])

  const allJobs = [
    {
      id: '1',
      title: 'Senior Full Stack React Engineer',
      company: 'TechCorp Inc.',
      category: 'Engineering',
      location: 'San Francisco, CA',
      salary: '$140k - $170k',
      exp: '5+ years',
      type: 'Full-Time',
      remote: true,
      match: '94%',
      skills: ['React 18', 'TypeScript', 'Node.js', 'GraphQL'],
      desc: 'Lead the frontend architecture of high-throughput SaaS web applications using React 18, TypeScript, and Node.js.'
    },
    {
      id: '2',
      title: 'Lead AI & Machine Learning Scientist',
      company: 'InnovateX Labs',
      category: 'AI / ML',
      location: 'New York, NY',
      salary: '$180k - $220k',
      exp: '6+ years',
      type: 'Full-Time',
      remote: true,
      match: '91%',
      skills: ['Python', 'PyTorch', 'NLP', 'Vector Databases'],
      desc: 'Develop deep learning NLP models for real-time candidate resume parsing and semantic match confidence.'
    },
    {
      id: '3',
      title: 'Senior UI/UX & Systems Architect',
      company: 'GlobalSoft Systems',
      category: 'Design',
      location: 'Remote',
      salary: '$130k - $160k',
      exp: '4+ years',
      type: 'Full-Time',
      remote: true,
      match: '92%',
      skills: ['Figma', 'Design Systems', 'React', 'Accessibility'],
      desc: 'Design pixel-perfect Figma design systems, micro-interactions, and accessible web components for enterprise HR SaaS.'
    },
    {
      id: '4',
      title: 'DevOps & Cloud Infrastructure Lead',
      company: 'NextGen AI',
      category: 'DevOps',
      location: 'Austin, TX',
      salary: '$150k - $185k',
      exp: '5+ years',
      type: 'Full-Time',
      remote: false,
      match: '88%',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      desc: 'Orchestrate AWS Kubernetes clusters, CI/CD pipelines, SOC2 compliance security monitoring, and auto-scaling.'
    },
    {
      id: '5',
      title: 'Enterprise Product Manager',
      company: 'BrightFuture Media',
      category: 'Product',
      location: 'Chicago, IL',
      salary: '$135k - $165k',
      exp: '3+ years',
      type: 'Full-Time',
      remote: true,
      match: '86%',
      skills: ['Product Strategy', 'SaaS Analytics', 'Agile'],
      desc: 'Drive product strategy, roadmap execution, and customer feedback loops for multi-tenant SaaS analytics.'
    },
    {
      id: '6',
      title: 'Data Analyst & BI Engineer',
      company: 'Apex Financial',
      category: 'Analytics',
      location: 'Boston, MA',
      salary: '$110k - $135k',
      exp: '2+ years',
      type: 'Full-Time',
      remote: false,
      match: '85%',
      skills: ['SQL', 'Tableau', 'Python', 'ETL Pipelines'],
      desc: 'Build real-time SQL dashboards, recruitment funnel metrics, and telemetry reports for executive leadership.'
    },
  ]

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCat = selectedCategory === 'All' || job.category === selectedCategory
      const matchRemote = !remoteOnly || job.remote
      return matchSearch && matchCat && matchRemote
    })
  }, [searchQuery, selectedCategory, remoteOnly])

  const categories = ['All', 'Engineering', 'AI / ML', 'Design', 'DevOps', 'Product', 'Analytics']

  const toggleSave = (id) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const toggleCompare = (id) => {
    setComparedJobs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setRemoteOnly(false)
  }

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#2563EB] selection:text-white space-y-12 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200 py-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block">
              AI Powered Job Matching
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Explore 8,000+ Enterprise Roles
            </h1>
            <p className="text-sm text-gray-500 max-w-2xl font-normal">
              Matched with precision using the EPS AI Semantic Recruitment Engine.
            </p>
          </div>

          {/* Advanced Search Bar */}
          <div className="bg-gray-50 p-2 rounded-2xl border border-gray-200 shadow-md flex flex-col md:flex-row items-center gap-2 max-w-4xl">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search job title, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium text-gray-900 bg-transparent focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 shrink-0">
              <MapPin className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
            </div>

            <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition shrink-0">
              Search Roles
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN JOBS GRID WITH SIDEBAR */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FILTER SIDEBAR */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-sm text-gray-900">Smart Filters</h3>
              </div>
              <button 
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Remote Only Toggle */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Work Location</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                <input 
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span>Remote Only Roles</span>
              </label>
            </div>

            {/* Job Categories Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Category</span>
              <div className="space-y-1 text-xs">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition font-medium ${
                      selectedCategory === cat 
                        ? 'bg-blue-50 text-blue-600 font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Recommended Widget */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-xl border border-blue-100 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Recommended</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Log in to automatically rank roles matching your verified resume skills.
              </p>
              <Link to="/login" className="inline-block font-bold text-blue-600 hover:underline text-[11px]">
                Sign In to Match →
              </Link>
            </div>
          </aside>

          {/* JOBS LISTING RESULTS */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Header Status Row */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Showing <strong className="text-gray-900">{filteredJobs.length}</strong> available role(s)</span>
              <span className="font-mono">Sorted by AI Match Rank</span>
            </div>

            {/* Jobs Cards or Empty State */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900">No Jobs Found Matching Your Criteria</h3>
                  <p className="text-xs text-gray-500">Try adjusting your keyword search or category filters.</p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition"
                >
                  Browse All Jobs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => {
                  const isSaved = savedJobs.includes(job.id)
                  const isCompared = comparedJobs.includes(job.id)
                  return (
                    <div 
                      key={job.id} 
                      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        
                        {/* Left Company & Role */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-base shrink-0 border border-blue-100">
                            {job.company[0]}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-base text-gray-900">{job.title}</h3>
                              {job.remote && (
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Remote
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-gray-500">{job.company} • {job.category}</p>
                          </div>
                        </div>

                        {/* Right AI Match Pill & Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{job.match} AI Match</span>
                          </span>

                          <button 
                            onClick={() => toggleSave(job.id)}
                            className={`p-2 rounded-lg border text-xs transition ${
                              isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700'
                            }`}
                            title="Save Job"
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>

                          <button 
                            onClick={() => toggleCompare(job.id)}
                            className={`p-2 rounded-lg border text-xs transition ${
                              isCompared ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-bold' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700'
                            }`}
                            title="Compare Role"
                          >
                            <ArrowRightLeft className="w-4 h-4" />
                          </button>

                          <Link
                            to="/register"
                            className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition"
                          >
                            Apply
                          </Link>
                        </div>

                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">{job.desc}</p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {job.skills.map((sk, skIdx) => (
                          <span key={skIdx} className="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                            {sk}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-gray-100 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-gray-400" /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-gray-400" /> {job.exp}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-xs font-semibold">
              <button disabled className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-400 bg-white cursor-not-allowed">
                ← Previous
              </button>
              <span className="text-gray-600">Page 1 of 1</span>
              <button disabled className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-400 bg-white cursor-not-allowed">
                Next →
              </button>
            </div>

          </main>

        </div>
      </section>

    </div>
  )
}

export default JobsPage
