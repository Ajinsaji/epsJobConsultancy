import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-eps-accent focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-eps-navy text-white hover:bg-eps-navy/80',
        secondary: 'border-transparent bg-eps-surface text-eps-navy hover:bg-eps-surface/80',
        destructive: 'border-transparent bg-eps-danger text-white hover:bg-eps-danger/80',
        success: 'border-transparent bg-eps-success text-white hover:bg-eps-success/80',
        warning: 'border-transparent bg-eps-warning text-white hover:bg-eps-warning/80',
        outline: 'text-eps-text border-eps-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
