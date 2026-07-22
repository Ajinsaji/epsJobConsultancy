import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Building2, Search, Filter, CheckCircle2, XCircle, Star, Crown, MapPin } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import moment from 'moment'

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/admin/companies')
      setCompanies(response.data || [])
    } catch (e) {
      toast.error('Failed to load companies')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCompany = async (companyId, updates) => {
    try {
      await axios.put(`/api/admin/companies/${companyId}/homepage`, updates)
      toast.success('Company updated successfully')
      fetchCompanies()
    } catch (e) {
      toast.error('Failed to update company')
    }
  }

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = c.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterType === 'all') return matchesSearch
    if (filterType === 'verified') return matchesSearch && c.verified
    if (filterType === 'partner') return matchesSearch && c.isPartner
    if (filterType === 'unverified') return matchesSearch && !c.verified
    return matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#CCA43B]" />
          Manage Companies
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Review employer profiles, manage verifications, and configure partnerships.
        </p>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-950/40 border-white/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search companies by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition appearance-none"
            >
              <option value="all">All Companies</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
              <option value="partner">Partners Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Card key={i} className="h-48 animate-pulse bg-white/5" />)}
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          No companies found matching your criteria.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company._id} className="p-6 bg-slate-950/40 border-white/10 hover:border-[#CCA43B]/30 transition group flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {company.logo ? (
                    <img src={company.logo} alt={company.companyName} className="w-12 h-12 rounded-xl object-cover bg-white/5 border border-white/10" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white/30" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#CCA43B] transition truncate max-w-[180px]" title={company.companyName}>
                      {company.companyName}
                    </h3>
                    <div className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {company.location || 'No location'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {company.verified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    <XCircle className="w-3 h-3" /> Unverified
                  </span>
                )}
                
                {company.isPartner && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    <Star className="w-3 h-3" /> Partner
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                  <Crown className="w-3 h-3 text-[#CCA43B]" /> {company.subscriptionPlan || 'Free'}
                </span>
              </div>

              {/* Meta */}
              <div className="space-y-1.5 flex-1 text-xs text-white/60 mb-6 border-t border-white/5 pt-4">
                <div className="flex justify-between">
                  <span>Industry:</span>
                  <span className="text-white font-medium">{company.industry || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Company Size:</span>
                  <span className="text-white font-medium">{company.companySize || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Joined:</span>
                  <span className="text-white font-medium">{moment(company.createdAt).format('MMM YYYY')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button
                  onClick={() => handleUpdateCompany(company._id, { verified: !company.verified })}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition border ${
                    company.verified 
                      ? 'bg-transparent border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                >
                  {company.verified ? 'Revoke Verification' : 'Verify Company'}
                </button>
                <button
                  onClick={() => handleUpdateCompany(company._id, { isPartner: !company.isPartner })}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition border ${
                    company.isPartner
                      ? 'bg-transparent border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                      : 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                  }`}
                >
                  {company.isPartner ? 'Remove Partner' : 'Make Partner'}
                </button>
              </div>

            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
