import React from 'react';
import { cn } from '../../lib/cn';

export const Checkbox = React.forwardRef(({ className, label, ...props }, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-eps-border bg-eps-bg accent-eps-navy focus:outline-none focus:ring-2 focus:ring-eps-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</span>}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
