import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { 
  Sparkles, ArrowRight, Play, CheckCircle2, Search, Building2, Users, Briefcase, 
  TrendingUp, Star, ChevronDown, ChevronUp, FileText, Brain, Video, BarChart3, 
  BookOpen, ShieldCheck, Award, Check, HelpCircle, UserCheck, Clock, FileCheck, Layers
} from 'lucide-react'
import { CircularMatchGauge, MultiSeriesLineChart } from '../../design-system/charts/ChartPrimitives'
import { MacBookFrame } from '../../presentation/Shared/MacBookFrame'

import { CandidateDashboard } from '../../presentation/Desktop/CandidateDashboard'
import { CompanyDashboard } from '../../presentation/Desktop/CompanyDashboard'
import { AdminDashboard } from '../../presentation/Desktop/AdminDashboard'

export function HomePage() {
  const context = useOutletContext()
  const onRequestDemo = context?.onRequestDemo || (() => {})

  const [activePreviewTab, setActivePreviewTab] = useState('candidate')
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const faqs = [
    {
      q: 'How does the EPS AI Semantic Matching Engine work?',
      a: 'EPS uses deep natural language processing (NLP) to parse resume competencies beyond keyword matching. It evaluates skill depth, tenure, project context, and role requirements to calculate a match confidence score.'
    },
    {
      q: 'Can EPS integrate with our existing HRIS or ATS software?',
      a: 'Yes, EPS provides enterprise REST & GraphQL APIs along with turn-key integrations for Workday, Greenhouse, Lever, and SAP SuccessFactors.'
    },
    {
      q: 'Is EPS compliant with candidate privacy and data protection laws?',
      a: 'EPS is SOC2 Type II certified and fully compliant with GDPR and CCPA regulations. All candidate data is encrypted in transit and at rest.'
    },
    {
      q: 'How fast can a company get started with EPS Workforce Solutions?',
      a: 'Companies can register, post jobs, and start receiving AI-ranked candidates in under 15 minutes. Enterprise onboarding includes custom SLA setup within 48 hours.'
    },
  ]

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#2563EB] selection:text-white space-y-24 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/50 via-white to-[#F8FAFC] pt-12 pb-20 px-6 md:px-12 border-b border-gray-100 overflow-hidden">
        {/* Soft subtle gradient mesh background */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/20 to-teal-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-gradient-to-br from-indigo-100/20 to-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] border border-blue-200/80 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Enterprise AI Recruitment SaaS</span>
            </span>

            <h1 className="text-4xl md:text-[52px] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              AI Recruitment Platform <br />
              <span className="text-[#2563EB]">Built For Modern Hiring</span>
            </h1>

            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed max-w-2xl font-normal">
              Empowering global organizations with semantic resume intelligence, automated candidate scoring, and real-time recruitment pipeline telemetry.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestDemo}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <span>Request Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/register"
                className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-2xs"
              >
                Get Started
              </Link>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-blue-600 px-3 py-2 transition"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>Watch Platform Tour</span>
              </button>
            </div>

            {/* Quick Metrics Pills */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80 max-w-lg">
              <div>
                <span className="text-xl font-extrabold text-gray-900 block">65%</span>
                <span className="text-xs text-gray-500 font-medium">Faster Hiring Cycle</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-blue-600 block">98.4%</span>
                <span className="text-xs text-gray-500 font-medium">Match Accuracy</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-emerald-600 block">500+</span>
                <span className="text-xs text-gray-500 font-medium">Enterprise Clients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Dashboard Preview with Floating Cards */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Card Container */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 space-y-5 relative">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-[10px] font-mono text-gray-400">EPS AI Telemetry Engine</span>
              </div>

              {/* Animated AI Match Score Gauge */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-100 flex items-center gap-4">
                <CircularMatchGauge percentage={94} size={90} strokeWidth={8} subtitle="94% Match" />
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Top Candidate Match</span>
                  <h4 className="font-bold text-gray-900">Asha Sharma</h4>
                  <p className="text-gray-500 text-[11px]">Senior Full Stack Systems Engineer</p>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Verified Fit
                  </span>
                </div>
              </div>

              {/* Floating Live Indicator Cards Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Recent Placement</span>
                  <p className="font-bold text-gray-900">TechCorp Inc.</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Placed in 4 days</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Interview Scheduled</span>
                  <p className="font-bold text-gray-900">Tomorrow, 10:00 AM</p>
                  <span className="text-[10px] text-blue-600 font-bold">Automated Sync</span>
                </div>
              </div>
            </div>

            {/* Floating Card - Resume Parsed */}
            <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xl flex items-center gap-3 hidden sm:flex">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-medium">Resume Intelligence</p>
                <p className="text-xs font-bold text-gray-900">Parsed in &lt; 1.8s</p>
              </div>
            </div>

            {/* Floating Card - AI Recommendation */}
            <div className="absolute -bottom-6 -right-4 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xl flex items-center gap-3 hidden sm:flex">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-medium">AI Recommendation</p>
                <p className="text-xs font-bold text-gray-900">4 New Candidate Fits</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center space-y-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          TRUSTED BY LEADERS IN ENTERPRISE, GOVERNMENT, STARTUPS, HEALTHCARE, MANUFACTURING & IT
        </p>

        {/* Original Company Placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center justify-center">
          {['Enterprise Co.', 'GovTech System', 'Apex Startups', 'EduLearn', 'HealthCare Care', 'Mfg Solutions', 'IT Global'].map((name, idx) => (
            <div key={idx} className="p-3.5 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-700 tracking-tight shadow-2xs hover:border-blue-300 transition">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* 3. STATISTICS SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-[#2563EB]">15,000+</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Verified Candidates</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">500+</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Enterprise Companies</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-[#2563EB]">8,000+</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Jobs Posted</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">95%</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Placement Success</p>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION (6 PREMIUM CARDS) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Platform Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            6 Core Intelligence Modules
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            High-performance AI services designed for enterprise recruitment efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Resume Intelligence',
              desc: 'Automated extraction of 24+ skill matrices, experience depth, and project context with 99.4% precision.',
              icon: FileText
            },
            {
              title: 'Semantic Matching',
              desc: 'Neural matching algorithms evaluating candidate skill vectors against open job requirements.',
              icon: Brain
            },
            {
              title: 'Interview Intelligence',
              desc: 'Real-time technical video interview recording and automated scoring telemetry.',
              icon: Video
            },
            {
              title: 'Recommendation Engine',
              desc: 'Personalized daily candidate and opportunity feeds tailored to hiring manager criteria.',
              icon: Sparkles
            },
            {
              title: 'Hiring Analytics',
              desc: 'Comprehensive recruitment bottleneck tracking, funnel velocity, and pipeline forecasting.',
              icon: BarChart3
            },
            {
              title: 'Learning Platform',
              desc: 'Targeted skill gap recommendations enabling candidates to boost match confidence for top roles.',
              icon: BookOpen
            },
          ].map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1 space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">{feat.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">{feat.desc}</p>
                </div>
                <button 
                  onClick={onRequestDemo}
                  className="w-full bg-blue-50 hover:bg-[#2563EB] hover:text-white text-[#2563EB] font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. WORKFLOW SECTION (CANDIDATE & EMPLOYER FLOWS) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Platform Orchestration</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Seamless Candidate & Employer Journeys</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Candidate Flow */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Candidate Workflow</span>
              <div className="space-y-2">
                {[
                  { step: '01', title: 'Candidate Profile', desc: 'Create profile & upload resume.' },
                  { step: '02', title: 'Resume Upload', desc: 'Drag-and-drop PDF/DOCX file.' },
                  { step: '03', title: 'AI Analysis', desc: 'Neural parser extracts skill matrices.' },
                  { step: '04', title: 'Semantic Match', desc: 'Calculates 90%+ match with top jobs.' },
                  { step: '05', title: 'Interview & Offer', desc: 'Automated video interview & instant offer.' },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900">{s.step}. {s.title}</span>
                      <p className="text-[11px] text-gray-500">{s.desc}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Employer Flow */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Employer Workflow</span>
              <div className="space-y-2">
                {[
                  { step: '01', title: 'Create Job', desc: 'Post role requirements & salary range.' },
                  { step: '02', title: 'AI Screening', desc: 'Engine screens 500+ candidates instantly.' },
                  { step: '03', title: 'Shortlist', desc: 'AI ranks top candidates by match confidence.' },
                  { step: '04', title: 'Interview', desc: 'Automated calendar sync & interview telemetry.' },
                  { step: '05', title: 'Hire Candidate', desc: 'Digital offer letter & instant onboarding.' },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900">{s.step}. {s.title}</span>
                      <p className="text-[11px] text-gray-500">{s.desc}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DASHBOARD PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Enterprise Suite Preview</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Real Dashboard Viewports</h2>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-2xs">
            {[
              { id: 'candidate', label: 'Candidate Portal' },
              { id: 'company', label: 'Company Portal' },
              { id: 'admin', label: 'Super Admin Telemetry' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePreviewTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activePreviewTab === tab.id 
                    ? 'bg-[#2563EB] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <MacBookFrame title={`EPS ${activePreviewTab.toUpperCase()} Portal`} url={`eps-workforce.com/${activePreviewTab}`}>
          {activePreviewTab === 'candidate' && <CandidateDashboard />}
          {activePreviewTab === 'company' && <CompanyDashboard />}
          {activePreviewTab === 'admin' && <AdminDashboard />}
        </MacBookFrame>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Client Testimonials</span>
          <h2 className="text-3xl font-extrabold text-gray-900">What Enterprise Leaders Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'EPS reduced our engineering hiring cycle from 35 days to 11 days. The AI match accuracy for senior React developers is phenomenal.',
              author: 'Marcus Vance',
              role: 'VP of Talent, TechCorp Inc.',
              rating: 5
            },
            {
              quote: 'As a candidate, EPS matched me with a remote role fitting my exact stack and salary requirements within 48 hours.',
              author: 'Priya Sharma',
              role: 'Lead UI/UX Architect',
              rating: 5
            },
            {
              quote: 'The automated interview telemetry and candidate comparison matrix gave our leadership team complete confidence during hiring decisions.',
              author: 'Elena Rostova',
              role: 'Head of People, InnovateX',
              rating: 5
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium italic">"{t.quote}"</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {t.author.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">{t.author}</h5>
                  <p className="text-[11px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PRICING */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Enterprise Pricing</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Simple, Transparent Plans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Starter</span>
              <h3 className="text-3xl font-extrabold text-gray-900">$99 <span className="text-xs font-normal text-gray-500">/ mo</span></h3>
              <p className="text-xs text-gray-600">Ideal for startups posting up to 3 active jobs.</p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> 3 Active Jobs</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> 100 AI Resume Parses</li>
              </ul>
            </div>
            <button onClick={onRequestDemo} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs py-3 rounded-xl transition">
              Choose Starter
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">Growth</span>
              <h3 className="text-3xl font-extrabold text-gray-900">$299 <span className="text-xs font-normal text-gray-500">/ mo</span></h3>
              <p className="text-xs text-gray-600">Designed for mid-market teams expanding rapidly.</p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> 15 Active Jobs</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> 500 AI Resume Parses</li>
              </ul>
            </div>
            <button onClick={onRequestDemo} className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition">
              Choose Growth
            </button>
          </div>

          <div className="bg-gradient-to-b from-blue-900 to-slate-900 p-8 rounded-2xl text-white shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden border border-blue-700">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">Enterprise</span>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">POPULAR</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white">Custom <span className="text-xs font-normal text-blue-200">/ tailored</span></h3>
              <p className="text-xs text-blue-100">Unlimited scale, custom ATS integrations & dedicated SLA.</p>
              <ul className="space-y-2 text-xs text-blue-100 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Job Postings</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Workday & Greenhouse Sync</li>
              </ul>
            </div>
            <button onClick={onRequestDemo} className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold text-xs py-3 rounded-xl shadow-lg transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs transition">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-gray-900 hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 10. CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-[#2563EB] text-white p-10 md:p-16 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to Transform Hiring?</h2>
            <p className="text-sm md:text-base text-blue-100 font-normal leading-relaxed">
              Join over 500+ enterprise companies leveraging EPS AI for faster, smarter, and bias-free talent discovery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onRequestDemo}
                className="bg-white text-[#2563EB] hover:bg-blue-50 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
              >
                Request Live Demo
              </button>
              <Link
                to="/register"
                className="bg-blue-700 hover:bg-blue-800 text-white border border-blue-400 font-bold text-sm px-6 py-3.5 rounded-xl transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Preview */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative">
            <div className="p-4 bg-slate-800 text-white flex items-center justify-between">
              <span className="text-xs font-bold">EPS Platform Video Walkthrough</span>
              <button onClick={() => setVideoModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center p-12 text-center text-gray-400 space-y-4 flex-col">
              <Video className="w-16 h-16 text-blue-500 animate-pulse" />
              <p className="text-sm text-gray-300">EPS Platform Tour Video</p>
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-lg"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default HomePage
