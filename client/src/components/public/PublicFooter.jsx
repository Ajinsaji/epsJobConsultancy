import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Globe, Share2, MessageSquare } from 'lucide-react'

export const PublicFooter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E5E7EB] pt-16 pb-12 font-sans text-gray-900">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-xs">
          
          {/* Brand Info & Newsletter */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black text-lg shadow-sm">
                EPS
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-gray-900 tracking-tight text-base block">
                  EPS WORKFORCE
                </span>
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase block -mt-0.5">
                  SOLUTIONS
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              Enterprise AI recruitment SaaS platform powering modern talent discovery with semantic resume parsing, candidate scoring, and automated interview orchestration.
            </p>

            <div className="pt-2 max-w-sm space-y-2">
              <span className="text-xs font-bold text-gray-900 block">Subscribe to Enterprise Hiring Insights</span>
              {subscribed ? (
                <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 shadow-2xs font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Products</h4>
            <ul className="space-y-2 text-gray-600 font-medium">
              <li><Link to="/services" className="hover:text-blue-600 transition">Resume Intelligence</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Semantic Engine</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Interview Assistant</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Recommendation Engine</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Hiring Analytics</Link></li>
            </ul>
          </div>

          {/* Column: Solutions & Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-2 text-gray-600 font-medium">
              <li><Link to="/services" className="hover:text-blue-600 transition">Enterprise Hiring</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Executive Search</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Campus Recruitment</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">IT Staffing</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition">Global Payroll</Link></li>
            </ul>
          </div>

          {/* Column: Resources & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2 text-gray-600 font-medium">
              <li><Link to="/case-study" className="hover:text-blue-600 transition">Case Study</Link></li>
              <li><Link to="/design-system" className="hover:text-blue-600 transition">Design System</Link></li>
              <li><Link to="/prototype" className="hover:text-blue-600 transition">Interactive Prototype</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition">Support & Docs</Link></li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-gray-600 font-medium">
              <li><Link to="/about" className="hover:text-blue-600 transition">About EPS</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition">Leadership</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-blue-600 transition">Security</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Social & Legal Row */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div>
            © {new Date().getFullYear()} EPS Workforce Solutions Inc. All rights reserved. Built for enterprise scale.
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition"><Globe className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition"><Share2 className="w-4 h-4" /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition"><MessageSquare className="w-4 h-4" /></a>
          </div>
        </div>

      </div>
    </footer>
  )
}
