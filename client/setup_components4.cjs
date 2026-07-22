const fs = require('fs');
const path = require('path');

const components = {
  'ui/Modal.jsx': `import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div 
        className={cn("relative w-full max-w-lg rounded-card bg-eps-bg p-6 shadow-float", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-eps-border pb-4">
          <h2 className="text-xl font-bold text-eps-navy">{title}</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-eps-surface transition-colors">
            <X className="h-5 w-5 text-eps-text2" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
`,
  'ui/Tabs.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export const Tabs = ({ children, className }) => (
  <div className={cn('w-full', className)}>{children}</div>
);

export const TabsList = ({ children, className }) => (
  <div className={cn('flex items-center gap-2 border-b border-eps-border', className)}>
    {children}
  </div>
);

export const TabsTrigger = ({ active, onClick, children, className }) => (
  <button
    onClick={onClick}
    className={cn(
      'px-4 py-2 text-sm font-medium transition-colors border-b-2',
      active 
        ? 'border-eps-blue text-eps-blue' 
        : 'border-transparent text-eps-text2 hover:text-eps-navy hover:border-eps-border',
      className
    )}
  >
    {children}
  </button>
);

export const TabsContent = ({ active, children, className }) => (
  active ? <div className={cn('mt-4', className)}>{children}</div> : null
);
`,
  'dashboard/DataTable.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export function DataTable({ columns, data, keyField = 'id', className }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-eps-text2 bg-eps-surface rounded-card border border-eps-border">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto rounded-card border border-eps-border bg-eps-bg', className)}>
      <table className="w-full text-sm text-left">
        <thead className="bg-eps-surface text-eps-text2 uppercase text-xs font-semibold border-b border-eps-border">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-eps-border">
          {data.map((row, i) => (
            <tr key={row[keyField] || i} className="hover:bg-eps-surface/50 transition-colors">
              {columns.map((col, j) => (
                <td key={j} className="px-6 py-4">
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`,
  'ai/MatchScore.jsx': `import React from 'react';
import { cn } from '../../lib/cn';
import { Target } from 'lucide-react';

export function MatchScore({ score, label = "Match", className }) {
  let colorClass = 'text-eps-success bg-green-50 border-green-200';
  if (score < 75) colorClass = 'text-eps-warning bg-amber-50 border-amber-200';
  if (score < 50) colorClass = 'text-eps-danger bg-red-50 border-red-200';

  return (
    <div className={cn('inline-flex items-center gap-1.5 rounded-card border px-2.5 py-1', colorClass, className)}>
      <Target className="h-3.5 w-3.5" />
      <span className="text-sm font-bold">{score}%</span>
      {label && <span className="text-xs font-medium opacity-80 ml-1">{label}</span>}
    </div>
  );
}
`,
  'recruitment/CandidateCard.jsx': `import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Briefcase } from 'lucide-react';
import { MatchScore } from '../ai/MatchScore';
import { cn } from '../../lib/cn';

export function CandidateCard({ candidate, onAction, actionLabel = "View Profile", matchScore, className }) {
  return (
    <Card className={cn('transition-all hover:shadow-float', className)}>
      <CardContent className="p-5 flex flex-col items-center text-center">
        <Avatar src={candidate.photo} alt={candidate.fullName} size="xl" className="mb-4" />
        <h3 className="text-card-title text-eps-navy">{candidate.fullName}</h3>
        <p className="text-sm text-eps-text2 font-medium mt-1">{candidate.title || 'Professional'}</p>
        
        <div className="mt-3 flex items-center gap-3 text-xs text-eps-text2">
          {candidate.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {candidate.location}</span>}
          {candidate.experience && <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {candidate.experience}</span>}
        </div>

        {matchScore && (
          <div className="mt-4">
            <MatchScore score={matchScore} />
          </div>
        )}
        
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {candidate.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="secondary" className="font-normal text-[10px] px-2 py-0">{skill}</Badge>
            ))}
            {candidate.skills.length > 3 && <span className="text-xs text-eps-text2">+{candidate.skills.length - 3}</span>}
          </div>
        )}
      </CardContent>
      {onAction && (
        <CardFooter className="p-5 pt-0">
          <Button className="w-full" onClick={() => onAction(candidate)}>{actionLabel}</Button>
        </CardFooter>
      )}
    </Card>
  );
}
`
};

Object.entries(components).forEach(([name, content]) => {
  const fullPath = path.join(process.cwd(), 'src/components', name);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});

console.log('Fourth batch of components created.');
