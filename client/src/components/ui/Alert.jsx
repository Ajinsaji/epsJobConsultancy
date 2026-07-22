import React from 'react';
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
