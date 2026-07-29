import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { 
  Building2, Users, Target, Eye, Award, CheckCircle2, ShieldCheck, 
  Sparkles, Globe2, Heart, TrendingUp, MapPin 
} from 'lucide-react'

export function AboutPage() {
  const context = useOutletContext()
  const onRequestDemo = context?.onRequestDemo || (() => {})

  const leadership = [
    {
      name: 'Alexander Wright',
      title: 'Founder & Chief Executive Officer',
      bio: 'Ex-VP Engineering at TechCorp. 15+ years experience building large-scale enterprise SaaS products.',
      bg: 'bg-blue-600'
    },
    {
      name: 'Dr. Evelyn Chen',
      title: 'Chief AI & Science Officer',
      bio: 'Ph.D. in Computer Science from Stanford. Pioneer in neural semantic parsing and NLP candidate matching models.',
      bg: 'bg-indigo-600'
    },
    {
      name: 'Michael Sterling',
      title: 'Head of Global Talent Operations',
      bio: 'Former Executive Recruiter at Fortune 500 tech firms. Scaled hiring pipelines for 10,000+ engineers.',
      bg: 'bg-emerald-600'
    },
    {
      name: 'Sophia Patel',
      title: 'Head of Product & Design',
      bio: 'Lead Systems Designer behind Behance-featured enterprise applications and accessible design systems.',
      bg: 'bg-slate-800'
    },
  ]

  const values = [
    {
      title: 'Engineering Rigor',
      desc: 'We build enterprise software with zero compromises on security, performance, or accessibility.',
      icon: Award
    },
    {
      title: 'Explainable AI Confidence',
      desc: 'Every candidate match score is transparent, objective, and backed by empirical skill matrices.',
      icon: Sparkles
    },
    {
      title: 'Speed & Velocity',
      desc: 'Reducing recruitment friction to help candidates find fulfilling careers and companies scale faster.',
      icon: TrendingUp
    },
    {
      title: 'Diversity & Inclusion',
      desc: 'Ensuring unbiased, merit-based candidate evaluation across all background demographics.',
      icon: Heart
    },
  ]

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#2563EB] selection:text-white space-y-16 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200 py-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-bold border border-blue-200">
            <Globe2 className="w-4 h-4 text-blue-600" /> About EPS Workforce Solutions
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Reimagining How Global Talent Meets Opportunity
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-normal">
            EPS Workforce Solutions is an enterprise AI recruitment SaaS platform bridging top tech candidates with industry-leading companies through semantic intelligence.
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION CARDS */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To eliminate hiring friction and bias worldwide by providing recruiters and job seekers with transparent, AI-driven candidate match scoring, automated interview telemetry, and real-time skill insight.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To become the global standard for enterprise recruitment intelligence, empowering 10,000+ organizations to build diverse, high-performing engineering and business teams effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Our Guiding Principles</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Core Values Driving EPS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. LEADERSHIP TEAM GRID */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Executive Leadership</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Meet the Team Behind EPS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((leader, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className={`w-14 h-14 rounded-2xl ${leader.bg} text-white font-extrabold text-lg flex items-center justify-center shadow-md`}>
                {leader.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-gray-900">{leader.name}</h4>
                <p className="text-xs font-bold text-blue-600">{leader.title}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GLOBAL OFFICES & ACHIEVEMENTS */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Global Reach</span>
              <h3 className="text-2xl font-bold text-gray-900">Headquarters & Regional Hubs</h3>
            </div>
            <span className="text-xs font-mono text-gray-500">San Francisco • London • Bangalore</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600">
            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 space-y-2">
              <span className="flex items-center gap-1.5 font-bold text-gray-900 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" /> San Francisco, CA
              </span>
              <p>500 Howard Street, Suite 400, San Francisco, CA 94105</p>
              <p className="text-gray-400 font-mono">Americas HQ</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 space-y-2">
              <span className="flex items-center gap-1.5 font-bold text-gray-900 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" /> London, UK
              </span>
              <p>25 Bank Street, Canary Wharf, London E14 5JP</p>
              <p className="text-gray-400 font-mono">EMEA HQ</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 space-y-2">
              <span className="flex items-center gap-1.5 font-bold text-gray-900 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" /> Bangalore, India
              </span>
              <p>Outer Ring Road, Bellandur, Bangalore 560103</p>
              <p className="text-gray-400 font-mono">APAC Innovation Hub</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutPage

