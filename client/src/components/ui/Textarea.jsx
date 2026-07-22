import React from 'react';
import { cn } from '../../lib/cn';

export const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-input border border-eps-border bg-eps-bg px-3 py-2 text-sm text-eps-text placeholder:text-eps-text2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eps-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
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
Textarea.displayName = 'Textarea';
