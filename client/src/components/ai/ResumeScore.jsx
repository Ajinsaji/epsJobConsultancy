import React from 'react';
import { cn } from '../../lib/cn';
import { Sparkles } from 'lucide-react';

export function ResumeScore({ score, label = "AI Resume Score", className }) {
  let colorClass = 'text-eps-success bg-green-50 border-green-200';
  if (score < 70) colorClass = 'text-eps-warning bg-amber-50 border-amber-200';
  if (score < 40) colorClass = 'text-eps-danger bg-red-50 border-red-200';

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-card border px-3 py-1.5', colorClass, className)}>
      <Sparkles className="h-4 w-4" />
      <span className="text-sm font-bold">{score}%</span>
      <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
  );
}
