import React from 'react';
import { cn } from '../../lib/cn';

export const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-input border border-eps-border bg-eps-bg px-3 py-2 text-sm text-eps-text placeholder:text-eps-text2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eps-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          error && 'border-eps-danger focus-visible:ring-eps-danger',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-eps-danger">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
