import React, { useState, useEffect } from 'react'
import { useLocation, Link as NavLink } from 'react-router-dom'
import { Sparkles, Menu, X, Search, Bell, User } from 'lucide-react'

export const PublicNavbar = ({ onRequestDemo }) => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'Companies' },
    { to: '/jobs', label: 'Candidates' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200/80 py-3' 
          : 'bg-white/70 backdrop-blur-sm border-b border-gray-100 py-4'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-blue-700 transition">
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
        </NavLink>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-gray-600">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.to && (idx === 0 || idx === 1 || idx === 2 || idx === 5 || idx === 6)
            return (
              <NavLink
                key={idx}
                to={link.to}
                className={`relative py-1 transition-colors ${
                  isActive 
                    ? 'text-[#2563EB] font-bold' 
                    : 'hover:text-gray-900'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#2563EB] rounded-full"></span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition relative"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Bell */}
          <button 
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2"></span>
          </button>

          {/* Profile Quick Link */}
          <NavLink
            to="/login"
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
            title="Profile / Sign In"
          >
            <User className="w-5 h-5" />
          </NavLink>

          <div className="w-px h-5 bg-gray-200 mx-1"></div>

          <NavLink
            to="/login"
            className="text-xs font-bold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-xs font-bold text-gray-800 border border-gray-300 hover:border-gray-400 bg-white px-3.5 py-2 rounded-lg transition hover:bg-gray-50"
          >
            Register
          </NavLink>
          <button
            onClick={onRequestDemo}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Request Demo</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Quick Search Overlay */}
      {searchOpen && (
        <div className="bg-white border-b border-gray-200 p-4 px-6 md:px-12 shadow-sm animate-in slide-in-from-top duration-200">
          <div className="max-w-xl mx-auto flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search platform jobs, candidates, services..." 
              className="w-full text-xs text-gray-900 bg-transparent focus:outline-none font-medium"
              autoFocus
            />
            <button onClick={() => setSearchOpen(false)} className="text-xs text-gray-400 hover:text-gray-700 font-bold">ESC</button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2 text-sm font-semibold">
            {navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`py-2 px-3 rounded-lg ${
                  location.pathname === link.to 
                    ? 'bg-blue-50 text-blue-600 font-bold' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <NavLink
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-800"
            >
              Login
            </NavLink>
            <button
              onClick={() => {
                setMobileOpen(false)
                onRequestDemo()
              }}
              className="w-full text-center py-2.5 bg-[#2563EB] text-white rounded-lg text-xs font-bold shadow-sm"
            >
              Request Demo
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
