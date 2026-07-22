import React from 'react';
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
