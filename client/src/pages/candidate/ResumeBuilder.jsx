import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, User, FileText, Download, Plus, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('personal')
  const [resumeData, setResumeData] = useState({
    personal: { name: '', email: '', phone: '', location: '', title: '', summary: '' },
    experience: [],
    education: [],
    skills: ''
  })

  // --- Handlers ---
  const handlePersonalChange = (e) => {
    setResumeData({ ...resumeData, personal: { ...resumeData.personal, [e.target.name]: e.target.value } })
  }

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { id: Date.now(), title: '', company: '', dates: '', description: '' }]
    })
  }

  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    })
  }

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: Date.now(), degree: '', institution: '', year: '' }]
    })
  }

  const updateEducation = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    })
  }

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    })
  }

  const tabs = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: FileText, label: 'Skills' }
  ]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col md:flex-row gap-6 print:h-auto print:block">
      
      {/* LEFT PANEL - Editor (Hidden on print) */}
      <div className="w-full md:w-1/2 lg:w-[500px] flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden print:hidden backdrop-blur-xl">
        <div className="p-4 border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#0B4C8C] to-[#CCA43B] text-white shadow-[0_0_15px_rgba(11,76,140,0.3)]' 
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* PERSONAL TAB */}
          {activeTab === 'personal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Full Name</label>
                <input name="name" value={resumeData.personal.name} onChange={handlePersonalChange} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Professional Title</label>
                <input name="title" value={resumeData.personal.title} onChange={handlePersonalChange} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Email</label>
                  <input name="email" value={resumeData.personal.email} onChange={handlePersonalChange} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Phone</label>
                  <input name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Location</label>
                <input name="location" value={resumeData.personal.location} onChange={handlePersonalChange} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Professional Summary</label>
                <textarea name="summary" value={resumeData.personal.summary} onChange={handlePersonalChange} rows="4" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-[#CCA43B] outline-none resize-none" />
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 rounded-xl border border-white/10 bg-white/5 relative group">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-red-400 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                  <h4 className="text-xs font-extrabold text-[#CCA43B] mb-3 uppercase tracking-wider">Experience {index + 1}</h4>
                  <div className="space-y-3">
                    <input placeholder="Job Title (e.g. Senior Developer)" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none" />
                      <input placeholder="Dates (e.g. 2020 - Present)" value={exp.dates} onChange={(e) => updateExperience(exp.id, 'dates', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none" />
                    </div>
                    <textarea placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows="3" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none resize-none" />
                  </div>
                </div>
              ))}
              <Button variant="ghost" onClick={addExperience} className="w-full py-3 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            </motion.div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 rounded-xl border border-white/10 bg-white/5 relative group">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-red-400 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                  <h4 className="text-xs font-extrabold text-[#CCA43B] mb-3 uppercase tracking-wider">Education {index + 1}</h4>
                  <div className="space-y-3">
                    <input placeholder="Degree / Certification (e.g. B.Tech Computer Science)" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Institution Name" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none" />
                      <input placeholder="Year (e.g. 2022)" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" onClick={addEducation} className="w-full py-3 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Education
              </Button>
            </motion.div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">Technical Skills (comma separated)</label>
                <textarea 
                  value={resumeData.skills} 
                  onChange={(e) => setResumeData({...resumeData, skills: e.target.value})} 
                  rows="6" 
                  placeholder="React, Node.js, MongoDB, Express, TypeScript, Tailwind CSS..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-[#CCA43B] outline-none resize-none leading-relaxed" 
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5">
          <Button variant="primary" className="w-full py-3 flex justify-center items-center gap-2" onClick={handlePrint}>
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      {/* RIGHT PANEL - Live Preview */}
      <div className="flex-1 overflow-y-auto bg-slate-900/50 rounded-2xl border border-white/10 p-4 sm:p-8 custom-scrollbar print:p-0 print:border-0 print:bg-white print:overflow-visible flex justify-center items-start">
        
        {/* A4 Paper Container */}
        <div className="bg-white w-full max-w-[794px] min-h-[1123px] shadow-2xl p-10 sm:p-14 text-slate-900 print:shadow-none print:w-full print:max-w-none print:m-0 print:p-0">
          
          {/* Header */}
          <header className="border-b-2 border-slate-900 pb-6 mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0B4C8C]">
              {resumeData.personal.name || 'YOUR NAME'}
            </h1>
            <h2 className="text-sm font-bold text-[#CCA43B] uppercase tracking-widest mt-1">
              {resumeData.personal.title || 'Professional Title'}
            </h2>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs font-semibold text-slate-600">
              {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
              {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
              {resumeData.personal.location && <span>• {resumeData.personal.location}</span>}
            </div>
          </header>

          {/* Summary */}
          {resumeData.personal.summary && (
            <section className="mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#0B4C8C] mb-2">Professional Summary</h3>
              <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
                {resumeData.personal.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section className="mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#0B4C8C] mb-3 border-b border-slate-200 pb-1">Experience</h3>
              <div className="space-y-4">
                {resumeData.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{exp.title || 'Job Title'}</h4>
                      <span className="text-xs font-bold text-[#CCA43B]">{exp.dates}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 mb-1">{exp.company || 'Company Name'}</div>
                    <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#0B4C8C] mb-3 border-b border-slate-200 pb-1">Education</h3>
              <div className="space-y-3">
                {resumeData.education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{edu.degree || 'Degree Name'}</h4>
                      <div className="text-xs font-semibold text-slate-600">{edu.institution || 'Institution Name'}</div>
                    </div>
                    <span className="text-xs font-bold text-[#CCA43B]">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {resumeData.skills && (
            <section className="mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#0B4C8C] mb-3 border-b border-slate-200 pb-1">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.split(',').map((skill, index) => skill.trim() && (
                  <span key={index} className="px-2 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
      
      {/* Print CSS injection */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:block, .print\\:block * { visibility: visible; }
          .print\\:block { position: absolute; left: 0; top: 0; }
        }
      `}</style>
    </div>
  )
}
