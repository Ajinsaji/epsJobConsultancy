import React from 'react';
import { cn } from '../../lib/cn';
import { Target } from 'lucide-react';

export function MatchScore({ score, label = "Match", className }) {
  let colorClass = 'text-eps-success bg-green-50 border-green-200';
  if (score < 75) colorClass = 'text-eps-warning bg-amber-50 border-amber-200';
  if (score < 50) colorClass = 'text-eps-danger bg-red-50 border-red-200';

  return (
    <div className={cn('inline-flex items-center gap-1.5 rounded-card border px-2.5 py-1', colorClass, className)}>
      <Target className="h-3.5 w-3.5" />
      <span className="text-sm font-bold">{score}%</span>
      {label && <span className="text-xs font-medium opacity-80 ml-1">{label}</span>}
    </div>
  );
}
