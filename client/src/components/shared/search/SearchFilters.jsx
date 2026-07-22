import { cn } from '../../../lib/cn';

export function SearchFilters({ filters, setFilters, filterOptions, className }) {
  const handleSelect = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value
    }));
  };

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {filterOptions.map(option => (
        <select
          key={option.key}
          value={filters[option.key] || ''}
          onChange={(e) => handleSelect(option.key, e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none hover:border-indigo-500 transition-colors cursor-pointer shadow-sm appearance-none"
          style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '40px' }}
        >
          <option value="">{option.label}</option>
          {option.values.map(val => (
            <option key={val.value} value={val.value}>{val.label}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
