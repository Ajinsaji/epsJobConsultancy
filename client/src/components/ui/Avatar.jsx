import React from 'react';
import { cn } from '../../lib/cn';

export const Avatar = React.forwardRef(({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-20 w-20 text-xl'
  };
  
  return (
    <div
      ref={ref}
      className={cn('relative flex shrink-0 overflow-hidden rounded-full bg-eps-surface border border-eps-border', sizes[size], className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium text-eps-navy bg-eps-surface">
          {fallback || alt?.charAt(0) || 'U'}
        </div>
      )}
    </div>
  );
});
Avatar.displayName = 'Avatar';
