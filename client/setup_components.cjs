const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components/ui',
  'src/components/recruitment',
  'src/components/dashboard',
  'src/components/ai',
  'src/components/whatsapp',
  'src/components/status',
  'src/components/shared',
  'src/lib',
  'src/hooks',
  'src/services',
  'src/store',
  'src/utils',
  'src/constants',
  'src/assets',
  'src/styles',
  'src/layouts'
];

dirs.forEach(d => fs.mkdirSync(path.join(process.cwd(), d), { recursive: true }));

const components = {
  'Button.jsx': `import React from 'react';
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
`,
  'Card.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-card border border-eps-border bg-eps-bg text-eps-text shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-card-title leading-none tracking-tight text-eps-navy', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-eps-text2', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';
`,
  'Input.jsx': `import React from 'react';
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
`,
  'Badge.jsx': `import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-eps-accent focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-eps-navy text-white hover:bg-eps-navy/80',
        secondary: 'border-transparent bg-eps-surface text-eps-navy hover:bg-eps-surface/80',
        destructive: 'border-transparent bg-eps-danger text-white hover:bg-eps-danger/80',
        success: 'border-transparent bg-eps-success text-white hover:bg-eps-success/80',
        warning: 'border-transparent bg-eps-warning text-white hover:bg-eps-warning/80',
        outline: 'text-eps-text border-eps-border',
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
`,
  'Avatar.jsx': `import React from 'react';
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
`,
  'Skeleton.jsx': `import React from 'react';
import { cn } from '../../lib/cn';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-eps-border/50', className)}
      {...props}
    />
  );
}
`,
  'Spinner.jsx': `import React from 'react';
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
`
};

Object.entries(components).forEach(([name, content]) => {
  fs.writeFileSync(path.join(process.cwd(), 'src/components/ui', name), content);
});

console.log('Directories and base UI components created.');
