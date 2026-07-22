import { cn } from '../../../lib/cn';

export function SearchSkeleton({ count = 3, className }) {
  return (
    <div className={cn("space-y-4 w-full", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-start gap-4 animate-pulse">
          <div className="h-12 w-12 rounded-xl bg-slate-200 shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-1/3 rounded bg-slate-200" />
            <div className="h-4 w-1/4 rounded bg-slate-100" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 w-16 rounded-full bg-slate-100" />
              <div className="h-6 w-16 rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
