import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { BookOpen } from 'lucide-react';

export const LearningSuggestionCard = ({ suggestion }) => {
  if (!suggestion) return null;

  return (
    <Card className="hover:shadow-md transition-shadow border-slate-100">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h5 className="font-bold text-slate-800 mb-1">{suggestion.skill}</h5>
          <div className="flex flex-wrap gap-2 text-xs font-semibold mb-3">
            <span className={`px-2 py-0.5 rounded-full ${suggestion.priority === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
              {suggestion.priority} Priority
            </span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              ~ {suggestion.estimatedLearningTime}
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-0">Expected Impact: <strong className="text-slate-800">{suggestion.expectedImpact}</strong> on matching probability.</p>
        </div>
      </CardContent>
    </Card>
  );
};
