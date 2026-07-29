import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-2xs hover:shadow-md',
        primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-2xs hover:shadow-md',
        destructive: 'bg-[#EF4444] text-white hover:bg-red-600 shadow-2xs',
        outline: 'border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#111827] hover:border-gray-300 shadow-2xs',
        secondary: 'bg-[#3B82F6] text-white hover:bg-blue-600 shadow-2xs',
        ghost: 'hover:bg-gray-100 text-[#4B5563] hover:text-[#111827]',
        link: 'text-[#2563EB] underline-offset-4 hover:underline p-0 h-auto font-semibold',
      },
      size: {
        default: 'h-[44px] px-5 py-2.5',
        sm: 'h-[36px] rounded-lg px-3 py-1.5 text-[11px]',
        lg: 'h-[48px] rounded-xl px-8 text-sm',
        icon: 'h-[44px] w-[44px]',
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
