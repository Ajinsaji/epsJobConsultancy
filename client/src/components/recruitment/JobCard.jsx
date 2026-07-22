import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Briefcase, Clock, Building } from 'lucide-react';
import { cn } from '../../lib/cn';

export function JobCard({ job, company, onApply, onView, compact = false, className }) {
  return (
    <Card className={cn('transition-all hover:shadow-float', className)}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-eps-text2" />
              <span className="text-sm font-medium text-eps-text2">{company?.name || job.companyName}</span>
            </div>
            <h3 className="text-card-title text-eps-navy line-clamp-1">{job.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-eps-text2">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location || 'Remote'}</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.jobType || 'Full-time'}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.experience || 'Entry level'}</span>
            </div>
          </div>
          {company?.logo && (
            <img src={company.logo} alt={company.name} className="h-12 w-12 rounded border object-contain p-1" />
          )}
        </div>
        
        {!compact && job.skillsRequired && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {job.skillsRequired.slice(0, 4).map((skill, i) => (
              <Badge key={i} variant="secondary" className="bg-eps-surface font-normal">{skill}</Badge>
            ))}
            {job.skillsRequired.length > 4 && <Badge variant="secondary" className="font-normal">+{job.skillsRequired.length - 4}</Badge>}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0 flex gap-2">
        {onApply && <Button className="flex-1" onClick={() => onApply(job)}>Apply Now</Button>}
        {onView && <Button variant="outline" className={cn(onApply ? 'flex-none' : 'flex-1')} onClick={() => onView(job)}>View Details</Button>}
      </CardFooter>
    </Card>
  );
}
