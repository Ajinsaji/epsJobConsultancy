import { Search } from 'lucide-react';
import { cn } from '../../../lib/cn';

export function SearchEmptyState({ query, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-20 text-center", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
        <Search className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No results found</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        We couldn't find anything matching "{query}". Try adjusting your search terms or filters.
      </p>
    </div>
  );
}
