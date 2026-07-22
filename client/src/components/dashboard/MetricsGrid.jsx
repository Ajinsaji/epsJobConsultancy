import React from 'react';
import { cn } from '../../lib/cn';

export function MetricsGrid({ children, className }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {children}
    </div>
  );
}
