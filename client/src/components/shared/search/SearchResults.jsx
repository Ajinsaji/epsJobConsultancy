import { cn } from '../../../lib/cn';
import { Briefcase, MapPin, Building, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SearchEmptyState } from './SearchEmptyState';
import { SearchSkeleton } from './SearchSkeleton';

// Internal components to render each specific entity type beautifully
const JobCard = ({ job }) => (
  <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#1F7BE5] hover:shadow-md">
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-4">
        {job.companyId?.logo ? (
          <img src={job.companyId.logo} alt={job.companyId.companyName} className="h-12 w-12 rounded-xl object-contain border border-slate-100 p-1" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <Building className="h-6 w-6" />
          </div>
        )}
        <div>
          <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#1F7BE5] transition-colors">{job.title}</h4>
          <p className="text-sm font-semibold text-slate-500">{job.companyId?.companyName || 'Confidential Company'}</p>
        </div>
      </div>
      <div className="flex shrink-0">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          {job.jobType || 'Full-time'}
        </span>
      </div>
    </div>
    
    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
      <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {job.location || 'Remote'}</div>
      <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {job.experience || 'Entry Level'}</div>
    </div>
    
    {job.onAction && (
      <div className="mt-4 border-t border-slate-100 pt-4">
        <button 
          onClick={() => job.onAction(job)}
          className="w-full rounded-xl bg-indigo-500/10 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-500/20 active:scale-[0.98] transition-all"
        >
          Apply Now
        </button>
      </div>
    )}
  </div>
);

const CandidateCard = ({ candidate }) => (
  <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#1F7BE5] hover:shadow-md">
    <div className="flex items-start gap-4">
      {candidate.photo ? (
        <img src={candidate.photo} alt={candidate.fullName} className="h-14 w-14 rounded-full object-cover border border-slate-100" />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <GraduationCap className="h-6 w-6" />
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#1F7BE5] transition-colors">{candidate.fullName}</h4>
        <p className="text-sm font-semibold text-slate-500">{candidate.title || 'Professional Candidate'}</p>
        
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {candidate.location || 'Not Specified'}</div>
          <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {candidate.experienceYears ? `${candidate.experienceYears} Yrs` : 'Fresher'}</div>
        </div>
        
        {candidate.skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {skill}
              </span>
            ))}
            {candidate.skills.length > 3 && (
              <span className="inline-flex rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">
                +{candidate.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

const CompanyCard = ({ company }) => (
  <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#1F7BE5] hover:shadow-md flex flex-col items-center text-center">
    {company.logo ? (
      <img src={company.logo} alt={company.companyName} className="h-16 w-16 rounded-2xl object-contain border border-slate-100 p-2 mb-4" />
    ) : (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
        <Building className="h-8 w-8" />
      </div>
    )}
    
    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#1F7BE5] transition-colors flex items-center gap-2">
      {company.companyName}
      {company.verified && <CheckCircle2 className="h-4 w-4 text-[#1F7BE5]" />}
    </h4>
    <p className="text-sm font-semibold text-slate-500 mt-1">{company.industry || 'General Industry'}</p>
    
    <div className="mt-4 w-full flex justify-center gap-4 text-xs text-slate-600 font-semibold border-t border-slate-100 pt-4">
      <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {company.location || 'Global'}</div>
      <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {company.companySize || 'Unknown Size'}</div>
    </div>
  </div>
);


export function SearchResults({ 
  results, 
  isLoading, 
  query, 
  type = 'jobs', 
  onAction,
  className 
}) {
  if (isLoading) {
    return <SearchSkeleton count={4} className={className} />;
  }

  const items = results[type] || [];

  if (items.length === 0) {
    return <SearchEmptyState query={query} className={className} />;
  }

  return (
    <div className={cn(
      "grid gap-4", 
      type === 'companies' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
      className
    )}>
      {items.map(item => {
        const itemWithAction = onAction ? { ...item, onAction } : item;
        if (type === 'jobs') return <JobCard key={item._id} job={itemWithAction} />;
        if (type === 'candidates') return <CandidateCard key={item._id} candidate={itemWithAction} />;
        if (type === 'companies') return <CompanyCard key={item._id} company={itemWithAction} />;
        return null;
      })}
    </div>
  );
}
