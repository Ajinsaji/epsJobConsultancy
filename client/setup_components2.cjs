const fs = require('fs');
const path = require('path');

const components = {
  'Textarea.jsx': `import React from 'react';
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
`,
  'Select.jsx': `import React from 'react';
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
`,
  'Checkbox.jsx': `import React from 'react';
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
`,
  'Alert.jsx': `import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-card border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>div]:pl-8',
  {
    variants: {
      variant: {
        default: 'bg-eps-surface text-eps-navy border-eps-border',
        destructive: 'bg-red-50 text-eps-danger border-red-200',
        success: 'bg-green-50 text-eps-success border-green-200',
        warning: 'bg-amber-50 text-eps-warning border-amber-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const icons = {
  default: <Info className="h-5 w-5" />,
  destructive: <XCircle className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
};

export const Alert = React.forwardRef(({ className, variant = 'default', title, children, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
    {icons[variant]}
    <div>
      {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
      <div className="text-sm opacity-90">{children}</div>
    </div>
  </div>
));
Alert.displayName = 'Alert';
`,
};

Object.entries(components).forEach(([name, content]) => {
  fs.writeFileSync(path.join(process.cwd(), 'src/components/ui', name), content);
});

console.log('Second batch of base UI components created.');
