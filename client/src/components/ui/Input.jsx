import React from 'react';
import { cn } from '../../lib/cn';

export const Input = React.forwardRef(({ className, type, error, helperText, ...props }, ref) => {
  return (
    <div className="relative w-full space-y-1">
      <input
        type={type}
        className={cn(
          'flex h-[48px] w-full rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-xs font-medium text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-2xs',
          error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-red-100',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-[11px] font-semibold text-[#EF4444]">{error}</p>}
      {helperText && !error && <p className="text-[11px] font-medium text-[#6B7280]">{helperText}</p>}
    </div>
  );
});
Input.displayName = 'Input';
