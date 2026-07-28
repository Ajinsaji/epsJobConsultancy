import React from 'react'
import { FileUp, Sparkles, Video, CreditCard, ShieldCheck, CheckCircle } from 'lucide-react'

export const AIModulesShowcase = () => {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. AI Resume Upload & Parser */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600">
            <FileUp className="w-5 h-5" />
            <h5 className="font-bold text-sm text-gray-900">AI Resume Parser</h5>
          </div>
          <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-4 text-center space-y-1">
            <Sparkles className="w-6 h-6 text-blue-600 mx-auto" />
            <p className="text-xs font-bold text-gray-900">Drag & Drop Resume (PDF/DOCX)</p>
            <p className="text-[10px] text-gray-500">Auto-extracts 24+ skill matrices in &lt; 2s</p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-600 bg-slate-50 p-2 rounded">
            <span>Accuracy Confidence</span>
            <span className="font-bold text-emerald-600">99.4%</span>
          </div>
        </div>

        {/* 2. AI Interview Intelligence */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-purple-600">
            <Video className="w-5 h-5" />
            <h5 className="font-bold text-sm text-gray-900">AI Interview Assistant</h5>
          </div>
          <div className="bg-slate-900 text-white rounded-xl p-3 text-xs space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-bold">REC</span>
              <span className="text-[10px] font-mono text-gray-400">00:14:32</span>
            </div>
            <p className="text-[11px] text-gray-200 font-medium">"Explaining React Fiber Reconciliation Architecture"</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-purple-500"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-600 bg-slate-50 p-2 rounded">
            <span>Technical Depth Score</span>
            <span className="font-bold text-purple-600">9.2 / 10</span>
          </div>
        </div>

        {/* 3. Pricing & Subscriptions */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <CreditCard className="w-5 h-5" />
            <h5 className="font-bold text-sm text-gray-900">Enterprise Pricing</h5>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 text-center space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Growth Plan</span>
            <p className="text-xl font-extrabold text-gray-900">$299 <span className="text-xs font-normal text-gray-500">/mo</span></p>
            <p className="text-[10px] text-gray-500">Includes 500 AI Resume Parses & 5 Jobs</p>
          </div>
          <button className="w-full bg-emerald-600 text-white text-xs font-bold py-1.5 rounded-lg shadow-2xs">
            Subscribe Now
          </button>
        </div>

        {/* 4. Login & Security Auth Module */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h5 className="font-bold text-sm text-gray-900">Enterprise SSO & Auth</h5>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-slate-50 rounded border border-gray-200 flex items-center justify-between">
              <span className="text-gray-700">SAML 2.0 / Okta SSO</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="p-2 bg-slate-50 rounded border border-gray-200 flex items-center justify-between">
              <span className="text-gray-700">Role-Based Access Control</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
