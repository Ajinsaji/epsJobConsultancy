import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [activities, setActivities] = useState([])
  const [syncTime, setSyncTime] = useState(null)
  const [health, setHealth] = useState(null)
  const [systemOverview, setSystemOverview] = useState(null)

  // 1. Config State
  const [config, setConfig] = useState({
    heroBadge: '',
    heroHeadline: '',
    heroSubheading: '',
    whyChooseCards: [],
    sectionOrder: [],
    visibleSections: {}
  })

  // 2. Placements State
  const [placements, setPlacements] = useState([])
  const [editingPlacement, setEditingPlacement] = useState(null)
  const [newPlacement, setNewPlacement] = useState({
    candidateName: '',
    candidatePhoto: '',
    companyName: '',
    companyLogo: '',
    position: '',
    salary: '',
    joiningDate: '',
    displayOrder: 0,
    isActive: true
  })

  // 3. Testimonials State
  const [testimonials, setTestimonials] = useState([])
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5,
    isActive: true,
    displayOrder: 0,
    type: 'candidate',
    featured: false
  })

  // 4. FAQs State
  const [faqs, setFaqs] = useState([])
  const [editingFaq, setEditingFaq] = useState(null)
  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    displayOrder: 0,
    isActive: true
  })

  // 5. Services State
  const [services, setServices] = useState([])
  const [editingService, setEditingService] = useState(null)
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: 'Briefcase',
    displayOrder: 0,
    isActive: true
  })

  // 6. Companies State
  const [companies, setCompanies] = useState([])
  const [editingCompany, setEditingCompany] = useState(null)

  // Helper loaders for separate sections (Live Refresh performance optimization)
  const fetchConfig = async () => {
    const res = await axios.get('/api/admin/homepage-config')
    setConfig({
      ...res.data,
      visibleSections: res.data.visibleSections || {}
    })
  }

  const fetchPlacements = async () => {
    const res = await axios.get('/api/admin/placements')
    setPlacements(res.data)
  }

  const fetchTestimonials = async () => {
    const res = await axios.get('/api/admin/testimonials')
    setTestimonials(res.data)
  }

  const fetchFAQs = async () => {
    const res = await axios.get('/api/admin/faqs')
    setFaqs(res.data)
  }

  const fetchServices = async () => {
    const res = await axios.get('/api/admin/services')
    setServices(res.data)
  }

  const fetchCompanies = async () => {
    const res = await axios.get('/api/admin/companies')
    setCompanies(res.data)
  }

  const fetchActivities = async () => {
    const res = await axios.get('/api/admin/activities')
    setActivities(res.data)
  }

  const fetchHealth = async () => {
    const res = await axios.get('/api/admin/health')
    if (res.data && res.data.success) {
      setHealth(res.data.data.health)
      setSystemOverview(res.data.data.overview)
    }
    setSyncTime(new Date().toLocaleTimeString())
  }

  // Fetch all collections in parallel
  const fetchData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchConfig(),
        fetchPlacements(),
        fetchTestimonials(),
        fetchFAQs(),
        fetchServices(),
        fetchCompanies(),
        fetchActivities(),
        fetchHealth()
      ])
    } catch (err) {
      console.error(err)
      toast.error('Failed to load CMS data. API might be offline.')
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // --- SAVE HERO & CONFIG ---
  const saveConfig = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.put('/api/admin/homepage-config', config)
      setConfig({
        ...res.data,
        visibleSections: res.data.visibleSections || {}
      })
      toast.success('Homepage configuration updated!')
      await Promise.all([fetchHealth(), fetchActivities()])
    } catch (err) {
      console.error(err)
      toast.error('Failed to update config')
    } finally {
      setLoading(false)
    }
  }

  const toggleSectionVisibility = (secKey) => {
    const nextVis = { ...config.visibleSections, [secKey]: !config.visibleSections[secKey] }
    setConfig(prev => ({
      ...prev,
      visibleSections: nextVis
    }))
  }

  // --- PLACEMENT CRUD ---
  const handlePlacementSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingPlacement) {
        await axios.put(`/api/admin/placements/${editingPlacement._id}`, editingPlacement)
        toast.success('Placement success story updated!')
        setEditingPlacement(null)
      } else {
        await axios.post('/api/admin/placements', newPlacement)
        toast.success('Placement success story published!')
        setNewPlacement({
          candidateName: '',
          candidatePhoto: '',
          companyName: '',
          companyLogo: '',
          position: '',
          salary: '',
          joiningDate: '',
          displayOrder: 0,
          isActive: true
        })
      }
      await Promise.all([fetchPlacements(), fetchHealth(), fetchActivities()])
    } catch (err) {
      console.error(err)
      toast.error('Failed to save placement')
    } finally {
      setLoading(false)
    }
  }

  const deletePlacement = async (id) => {
    if (!window.confirm('Delete this placement story?')) return
    setLoading(true)
    try {
      await axios.delete(`/api/admin/placements/${id}`)
      toast.success('Placement story deleted!')
      await Promise.all([fetchPlacements(), fetchHealth(), fetchActivities()])
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete placement')
    } finally {
      setLoading(false)
    }
  }



  const tabItems = [
    { id: 'dashboard', label: 'CMS Dashboard' },
    { id: 'hero', label: 'Hero & Page Settings' },
    { id: 'partners', label: 'Partner Companies' },
    { id: 'placements', label: 'Placed Candidates' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'services', label: 'Consultancy Services' }
  ]

  if (initialLoading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-white/60">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <p className="text-sm font-semibold tracking-wide">Initializing EPS Homepage CMS...</p>
      </div>
    )
  }

  const renderEmptyState = (title, description, buttonText, onClick) => (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-white/10 bg-white/5 py-12">
      <div className="text-4xl mb-4 animate-bounce">📁</div>
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-white/50 mb-6 max-w-sm">{description}</p>
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
      >
        {buttonText}
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Homepage CMS</h1>
          <p className="text-white/60">Configure and manage all copy, visibility, and listings shown on the public landing page.</p>
        </div>
        <div className="flex items-center gap-3">
          {loading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />}
          <GlassButton variant="ghost" onClick={fetchData} className="border-white/10 bg-white/5 text-sm">
            Refresh Data
          </GlassButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setEditingPlacement(null)
              setEditingTestimonial(null)
              setEditingFaq(null)
              setEditingService(null)
              setEditingCompany(null)
            }}
            className={
              'px-4 py-2 text-sm font-semibold rounded-xl transition ' +
              (activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: DASHBOARD SUMMARY */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Quick Actions Panel */}
          <GlassCard className="p-4 bg-slate-900/40 border-white/10 mb-6">
            <h3 className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
              <span>⚡</span> Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('partners')}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition hover:scale-[1.02]"
              >
                🏢 Add Partner Company
              </button>
              <button
                onClick={() => setActiveTab('placements')}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition hover:scale-[1.02]"
              >
                🎓 Add Placement
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition hover:scale-[1.02]"
              >
                💬 Add Testimonial
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition hover:scale-[1.02]"
              >
                ❓ Add FAQ
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition hover:scale-[1.02]"
              >
                💼 Add Service
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition hover:scale-[1.02]"
              >
                ⚙️ Edit Hero Section
              </button>
            </div>
          </GlassCard>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Platform Health */}
            <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>💚</span> Platform Health
                  </h3>
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-xs text-white/50 mb-4">Live status monitors of server connection and landing configurations.</p>
                
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-white/60">Database Status:</span>
                    <span className={`font-bold ${health?.dbStatus === 'Connected' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {health?.dbStatus || 'Connected'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-white/60">API Status:</span>
                    <span className="font-bold text-emerald-400">{health?.apiStatus || 'Healthy'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-white/60">Config Status:</span>
                    <span className="font-bold text-indigo-300">{health?.homepageConfigStatus || 'Configured'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Enabled Sections:</span>
                    <span className="font-bold text-white">{health?.visibleSectionsCount ?? 0} active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                <span className="text-[10px] text-white/40 truncate max-w-[150px]">
                  Updated: {health?.lastConfigUpdate ? new Date(health.lastConfigUpdate).toLocaleTimeString() : 'N/A'}
                </span>
                <button
                  onClick={fetchHealth}
                  className="text-[10px] font-bold text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition"
                >
                  Sync Health
                </button>
              </div>
            </GlassCard>

            {/* Card 2: Partner Companies */}
            {companies.length === 0 ? (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64">
                <div>
                  <div className="text-3xl mb-2">🏢</div>
                  <h3 className="text-lg font-bold text-white">Partner Companies</h3>
                  <div className="mt-4 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <p className="text-[11px] text-white/50 mb-2">No companies added yet.</p>
                    <button
                      onClick={() => setActiveTab('partners')}
                      className="text-[10px] font-extrabold text-indigo-400 hover:text-indigo-300 transition"
                    >
                      + Add Company
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-white/30">Total: 0</span>
                  <button
                    onClick={() => setActiveTab('partners')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Partners →
                  </button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <div className="text-3xl mb-2">🏢</div>
                  <h3 className="text-lg font-bold text-white">Partner Companies</h3>
                  <p className="text-xs text-white/50 mt-1">Manage partner logos, employee size description, and websites.</p>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-white/40 font-bold uppercase">Total</span>
                      <span className="text-base font-black text-white">{companies.length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-indigo-300 font-bold uppercase">Partners</span>
                      <span className="text-base font-black text-indigo-300">{companies.filter(c => c.isPartner).length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-emerald-400 font-bold uppercase">Visible</span>
                      <span className="text-base font-black text-emerald-400">{companies.filter(c => c.showOnHomepage).length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-indigo-300">
                    {companies.filter(c => !c.showOnHomepage).length} Hidden
                  </span>
                  <button
                    onClick={() => setActiveTab('partners')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Partners →
                  </button>
                </div>
              </GlassCard>
            )}

            {/* Card 3: Placements */}
            {placements.length === 0 ? (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64">
                <div>
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="text-lg font-bold text-white">Placed Candidates</h3>
                  <div className="mt-4 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <p className="text-[11px] text-white/50 mb-2">No placements registered yet.</p>
                    <button
                      onClick={() => setActiveTab('placements')}
                      className="text-[10px] font-extrabold text-indigo-400 hover:text-indigo-300 transition"
                    >
                      + Add Placement
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-white/30">Total: 0</span>
                  <button
                    onClick={() => setActiveTab('placements')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Placements →
                  </button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="text-lg font-bold text-white">Placed Candidates</h3>
                  <p className="text-xs text-white/50 mt-1">Configure candidate success story details, including package salary and photos.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[10px] text-white/40 font-bold uppercase tracking-wider">Total</span>
                      <span className="text-lg font-black text-white">{placements.length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Active</span>
                      <span className="text-lg font-black text-indigo-300">{placements.filter(p => p.isActive).length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-indigo-300">
                    {placements.filter(p => !p.isActive).length} Hidden
                  </span>
                  <button
                    onClick={() => setActiveTab('placements')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Placements →
                  </button>
                </div>
              </GlassCard>
            )}

            {/* Card 4: Testimonials */}
            {testimonials.length === 0 ? (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64">
                <div>
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="text-lg font-bold text-white">Testimonials</h3>
                  <div className="mt-4 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <p className="text-[11px] text-white/50 mb-2">No testimonials available.</p>
                    <button
                      onClick={() => setActiveTab('testimonials')}
                      className="text-[10px] font-extrabold text-indigo-400 hover:text-indigo-300 transition"
                    >
                      + Add Testimonial
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-white/30">Total: 0</span>
                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Reviews →
                  </button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="text-lg font-bold text-white">Testimonials</h3>
                  <p className="text-xs text-white/50 mt-1">Manage Candidate and Employer experience reviews, including rating stars.</p>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-white/40 font-bold uppercase">Total</span>
                      <span className="text-base font-black text-white">{testimonials.length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-indigo-300 font-bold uppercase">Candidates</span>
                      <span className="text-base font-black text-indigo-300">{testimonials.filter(t => t.type === 'candidate').length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-emerald-400 font-bold uppercase">Employers</span>
                      <span className="text-base font-black text-emerald-400">{testimonials.filter(t => t.type === 'employer').length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-indigo-300">
                    {testimonials.filter(t => t.isActive).length} Active / {testimonials.filter(t => !t.isActive).length} Hidden
                  </span>
                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Reviews →
                  </button>
                </div>
              </GlassCard>
            )}

            {/* Card 5: Services */}
            {services.length === 0 ? (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64">
                <div>
                  <div className="text-3xl mb-2">💼</div>
                  <h3 className="text-lg font-bold text-white">Consultancy Services</h3>
                  <div className="mt-4 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <p className="text-[11px] text-white/50 mb-2">No services active yet.</p>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-[10px] font-extrabold text-indigo-400 hover:text-indigo-300 transition"
                    >
                      + Add Service
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-white/30">Total: 0</span>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Services →
                  </button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <div className="text-3xl mb-2">💼</div>
                  <h3 className="text-lg font-bold text-white">Consultancy Services</h3>
                  <p className="text-xs text-white/50 mt-1">Define recruitment assessments, executive search options, and pricing layouts.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[10px] text-white/40 font-bold uppercase tracking-wider">Total</span>
                      <span className="text-lg font-black text-white">{services.length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Active</span>
                      <span className="text-lg font-black text-indigo-300">{services.filter(s => s.isActive).length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-indigo-300">
                    {services.filter(s => !s.isActive).length} Hidden
                  </span>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage Services →
                  </button>
                </div>
              </GlassCard>
            )}

            {/* Card 6: FAQs Accordion */}
            {faqs.length === 0 ? (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64">
                <div>
                  <div className="text-3xl mb-2">❓</div>
                  <h3 className="text-lg font-bold text-white">FAQs Accordion</h3>
                  <div className="mt-4 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <p className="text-[11px] text-white/50 mb-2">No FAQs created yet.</p>
                    <button
                      onClick={() => setActiveTab('faqs')}
                      className="text-[10px] font-extrabold text-indigo-400 hover:text-indigo-300 transition"
                    >
                      + Add FAQ
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-white/30">Total: 0</span>
                  <button
                    onClick={() => setActiveTab('faqs')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage FAQs →
                  </button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between h-64 hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <div className="text-3xl mb-2">❓</div>
                  <h3 className="text-lg font-bold text-white">FAQs Accordion</h3>
                  <p className="text-xs text-white/50 mt-1">Configure and order collapsible general QA accordion listings.</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[10px] text-white/40 font-bold uppercase tracking-wider">Total</span>
                      <span className="text-lg font-black text-white">{faqs.length}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                      <span className="block text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Active</span>
                      <span className="text-lg font-black text-indigo-300">{faqs.filter(f => f.isActive).length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs font-bold text-indigo-300">
                    {faqs.filter(f => !f.isActive).length} Hidden
                  </span>
                  <button
                    onClick={() => setActiveTab('faqs')}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition"
                  >
                    Manage FAQs →
                  </button>
                </div>
              </GlassCard>
            )}
          </div>

          {/* System Overview & Recent Activity Panels */}
          <div className="grid gap-6 lg:grid-cols-2 mt-6">
            {/* System Overview Panel */}
            <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>📊</span> System Overview
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Partners</span>
                    <span className="text-xl font-extrabold text-white mt-1 block">{systemOverview?.totalPartners ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Active Jobs</span>
                    <span className="text-xl font-extrabold text-indigo-300 mt-1 block">{systemOverview?.totalJobs ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Candidates</span>
                    <span className="text-xl font-extrabold text-emerald-400 mt-1 block">{systemOverview?.totalCandidates ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Employers</span>
                    <span className="text-xl font-extrabold text-cyan-400 mt-1 block">{systemOverview?.totalEmployers ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Placements</span>
                    <span className="text-xl font-extrabold text-white mt-1 block">{systemOverview?.totalPlacements ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Testimonials</span>
                    <span className="text-xl font-extrabold text-purple-400 mt-1 block">{systemOverview?.totalTestimonials ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">FAQs</span>
                    <span className="text-xl font-extrabold text-yellow-400 mt-1 block">{systemOverview?.totalFAQs ?? 0}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-white/50 uppercase font-bold">Services</span>
                    <span className="text-xl font-extrabold text-rose-400 mt-1 block">{systemOverview?.totalServices ?? 0}</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-white/40 border-t border-white/5 pt-3 mt-6">
                All platform summary counts are synchronized live from database.
              </div>
            </GlassCard>

            {/* Recent Activity Panel */}
            <GlassCard className="p-6 bg-slate-900/50 border-white/10 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">⏱️ Recent Activity Log</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded uppercase">Live Audit</span>
              </h3>
              <div className="flex-1 overflow-y-auto max-h-[180px] pr-2 space-y-2.5">
                {activities.length === 0 ? (
                  <div className="text-center py-6 text-xs text-white/40 font-medium">
                    No recent admin modifications logged.
                  </div>
                ) : (
                  activities.map((act) => (
                    <div key={act._id} className="text-xs bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-slate-100 font-semibold leading-relaxed">{act.action}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">By: {act.user}</p>
                      </div>
                      <span className="text-[9px] text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded whitespace-nowrap font-semibold">
                        {new Date(act.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB CONTENT: HERO CONFIG */}
      {activeTab === 'hero' && (
        <form onSubmit={saveConfig} className="space-y-6">
          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Hero Copy Settings</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Announcement Badge</label>
                <input
                  type="text"
                  value={config.heroBadge}
                  onChange={(e) => setConfig({ ...config, heroBadge: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Large Headline Title</label>
                <input
                  type="text"
                  value={config.heroHeadline}
                  onChange={(e) => setConfig({ ...config, heroHeadline: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Hero Subheading Text</label>
                <textarea
                  rows={3}
                  value={config.heroSubheading}
                  onChange={(e) => setConfig({ ...config, heroSubheading: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-2">Section Visibility Settings</h2>
            <p className="text-xs text-white/60 mb-4">Toggle visibility of sections on the homepage. Disabled sections will not be rendered.</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Object.keys(config.visibleSections || {}).map((secKey) => (
                <label key={secKey} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={config.visibleSections[secKey] || false}
                    onChange={() => toggleSectionVisibility(secKey)}
                    className="h-4 w-4 rounded border-white/10 text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-transparent"
                  />
                  <span className="text-xs font-bold capitalize text-white/80">{secKey.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </GlassCard>

          <div className="flex justify-end">
            <GlassButton type="submit" variant="primary" className="px-6 py-2.5 text-sm">
              Save Configuration Settings
            </GlassButton>
          </div>
        </form>
      )}

      {/* TAB CONTENT: PARTNER COMPANIES */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          {editingCompany ? (
            <GlassCard className="p-6 bg-slate-900/50 border-white/10">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <h2 className="text-lg font-bold text-white">Homepage Partner Settings: {editingCompany.companyName}</h2>
                <button type="button" onClick={() => setEditingCompany(null)} className="text-white/60 hover:text-white">✕ Close</button>
              </div>
              <form onSubmit={handleCompanyUpdate} className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Company Size Description</label>
                  <input
                    type="text"
                    value={editingCompany.companySize || ''}
                    onChange={(e) => setEditingCompany({ ...editingCompany, companySize: e.target.value })}
                    placeholder="e.g. 50-200 employees"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={editingCompany.website || ''}
                    onChange={(e) => setEditingCompany({ ...editingCompany, website: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={editingCompany.logo || ''}
                    onChange={(e) => setEditingCompany({ ...editingCompany, logo: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Display Order (weight)</label>
                  <input
                    type="number"
                    value={editingCompany.displayOrder || 0}
                    onChange={(e) => setEditingCompany({ ...editingCompany, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="flex gap-6 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCompany.verified || false}
                      onChange={(e) => setEditingCompany({ ...editingCompany, verified: e.target.checked })}
                      className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-white">Verified Badge</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCompany.isPartner || false}
                      onChange={(e) => setEditingCompany({ ...editingCompany, isPartner: e.target.checked })}
                      className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-white">Is Partner Company</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCompany.showOnHomepage || false}
                      onChange={(e) => setEditingCompany({ ...editingCompany, showOnHomepage: e.target.checked })}
                      className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-white">Show on Homepage</span>
                  </label>
                </div>
                <div className="flex justify-end gap-2 md:col-span-2 pt-4">
                  <GlassButton type="button" variant="ghost" onClick={() => setEditingCompany(null)} className="px-4 py-2 text-xs">
                    Cancel
                  </GlassButton>
                  <GlassButton type="submit" variant="primary" className="px-4 py-2 text-xs">
                    Save Partner Info
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          ) : null}

          <GlassCard className="p-6 bg-slate-900/50 border-white/10 overflow-x-auto">
            <h2 className="text-lg font-bold text-white mb-4">Registered Companies List</h2>
            {companies.length === 0 ? (
              renderEmptyState(
                "No registered companies found",
                "Companies must sign up as employers to register their profiles and be listed as partners.",
                "Invite Employer Partner",
                () => toast.success("Share registration link with employers: /register")
              )
            ) : (
              <table className="w-full text-left text-sm text-white/80 min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-xs uppercase font-bold">
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">Industry</th>
                    <th className="py-3 px-4">Verified</th>
                    <th className="py-3 px-4">Is Partner</th>
                    <th className="py-3 px-4">Show Landing</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {companies.map((c) => (
                    <tr key={c._id}>
                      <td className="py-3 px-4 font-bold">{c.companyName}</td>
                      <td className="py-3 px-4">{c.industry || 'N/A'}</td>
                      <td className="py-3 px-4">{c.verified ? '✅ Yes' : '❌ No'}</td>
                      <td className="py-3 px-4">{c.isPartner ? '⭐ Yes' : '❌ No'}</td>
                      <td className="py-3 px-4">{c.showOnHomepage ? '👀 Visible' : '🙈 Hidden'}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setEditingCompany(c)}
                          className="text-indigo-400 hover:text-indigo-200 text-xs font-semibold"
                        >
                          Modify Page Settings
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </GlassCard>
        </div>
      )}

      {/* TAB CONTENT: PLACEMENTS CMS */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingPlacement ? 'Edit Placement Success Story' : 'Publish New Placement Success'}
            </h2>
            <form
              onSubmit={handlePlacementSubmit}
              className="grid gap-4 md:grid-cols-2"
            >
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={editingPlacement ? editingPlacement.candidateName : newPlacement.candidateName}
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, candidateName: e.target.value })
                    else setNewPlacement({ ...newPlacement, candidateName: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Placed Position/Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior MERN Architect"
                  value={editingPlacement ? editingPlacement.position : newPlacement.position}
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, position: e.target.value })
                    else setNewPlacement({ ...newPlacement, position: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={editingPlacement ? editingPlacement.companyName : newPlacement.companyName}
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, companyName: e.target.value })
                    else setNewPlacement({ ...newPlacement, companyName: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Package/Salary Copy</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹18,00,000 LPA"
                  value={editingPlacement ? editingPlacement.salary : newPlacement.salary}
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, salary: e.target.value })
                    else setNewPlacement({ ...newPlacement, salary: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Candidate Profile Photo (URL)</label>
                <input
                  type="text"
                  placeholder="Unsplash picture or image path"
                  value={editingPlacement ? editingPlacement.candidatePhoto || '' : newPlacement.candidatePhoto}
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, candidatePhoto: e.target.value })
                    else setNewPlacement({ ...newPlacement, candidatePhoto: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Joining Date</label>
                <input
                  type="date"
                  required
                  value={
                    editingPlacement
                      ? editingPlacement.joiningDate ? new Date(editingPlacement.joiningDate).toISOString().split('T')[0] : ''
                      : newPlacement.joiningDate
                  }
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, joiningDate: e.target.value })
                    else setNewPlacement({ ...newPlacement, joiningDate: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingPlacement ? editingPlacement.displayOrder : newPlacement.displayOrder}
                  onChange={(e) => {
                    if (editingPlacement) setEditingPlacement({ ...editingPlacement, displayOrder: parseInt(e.target.value) || 0 })
                    else setNewPlacement({ ...newPlacement, displayOrder: parseInt(e.target.value) || 0 })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlacement ? editingPlacement.isActive : newPlacement.isActive}
                    onChange={(e) => {
                      if (editingPlacement) setEditingPlacement({ ...editingPlacement, isActive: e.target.checked })
                      else setNewPlacement({ ...newPlacement, isActive: e.target.checked })
                    }}
                    className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-white">Active (Visible on Landing Page)</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 md:col-span-2 pt-2">
                {editingPlacement && (
                  <GlassButton type="button" variant="ghost" onClick={() => setEditingPlacement(null)} className="px-4 py-2 text-xs">
                    Cancel
                  </GlassButton>
                )}
                <GlassButton type="submit" variant="primary" className="px-4 py-2 text-xs">
                  {editingPlacement ? 'Update Success Story' : 'Publish Success Card'}
                </GlassButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6 bg-slate-900/50 border-white/10 overflow-x-auto">
            <h2 className="text-lg font-bold text-white mb-4">Published Placements</h2>
            {placements.length === 0 ? (
              renderEmptyState(
                "No placed candidates registered yet",
                "Highlight candidate success stories and packages to build user trust.",
                "Create Placement",
                () => window.scrollTo({ top: 0, behavior: 'smooth' })
              )
            ) : (
              <table className="w-full text-left text-sm text-white/80 min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-xs uppercase font-bold">
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Salary Package</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {placements.map((p) => (
                    <tr key={p._id}>
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        {p.candidatePhoto && (
                          <img src={p.candidatePhoto} alt="" className="h-7 w-7 rounded-full object-cover border border-white/20" />
                        )}
                        <span>{p.candidateName}</span>
                      </td>
                      <td className="py-3 px-4">{p.position}</td>
                      <td className="py-3 px-4">{p.companyName}</td>
                      <td className="py-3 px-4">{p.salary}</td>
                      <td className="py-3 px-4">{p.isActive ? '✅ Active' : '❌ Inactive'}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingPlacement(p)}
                          className="text-indigo-400 hover:text-indigo-200 text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePlacement(p._id)}
                          className="text-red-400 hover:text-red-200 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </GlassCard>
        </div>
      )}

      {/* TAB CONTENT: TESTIMONIALS CMS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingTestimonial ? 'Edit Testimonial' : 'Create Homepage Testimonial'}
            </h2>
            <form onSubmit={handleTestimonialSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Author Name</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial ? editingTestimonial.name : newTestimonial.name}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                    else setNewTestimonial({ ...newTestimonial, name: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Role / Position</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior MERN Architect"
                  value={editingTestimonial ? editingTestimonial.role : newTestimonial.role}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                    else setNewTestimonial({ ...newTestimonial, role: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Company Name</label>
                <input
                  type="text"
                  value={editingTestimonial ? editingTestimonial.company || '' : newTestimonial.company}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                    else setNewTestimonial({ ...newTestimonial, company: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">User Type Tab</label>
                <select
                  value={editingTestimonial ? editingTestimonial.type : newTestimonial.type}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, type: e.target.value })
                    else setNewTestimonial({ ...newTestimonial, type: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-4 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="candidate">Candidate (Job Seeker)</option>
                  <option value="employer">Employer (Company)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-white/70 mb-1">Review Message</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial ? editingTestimonial.message : newTestimonial.message}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, message: e.target.value })
                    else setNewTestimonial({ ...newTestimonial, message: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Rating Stars (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingTestimonial ? editingTestimonial.rating : newTestimonial.rating}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) || 5 })
                    else setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) || 5 })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingTestimonial ? editingTestimonial.displayOrder : newTestimonial.displayOrder}
                  onChange={(e) => {
                    if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, displayOrder: parseInt(e.target.value) || 0 })
                    else setNewTestimonial({ ...newTestimonial, displayOrder: parseInt(e.target.value) || 0 })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div className="flex gap-6 pt-6 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTestimonial ? editingTestimonial.isActive : newTestimonial.isActive}
                    onChange={(e) => {
                      if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, isActive: e.target.checked })
                      else setNewTestimonial({ ...newTestimonial, isActive: e.target.checked })
                    }}
                    className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-white">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTestimonial ? editingTestimonial.featured : newTestimonial.featured}
                    onChange={(e) => {
                      if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, featured: e.target.checked })
                      else setNewTestimonial({ ...newTestimonial, featured: e.target.checked })
                    }}
                    className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-white">Featured Badge</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 md:col-span-2 pt-2">
                {editingTestimonial && (
                  <GlassButton type="button" variant="ghost" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 text-xs">
                    Cancel
                  </GlassButton>
                )}
                <GlassButton type="submit" variant="primary" className="px-4 py-2 text-xs">
                  {editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}
                </GlassButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6 bg-slate-900/50 border-white/10 overflow-x-auto">
            <h2 className="text-lg font-bold text-white mb-4">Homepage Testimonials</h2>
            {testimonials.length === 0 ? (
              renderEmptyState(
                "No testimonials available yet",
                "Publish reviews from employers and candidates to show platform social proof.",
                "Create Testimonial",
                () => window.scrollTo({ top: 0, behavior: 'smooth' })
              )
            ) : (
              <table className="w-full text-left text-sm text-white/80 min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-xs uppercase font-bold">
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Role / Company</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {testimonials.map((t) => (
                    <tr key={t._id}>
                      <td className="py-3 px-4 font-bold">{t.name}</td>
                      <td className="py-3 px-4 capitalize font-semibold text-indigo-300">{t.type}</td>
                      <td className="py-3 px-4">{t.role} {t.company ? `@ ${t.company}` : ''}</td>
                      <td className="py-3 px-4">{'⭐'.repeat(t.rating)}</td>
                      <td className="py-3 px-4">{t.isActive ? '✅ Active' : '❌ Inactive'}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingTestimonial(t)}
                          className="text-indigo-400 hover:text-indigo-200 text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTestimonial(t._id)}
                          className="text-red-400 hover:text-red-200 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </GlassCard>
        </div>
      )}

      {/* TAB CONTENT: FAQS CMS */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingFaq ? 'Edit FAQ Item' : 'Create FAQ Accordion Item'}
            </h2>
            <form onSubmit={handleFAQSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Question Text</label>
                <input
                  type="text"
                  required
                  value={editingFaq ? editingFaq.question : newFaq.question}
                  onChange={(e) => {
                    if (editingFaq) setEditingFaq({ ...editingFaq, question: e.target.value })
                    else setNewFaq({ ...newFaq, question: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Answer Text</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq ? editingFaq.answer : newFaq.answer}
                  onChange={(e) => {
                    if (editingFaq) setEditingFaq({ ...editingFaq, answer: e.target.value })
                    else setNewFaq({ ...newFaq, answer: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingFaq ? editingFaq.displayOrder : newFaq.displayOrder}
                    onChange={(e) => {
                      if (editingFaq) setEditingFaq({ ...editingFaq, displayOrder: parseInt(e.target.value) || 0 })
                      else setNewFaq({ ...newFaq, displayOrder: parseInt(e.target.value) || 0 })
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingFaq ? editingFaq.isActive : newFaq.isActive}
                      onChange={(e) => {
                        if (editingFaq) setEditingFaq({ ...editingFaq, isActive: e.target.checked })
                        else setNewFaq({ ...newFaq, isActive: e.target.checked })
                      }}
                      className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-white">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                {editingFaq && (
                  <GlassButton type="button" variant="ghost" onClick={() => setEditingFaq(null)} className="px-4 py-2 text-xs">
                    Cancel
                  </GlassButton>
                )}
                <GlassButton type="submit" variant="primary" className="px-4 py-2 text-xs">
                  {editingFaq ? 'Update FAQ' : 'Save FAQ'}
                </GlassButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">FAQ Items</h2>
            {faqs.length === 0 ? (
              renderEmptyState(
                "No FAQs have been created yet",
                "Answer commonly asked recruitment, eligibility, and service questions.",
                "Create FAQ",
                () => window.scrollTo({ top: 0, behavior: 'smooth' })
              )
            ) : (
              <div className="space-y-3">
                {faqs.map((f) => (
                  <div key={f._id} className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-xs text-white/40">#{f.displayOrder}</span>
                        <span>{f.question}</span>
                      </h4>
                      <p className="mt-1 text-xs text-white/60">{f.answer}</p>
                      <span className="mt-2 inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                        {f.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingFaq(f)}
                        className="text-indigo-400 hover:text-indigo-200 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFaq(f._id)}
                        className="text-red-400 hover:text-red-200 text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* TAB CONTENT: SERVICES CMS */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingService ? 'Edit Consultancy Service' : 'Create Consultancy Service'}
            </h2>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService ? editingService.title : newService.title}
                    onChange={(e) => {
                      if (editingService) setEditingService({ ...editingService, title: e.target.value })
                      else setNewService({ ...newService, title: e.target.value })
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Lucide Icon Name</label>
                  <select
                    value={editingService ? editingService.icon : newService.icon}
                    onChange={(e) => {
                      if (editingService) setEditingService({ ...editingService, icon: e.target.value })
                      else setNewService({ ...newService, icon: e.target.value })
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-4 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="Briefcase">Briefcase (Portfolio / Work)</option>
                    <option value="ShieldCheck">ShieldCheck (Security / Verification)</option>
                    <option value="CalendarDays">CalendarDays (Scheduling / Clock)</option>
                    <option value="Cpu">Cpu (AI / Tech)</option>
                    <option value="Users">Users (Team / Support)</option>
                    <option value="Zap">Zap (Fast / Power)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Service Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingService ? editingService.description : newService.description}
                  onChange={(e) => {
                    if (editingService) setEditingService({ ...editingService, description: e.target.value })
                    else setNewService({ ...newService, description: e.target.value })
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingService ? editingService.displayOrder : newService.displayOrder}
                    onChange={(e) => {
                      if (editingService) setEditingService({ ...editingService, displayOrder: parseInt(e.target.value) || 0 })
                      else setNewService({ ...newService, displayOrder: parseInt(e.target.value) || 0 })
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingService ? editingService.isActive : newService.isActive}
                      onChange={(e) => {
                        if (editingService) setEditingService({ ...editingService, isActive: e.target.checked })
                        else setNewService({ ...newService, isActive: e.target.checked })
                      }}
                      className="rounded border-white/10 bg-transparent text-indigo-600 focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-white">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                {editingService && (
                  <GlassButton type="button" variant="ghost" onClick={() => setEditingService(null)} className="px-4 py-2 text-xs">
                    Cancel
                  </GlassButton>
                )}
                <GlassButton type="submit" variant="primary" className="px-4 py-2 text-xs">
                  {editingService ? 'Update Service' : 'Save Service'}
                </GlassButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6 bg-slate-900/50 border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Consultancy Services</h2>
            {services.length === 0 ? (
              renderEmptyState(
                "No consultancy services are active yet",
                "List recruitment models like executive search or candidate screening.",
                "Add Service Listing",
                () => window.scrollTo({ top: 0, behavior: 'smooth' })
              )
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((s) => (
                  <div key={s._id} className="p-4 rounded-xl border border-white/5 bg-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded flex items-center gap-1.5">
                          Icon: {s.icon}
                        </span>
                        <span className="text-xs text-white/40">Order: {s.displayOrder}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{s.title}</h4>
                      <p className="mt-1 text-xs text-white/60">{s.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-2">
                      <span className="text-[10px] font-bold text-white/50 uppercase">
                        {s.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingService(s)}
                          className="text-indigo-400 hover:text-indigo-200 text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteService(s._id)}
                          className="text-red-400 hover:text-red-200 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  )
}
