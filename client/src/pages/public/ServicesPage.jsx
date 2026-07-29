import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { 
  Sparkles, CheckCircle2, ArrowRight, Building2, Users, Briefcase, 
  Search, ShieldCheck, Award, FileText, UserCheck, CreditCard, HeartHandshake
} from 'lucide-react'

export function ServicesPage() {
  const context = useOutletContext()
  const onRequestDemo = context?.onRequestDemo || (() => {})

  const services = [
    {
      title: 'AI Recruitment & Matching',
      icon: Sparkles,
      desc: 'Automated semantic resume parsing, candidate scoring, and predictive skill matching across engineering, product, and leadership roles.',
      benefits: [
        '65% faster time-to-hire velocity',
        '98.4% candidate match confidence',
        'Turnkey Workday & Greenhouse ATS sync'
      ]
    },
    {
      title: 'Executive Search',
      icon: Award,
      desc: 'Targeted headhunting for VP, C-level, and senior engineering leadership roles with dedicated executive search consultants.',
      benefits: [
        'Confidential candidate sourcing',
        '100% placement guarantee SLA',
        'In-depth background & technical vetting'
      ]
    },
    {
      title: 'Campus & Graduate Hiring',
      icon: Users,
      desc: 'Bulk campus recruitment orchestration, automated technical assessment tests, and virtual hackathon evaluation.',
      benefits: [
        'Mass candidate screening at scale',
        'Automated coding & aptitude tests',
        'University partnership network'
      ]
    },
    {
      title: 'Contract Staffing & Flex Workforce',
      icon: Briefcase,
      desc: 'On-demand engineering & IT contract talent to scale development teams for short-term and project-based requirements.',
      benefits: [
        'Pre-vetted IT & dev contractors',
        'Rapid 48-hour onboarding SLA',
        'Flexible month-to-month contracts'
      ]
    },
    {
      title: 'Managed Payroll & Compliance',
      icon: CreditCard,
      desc: 'Global payroll management, tax compliance, employee benefits administration, and multi-country EOR services.',
      benefits: [
        '100% legal tax & labor compliance',
        'Multi-currency payroll processing',
        'Automated benefits administration'
      ]
    },
    {
      title: 'HR Consulting & Analytics',
      icon: ShieldCheck,
      desc: 'Strategic talent analytics, compensation benchmarking, diversity hiring audits, and workforce retention consulting.',
      benefits: [
        'Real-time recruitment bottleneck analytics',
        'Market salary benchmarking reports',
        'DEI hiring audit certification'
      ]
    },
  ]

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#2563EB] selection:text-white space-y-16 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200 py-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-bold border border-blue-200">
            <HeartHandshake className="w-4 h-4 text-blue-600" /> Enterprise Solutions & Services
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Tailored Workforce & Recruitment Services
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-normal">
            From AI-powered candidate screening to executive headhunting and managed payroll, EPS empowers Fortune 500 companies and high-growth startups.
          </p>
        </div>
      </section>

      {/* 2. SERVICES CARDS GRID */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon
            return (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">{srv.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">{srv.desc}</p>
                  
                  {/* Benefits List */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Key Benefits</span>
                    {srv.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onRequestDemo}
                  className="w-full bg-blue-50 hover:bg-[#2563EB] hover:text-white text-[#2563EB] font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                >
                  <span>Request Solution Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-10 md:p-14 rounded-3xl text-center space-y-6 shadow-2xl border border-blue-800">
          <h2 className="text-3xl font-extrabold text-white">Need a Custom Workforce Solution?</h2>
          <p className="text-xs text-blue-200 max-w-xl mx-auto">
            Our enterprise advisors will design a custom recruitment SLA tailored to your hiring headcount and tech stack.
          </p>
          <button
            onClick={onRequestDemo}
            className="bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition"
          >
            Speak with an Enterprise Advisor
          </button>
        </div>
      </section>

    </div>
  )
}

export default ServicesPage

