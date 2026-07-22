import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Target, TrendingUp, Sparkles, FileText } from 'lucide-react';

export const CareerInsightCard = ({ insights }) => {
  if (!insights) return null;

  return (
    <Card className="hover:shadow-md transition-shadow border-slate-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">Career Trajectory</h4>
            <div className="text-sm text-slate-500 font-semibold">Profile Completeness: {insights.profileCompleteness}%</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-indigo-500" />
              <h6 className="font-bold text-slate-800 m-0">Suggested Path</h6>
            </div>
            <div className="space-y-2">
              {insights.careerPath?.map((path, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                  {path}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h6 className="font-bold text-slate-800 m-0">Alternative Next Roles</h6>
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.nextRoles?.map((role, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-rose-500" />
            <h6 className="font-bold text-slate-800 m-0">Resume Improvements</h6>
          </div>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            {insights.resumeImprovements?.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
