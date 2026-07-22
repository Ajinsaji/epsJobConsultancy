import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Spinner({ className, size = 'md', ...props }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  return (
    <Loader2 
      className={cn('animate-spin text-eps-blue', sizes[size], className)} 
      {...props} 
    />
  );
}
