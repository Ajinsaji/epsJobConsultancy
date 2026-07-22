import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eps-blue disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-eps-blue text-white hover:bg-eps-blue/90 shadow-soft',
        destructive: 'bg-eps-danger text-white hover:bg-eps-danger/90',
        outline: 'border border-eps-border bg-transparent hover:bg-eps-surface text-eps-text',
        secondary: 'bg-eps-surface text-eps-navy hover:bg-eps-surface/80',
        ghost: 'hover:bg-eps-surface hover:text-eps-navy text-eps-text',
        link: 'text-eps-blue underline-offset-4 hover:underline',
        whatsapp: 'bg-eps-whatsapp text-white hover:bg-eps-whatsapp/90 shadow-soft',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = React.forwardRef(({ className, variant, size, isLoading, children, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});
Button.displayName = 'Button';
