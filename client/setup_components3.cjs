const fs = require('fs');
const path = require('path');

const components = {
  'ui/PageHeader.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8', className)}>
      <div>
        <h1 className="text-page-title">{title}</h1>
        {description && <p className="mt-1 text-eps-text2">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
`,
  'ui/SectionHeader.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export function SectionHeader({ title, description, actions, className }) {
  return (
    <div className={cn('flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4', className)}>
      <div>
        <h2 className="text-section-title">{title}</h2>
        {description && <p className="text-sm text-eps-text2">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
`,
  'dashboard/AnalyticsCard.jsx': `import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../lib/cn';

export function AnalyticsCard({ title, value, icon, trend, trendValue, className }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-eps-text2 uppercase tracking-wider">{title}</p>
          {icon && <div className="text-eps-navy/50">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-eps-navy">{value}</h4>
        </div>
        {trend && (
          <div className="mt-3 flex items-center text-sm">
            <span className={cn('font-medium', trend === 'up' ? 'text-eps-success' : 'text-eps-danger')}>
              {trend === 'up' ? '+' : '-'}{trendValue}
            </span>
            <span className="ml-2 text-eps-text2">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
`,
  'dashboard/MetricsGrid.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export function MetricsGrid({ children, className }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {children}
    </div>
  );
}
`,
  'recruitment/JobCard.jsx': `import React from 'react';
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
`,
  'ai/ResumeScore.jsx': `import React from 'react';
import { cn } from '../../lib/cn';
import { Sparkles } from 'lucide-react';

export function ResumeScore({ score, label = "AI Resume Score", className }) {
  let colorClass = 'text-eps-success bg-green-50 border-green-200';
  if (score < 70) colorClass = 'text-eps-warning bg-amber-50 border-amber-200';
  if (score < 40) colorClass = 'text-eps-danger bg-red-50 border-red-200';

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-card border px-3 py-1.5', colorClass, className)}>
      <Sparkles className="h-4 w-4" />
      <span className="text-sm font-bold">{score}%</span>
      <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
  );
}
`,
  'whatsapp/WhatsAppButton.jsx': `import React from 'react';
import { Button } from '../ui/Button';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ phone, message, children = "Chat on WhatsApp", className, ...props }) {
  const handleClick = () => {
    const url = \`https://wa.me/\${phone.replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(message)}\`;
    window.open(url, '_blank');
  };

  return (
    <Button variant="whatsapp" onClick={handleClick} className={className} {...props}>
      <MessageCircle className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}
`,
  'status/StatusBadge.jsx': `import React from 'react';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/cn';

const statusConfig = {
  'applied': { variant: 'secondary', label: 'Applied' },
  'reviewed': { variant: 'default', label: 'Reviewed' },
  'shortlisted': { variant: 'default', label: 'Shortlisted' },
  'interview': { variant: 'warning', label: 'Interview' },
  'selected': { variant: 'success', label: 'Selected' },
  'offer': { variant: 'success', label: 'Offer Extended' },
  'placed': { variant: 'success', label: 'Placed' },
  'rejected': { variant: 'destructive', label: 'Rejected' },
};

export function StatusBadge({ status, className }) {
  const normalized = String(status || '').toLowerCase().replace(' ', '_');
  const config = statusConfig[normalized] || { variant: 'outline', label: status || 'Unknown' };
  
  return (
    <Badge variant={config.variant} className={cn('capitalize', className)}>
      {config.label}
    </Badge>
  );
}
`
};

Object.entries(components).forEach(([name, content]) => {
  const fullPath = path.join(process.cwd(), 'src/components', name);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});

console.log('Third batch of components created.');
