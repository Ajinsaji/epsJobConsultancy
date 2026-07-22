import React from 'react';
import { cn } from '../../lib/cn';
import { ChevronDown } from 'lucide-react';

export const Select = React.forwardRef(({ className, options = [], error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'flex h-10 w-full appearance-none rounded-input border border-eps-border bg-eps-bg px-3 py-2 text-sm text-eps-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eps-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          error && 'border-eps-danger focus-visible:ring-eps-danger',
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
      {error && <p className="mt-1 text-xs text-eps-danger">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
