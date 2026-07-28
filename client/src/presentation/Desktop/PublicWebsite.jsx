import React from 'react'
import { 
  Search, Sparkles, ArrowRight, CheckCircle2, Star, ChevronDown, 
  MapPin, DollarSign, Briefcase, Building, Users, Award, Shield, FileText, Brain, HelpCircle
} from 'lucide-react'

export const PublicWebsite = () => {
  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* 1. Public Header / Nav */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black text-xl shadow-md">
            EPS
          </div>
          <div>
            <span className="font-extrabold text-lg text-gray-900 leading-none block tracking-tight">EPS WORKFORCE</span>
            <span className="text-[9px] font-bold text-blue-600 tracking-widest uppercase block">SOLUTIONS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#home" className="text-blue-600 font-semibold">Home</a>
          <a href="#jobs" className="hover:text-gray-900">Jobs</a>
          <a href="#candidates" className="hover:text-gray-900">Candidates</a>
          <a href="#companies" className="hover:text-gray-900">Companies</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#resources" className="hover:text-gray-900">Resources</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2">
            Login
          </button>
          <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm transition">
            Get Started
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-16 px-8 relative overflow-hidden">
        {/* Subtle background blur shapes */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Next-Gen Recruitment Intelligence</span>
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              AI Powered <span className="text-blue-600">Recruitment</span> Platform
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Transforming corporate talent acquisition with semantic resume analysis, predictive candidate matching, and automated interview orchestration for modern enterprises.
            </p>

            {/* Combined Search Bar */}
            <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xl flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full border-b md:border-b-0 md:border-r border-gray-100">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  readOnly 
                  value="Search Jobs, Candidates, Companies..." 
                  className="w-full text-sm text-gray-800 bg-transparent focus:outline-none font-medium"
                />
              </div>
              <button className="w-full md:w-auto bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0">
                <span>Find Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button className="bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition">
                Find Jobs
              </button>
              <button className="bg-white border border-gray-300 text-gray-800 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-50 transition">
                Post a Job
              </button>
            </div>
          </div>

          {/* Hero Illustration & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg">
                    AS
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Asha Sharma</h4>
                    <p className="text-xs text-blue-100">Senior UI/UX Designer</p>
                  </div>
                </div>
                <span className="bg-emerald-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-full">
                  92% Match
                </span>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed mb-4">
                Matched with TechCorp Inc. based on Figma design systems, React accessibility, and 6+ years enterprise SaaS experience.
              </p>
              <div className="flex items-center justify-between text-xs border-t border-white/10 pt-3">
                <span>Match Score Confidence</span>
                <span className="font-bold text-emerald-300">High Precision</span>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Placement Success</p>
                <p className="text-lg font-bold text-gray-900">98.4% Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Logos */}
      <section className="py-10 border-y border-gray-100 bg-slate-50/50 px-8">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            TRUSTED BY 500+ ENTERPRISE LEADERS IN TECH, HEALTHCARE, FINANCE & MANUFACTURING
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
            <span className="font-bold text-lg tracking-tight text-gray-800">TechCorp</span>
            <span className="font-bold text-lg tracking-tight text-gray-800">InnovateX</span>
            <span className="font-bold text-lg tracking-tight text-gray-800">GlobalSoft</span>
            <span className="font-bold text-lg tracking-tight text-gray-800">BrightFuture</span>
            <span className="font-bold text-lg tracking-tight text-gray-800">NextGen AI</span>
          </div>
        </div>
      </section>

      {/* 4. Statistics KPI Section */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center space-y-1">
            <p className="text-3xl font-extrabold text-blue-600">15,000+</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Active Candidates</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center space-y-1">
            <p className="text-3xl font-extrabold text-blue-600">2,500+</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Companies</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center space-y-1">
            <p className="text-3xl font-extrabold text-blue-600">8,000+</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Jobs Posted</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center space-y-1">
            <p className="text-3xl font-extrabold text-emerald-600">98%</p>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Success Rate</p>
          </div>
        </div>
      </section>

      {/* 5. Featured Jobs */}
      <section className="py-12 px-8 bg-slate-50/50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Opportunity Hub</span>
              <h2 className="text-2xl font-bold text-gray-900">Featured Enterprise Roles</h2>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All 8,000+ Jobs →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: 'Full Stack React Developer', company: 'TechCorp', loc: 'Remote', salary: '$120k - $150k', match: '92% Match' },
              { role: 'Senior AI ML Engineer', company: 'InnovateX', loc: 'San Francisco, CA', salary: '$160k - $200k', match: '89% Match' },
              { role: 'Lead UI/UX Product Designer', company: 'GlobalSoft', loc: 'New York, NY', salary: '$130k - $160k', match: '94% Match' },
            ].map((job, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4 hover:border-blue-300 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center">
                      {job.company[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{job.role}</h4>
                      <p className="text-xs text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {job.match}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                </div>
                <button className="w-full bg-blue-50 text-blue-600 font-semibold text-xs py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How It Works Workflow */}
      <section className="py-12 px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto space-y-8 text-center">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simple & Efficient</span>
            <h2 className="text-2xl font-bold text-gray-900">How EPS Workforce Works</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Register & Upload', desc: 'Create your profile and upload your resume in seconds.' },
              { step: '02', title: 'AI Analysis', desc: 'Our engine extracts key competencies and skill levels.' },
              { step: '03', title: 'Semantic Matching', desc: 'Get matched with top roles fitting your exact trajectory.' },
              { step: '04', title: 'Get Hired', desc: 'Streamlined interview scheduling and instant offers.' },
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-gray-100 space-y-2 text-left">
                <span className="text-2xl font-extrabold text-blue-600 font-mono">{item.step}</span>
                <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-900 text-white py-10 px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs">EPS</div>
              EPS Workforce Solutions
            </div>
            <p className="leading-relaxed">Enterprise AI Recruitment Platform powering talent discovery worldwide.</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">For Candidates</h5>
            <ul className="space-y-1.5">
              <li>Job Search</li>
              <li>AI Resume Analysis</li>
              <li>Career Guidance</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">For Companies</h5>
            <ul className="space-y-1.5">
              <li>Post a Job</li>
              <li>Talent Matching</li>
              <li>Enterprise Billing</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">Legal & Support</h5>
            <ul className="space-y-1.5">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  )
}
