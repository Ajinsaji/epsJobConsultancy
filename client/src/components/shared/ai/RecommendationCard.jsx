import React from 'react';
import { RecommendationBadge } from './RecommendationBadge';
import { Button } from '../../ui/Button';
import { Building, MapPin, Briefcase, GraduationCap } from 'lucide-react';

export const RecommendationCard = ({ recommendation, onAction, onViewDetails }) => {
  const { type, score, category, entity, explanation } = recommendation;
  
  const isJob = type === 'JOB_RECOMMENDATION';
  const isCandidate = type === 'CANDIDATE_RECOMMENDATION';

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex gap-4">
          {isJob && (
            entity.companyId?.logo ? (
              <img src={entity.companyId.logo} alt="Company" className="h-12 w-12 rounded-xl object-contain border border-slate-100 p-1" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Building className="h-6 w-6" />
              </div>
            )
          )}
          {isCandidate && (
            entity.photo ? (
              <img src={entity.photo} alt="Candidate" className="h-12 w-12 rounded-full object-cover border border-slate-100" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <GraduationCap className="h-6 w-6" />
              </div>
            )
          )}
          <div>
            <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {isJob ? entity.title : entity.fullName}
            </h4>
            <p className="text-sm font-semibold text-slate-500">
              {isJob ? (entity.companyId?.companyName || 'Confidential Company') : (entity.title || 'Professional')}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full">
              <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#64748b'} strokeWidth="3" strokeDasharray={`${score}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="text-xs font-bold text-slate-700">{score}%</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{category}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
        <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {entity.location || 'Remote'}</div>
        {isJob && <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {entity.experience || 'Entry Level'}</div>}
        {isCandidate && <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {entity.experienceYears ? `${entity.experienceYears} Yrs` : 'Fresher'}</div>}
      </div>

      <div className="bg-slate-50 rounded-xl p-3 mb-4 text-sm text-slate-700 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Why Recommended</span>
        </div>
        <p className="line-clamp-2 text-xs">{explanation.summary}</p>
        
        {explanation.gaps?.length > 0 && (
          <div className="mt-2 text-xs text-rose-600">
            <span className="font-semibold">Missing:</span> {explanation.gaps[0]}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-auto border-t border-slate-100 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => onViewDetails(recommendation)}>View Insights</Button>
        <Button variant="primary" className="flex-1" onClick={() => onAction(entity)}>
          {isJob ? 'Apply Now' : 'View Profile'}
        </Button>
      </div>
    </div>
  );
};
