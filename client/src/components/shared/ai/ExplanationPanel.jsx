import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';

export const ExplanationPanel = ({ explanation }) => {
  if (!explanation) return null;

  return (
    <Card className="mb-4 bg-slate-50 border-slate-200">
      <CardHeader className="border-b border-slate-200 pb-3 mb-3">
        <h6 className="m-0 font-semibold text-slate-800">AI Match Explanation</h6>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700 mb-4">{explanation.summary}</p>
        
        {explanation.strengths?.length > 0 && (
          <div className="mb-3">
            <h6 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Strengths</h6>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {explanation.strengths.map((str, i) => <li key={i}>{str}</li>)}
            </ul>
          </div>
        )}

        {explanation.recommendations?.length > 0 && (
          <div className="mb-3">
            <h6 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Recommendations for Candidate</h6>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {explanation.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        )}

        {explanation.gaps?.length > 0 && (
          <div>
            <h6 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">Recruiter Insights / Gaps</h6>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {explanation.gaps.map((gap, i) => <li key={i}>{gap}</li>)}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
