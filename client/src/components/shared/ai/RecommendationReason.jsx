import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';

export const RecommendationReason = ({ explanation }) => {
  if (!explanation) return null;

  return (
    <Card className="mb-4 bg-indigo-50/50 border-indigo-100">
      <CardHeader className="border-b border-indigo-100 pb-3 mb-3">
        <h6 className="m-0 font-semibold text-slate-800">Why was this recommended?</h6>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700 mb-4 font-medium">{explanation.summary}</p>
        
        {explanation.strengths?.length > 0 && (
          <div className="mb-3">
            <h6 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Key Strengths</h6>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {explanation.strengths.map((str, i) => <li key={i}>{str}</li>)}
            </ul>
          </div>
        )}

        {explanation.improvements?.length > 0 && (
          <div className="mb-3">
            <h6 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Suggested Improvements</h6>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {explanation.improvements.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        )}

        {explanation.nextSteps?.length > 0 && (
          <div>
            <h6 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Next Steps</h6>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {explanation.nextSteps.map((gap, i) => <li key={i}>{gap}</li>)}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
