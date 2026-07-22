import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '../../../lib/cn';

export function SearchInput({ query, setQuery, isLoading, clear, placeholder = 'Search...', className }) {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <div className="absolute left-4 text-slate-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute right-4 flex items-center gap-2">
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />}
        {query && (
          <button 
            onClick={clear}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
