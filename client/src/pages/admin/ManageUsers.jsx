import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Users, Search, Filter, Shield, Key, Power, UserCheck, UserX } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import moment from 'moment'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users')
      setUsers(response.data || [])
    } catch (e) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/api/admin/users/${userId}/status`, { isActive: !currentStatus })
      toast.success(currentStatus ? 'User suspended' : 'User activated')
      fetchUsers()
    } catch (e) {
      toast.error('Failed to update user status')
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return
    try {
      await axios.put(`/api/admin/users/${userId}/status`, { role: newRole })
      toast.success('User role updated')
      fetchUsers()
    } catch (e) {
      toast.error('Failed to update user role')
    }
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterRole === 'all') return matchesSearch
    return matchesSearch && u.role === filterRole
  })

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin': return <span className="px-2.5 py-1 rounded-full border border-red-400/20 bg-red-400/10 text-red-400 text-[10px] font-bold uppercase tracking-wider">Super Admin</span>
      case 'eps_admin': return <span className="px-2.5 py-1 rounded-full border border-purple-400/20 bg-purple-400/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">EPS Admin</span>
      case 'company': return <span className="px-2.5 py-1 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">Company</span>
      case 'candidate': return <span className="px-2.5 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Candidate</span>
      default: return <span className="px-2.5 py-1 rounded-full border border-white/20 bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">{role}</span>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#CCA43B]" />
          Manage Users
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Global user directory, role assignments, and access control.
        </p>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-slate-950/40 border-white/10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#CCA43B] transition appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="candidate">Candidate</option>
              <option value="company">Company</option>
              <option value="eps_admin">EPS Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden bg-slate-950/40 border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase font-bold text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Account Details</th>
                <th className="px-6 py-4">Role & Access</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#CCA43B] border-t-transparent animate-spin" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-white/50">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B4C8C] to-[#CCA43B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {u.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white">{u.email}</div>
                          <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
                            {u.isVerified ? (
                              <span className="text-emerald-400 flex items-center gap-1"><UserCheck className="w-3 h-3" /> Verified</span>
                            ) : (
                              <span className="text-amber-400 flex items-center gap-1"><UserX className="w-3 h-3" /> Unverified</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(u.role)}
                    </td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Active</span>
                      ) : (
                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Suspended</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{moment(u.createdAt).format('MMM D, YYYY')}</div>
                      <div className="text-[10px] text-white/40">{moment(u.createdAt).format('HH:mm A')}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <select
                          className="bg-slate-900 border border-white/10 rounded-lg text-xs text-white/70 py-1.5 px-2 focus:outline-none focus:border-[#CCA43B]"
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        >
                          <option value="candidate">Make Candidate</option>
                          <option value="company">Make Company</option>
                          <option value="eps_admin">Make EPS Admin</option>
                          <option value="super_admin">Make Super Admin</option>
                        </select>
                        <button 
                          onClick={() => handleToggleStatus(u._id, u.isActive)}
                          className={`p-2 rounded-lg bg-white/5 transition ${u.isActive ? 'hover:bg-red-500/20 hover:text-red-400 text-white/70' : 'hover:bg-emerald-500/20 hover:text-emerald-400 text-red-400'}`} 
                          title={u.isActive ? 'Suspend User' : 'Activate User'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
