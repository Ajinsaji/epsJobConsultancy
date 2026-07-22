import React from 'react';
import { Sparkles } from 'lucide-react';

export const RecommendationEmptyState = ({ title = 'No Recommendations Yet', message = 'Check back later or update your profile.' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
      <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">{message}</p>
    </div>
  );
};
