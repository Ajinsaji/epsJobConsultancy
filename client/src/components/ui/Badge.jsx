import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-blue-200 bg-blue-50 text-[#2563EB]',
        primary: 'border-blue-200 bg-blue-50 text-[#2563EB]',
        secondary: 'border-sky-200 bg-sky-50 text-[#3B82F6]',
        accent: 'border-teal-200 bg-teal-50 text-[#14B8A6]',
        success: 'border-emerald-200 bg-emerald-50 text-[#22C55E]',
        warning: 'border-amber-200 bg-amber-50 text-[#F59E0B]',
        destructive: 'border-red-200 bg-red-50 text-[#EF4444]',
        danger: 'border-red-200 bg-red-50 text-[#EF4444]',
        outline: 'border-[#E5E7EB] bg-white text-[#4B5563]',
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
