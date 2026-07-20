import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Building2, Save, MapPin, Globe, Users, Loader2, Camera, ShieldCheck } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'
import { GlassButton } from '../../components/ui/GlassButton'
import { fetchCompanyProfile, updateCompanyProfile } from '../../redux/slices/companySlice'

export default function CompanyProfile() {
  const dispatch = useDispatch()
  const { profile, loading } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    website: '',
    location: '',
    companySize: '',
    establishedYear: '',
    contactEmail: '',
    contactPhone: ''
  })
  
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    dispatch(fetchCompanyProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName || '',
        industry: profile.industry || '',
        description: profile.description || '',
        website: profile.website || '',
        location: profile.location || '',
        companySize: profile.companySize || '',
        establishedYear: profile.establishedYear || '',
        contactEmail: profile.contactEmail || '',
        contactPhone: profile.contactPhone || ''
      })
    }
  }, [profile])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!profile?._id) return

    setIsSaving(true)
    try {
      await dispatch(updateCompanyProfile({ id: profile._id, companyData: formData })).unwrap()
      toast.success('Company profile updated successfully')
    } catch (err) {
      toast.error(err || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 text-[#CCA43B] animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#CCA43B]" />
          Company Profile
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Manage your company's public information and employer branding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Branding & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6 bg-slate-950/40 border-white/10 text-center">
            <div className="relative inline-block mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0B4C8C] to-[#CCA43B] p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#070B1A] flex items-center justify-center overflow-hidden">
                  {profile?.logo ? (
                    <img src={profile.logo} alt="Company Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="h-10 w-10 text-white/20" />
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-white mb-1">{profile?.companyName || 'Company Name'}</h2>
            
            {profile?.isVerified ? (
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full mb-4">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Employer
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full mb-4">
                Pending Verification
              </div>
            )}

            <div className="border-t border-white/10 pt-4 mt-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Globe className="h-4 w-4 text-[#CCA43B]" />
                <span className="truncate">{formData.website || 'No website added'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-[#CCA43B]" />
                <span className="truncate">{formData.location || 'Location not set'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Users className="h-4 w-4 text-[#CCA43B]" />
                <span>{formData.companySize || 'Size not specified'} employees</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-[#0B4C8C]/10 border-[#CCA43B]/30">
            <h3 className="text-sm font-bold text-white mb-2">Subscription</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-black text-[#CCA43B]">Premium Plan</span>
            </div>
            <p className="text-xs text-white/60 mb-4">
              You have unlimited job postings and access to the AI matching engine.
            </p>
            <GlassButton variant="secondary" className="w-full text-xs">
              Manage Subscription
            </GlassButton>
          </GlassCard>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 bg-slate-950/40 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Company Name</label>
                    <input 
                      type="text" name="companyName" value={formData.companyName} onChange={handleChange} required
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Industry</label>
                    <input 
                      type="text" name="industry" value={formData.industry} onChange={handleChange} required
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">Description / About Us</label>
                    <textarea 
                      name="description" value={formData.description} onChange={handleChange} rows="4" required
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none resize-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Website URL</label>
                    <input 
                      type="url" name="website" value={formData.website} onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Headquarters Location</label>
                    <input 
                      type="text" name="location" value={formData.location} onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Company Size</label>
                    <select 
                      name="companySize" value={formData.companySize} onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white focus:border-[#CCA43B] outline-none"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Established Year</label>
                    <input 
                      type="number" name="establishedYear" value={formData.establishedYear} onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  HR Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Public Contact Email</label>
                    <input 
                      type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Public Contact Phone</label>
                    <input 
                      type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <GlassButton type="submit" variant="primary" className="flex items-center gap-2 px-8" disabled={isSaving}>
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </GlassButton>
              </div>

            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
