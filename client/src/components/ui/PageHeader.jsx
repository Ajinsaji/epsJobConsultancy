import React from 'react';
import { cn } from '../../lib/cn';

export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8', className)}>
      <div>
        <h1 className="text-page-title">{title}</h1>
        {description && <p className="mt-1 text-eps-text2">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
