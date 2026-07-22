import React from 'react';
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
