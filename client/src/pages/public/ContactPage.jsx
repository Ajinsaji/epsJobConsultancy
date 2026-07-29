import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck, 
  Send, CheckCircle2, Building, Sparkles 
} from 'lucide-react'

export function ContactPage() {
  const context = useOutletContext()
  const onRequestDemo = context?.onRequestDemo || (() => {})

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Enterprise Employer',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', role: 'Enterprise Employer', subject: '', message: '' })
    }, 4000)
  }

  const supportCards = [
    {
      title: 'Enterprise Sales',
      desc: 'Custom SLA quotes, multi-seat licenses & platform demos.',
      email: 'sales@eps-workforce.com',
      phone: '+1 (800) 555-0199',
      icon: Building
    },
    {
      title: 'Technical Support',
      desc: 'ATS integrations, API keys & platform assistance.',
      email: 'support@eps-workforce.com',
      phone: '+1 (800) 555-0198',
      icon: MessageSquare
    },
    {
      title: 'Candidate Helpdesk',
      desc: 'Resume parsing queries & job application status.',
      email: 'candidates@eps-workforce.com',
      phone: '+1 (800) 555-0197',
      icon: Sparkles
    },
  ]

  return (
    <div className="w-full bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#2563EB] selection:text-white space-y-16 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200 py-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-bold border border-blue-200">
            <Mail className="w-4 h-4 text-blue-600" /> Contact EPS Workforce Solutions
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            We're Here to Help You Scale
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-normal">
            Have questions about our AI matching engine or enterprise billing? Reach out to our global team 24/7.
          </p>
        </div>
      </section>

      {/* 2. SUPPORT CARDS */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">{card.title}</h4>
                <p className="text-xs text-gray-500">{card.desc}</p>
                <div className="pt-2 space-y-1 text-xs font-semibold text-blue-600">
                  <p>{card.email}</p>
                  <p className="text-gray-700">{card.phone}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. CONTACT FORM & OFFICE INFO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CONTACT FORM */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Send Us a Direct Message</h3>
              <p className="text-xs text-gray-500 mt-1">Average response time: &lt; 2 hours during business hours.</p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for contacting EPS. An enterprise advisor will review your inquiry and reply shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">I am a...</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    >
                      <option value="Enterprise Employer">Enterprise Employer / Recruiter</option>
                      <option value="Job Candidate">Job Seeker / Candidate</option>
                      <option value="Partner / Integration">Integration Partner</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Enterprise Plan Query"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your team size, hiring goals, or integration requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* OFFICE INFO & SLA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SLA Badge Card */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">Guaranteed Response SLA</h4>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Enterprise inquiries are guaranteed a response within 2 business hours. Our support engineering desk operates 24/7.
              </p>
            </div>

            {/* Hours & Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs text-gray-700">
              <h4 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">Business Hours & Telemetry</h4>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Support Desk Hours</p>
                  <p className="text-gray-500">Mon - Fri: 8:00 AM - 8:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Global Headquarters</p>
                  <p className="text-gray-500">500 Howard St, Suite 400, San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Map Visual Placeholder */}
            <div className="bg-slate-100 rounded-2xl p-6 border border-gray-200 text-center space-y-2 relative overflow-hidden">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto animate-bounce" />
              <p className="text-xs font-bold text-gray-900">San Francisco HQ Map Visual</p>
              <p className="text-[10px] text-gray-500">Interactive Google Maps Embed Area</p>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export default ContactPage

