import React from 'react';
import { cn } from '../../lib/cn';

export function SectionHeader({ title, description, actions, className }) {
  return (
    <div className={cn('flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4', className)}>
      <div>
        <h2 className="text-section-title">{title}</h2>
        {description && <p className="text-sm text-eps-text2">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
