import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';

const ScoreBar = ({ label, score }) => (
  <div className="mb-3">
    <div className="d-flex justify-content-between align-items-center mb-1">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="text-sm font-bold text-slate-900">{score}%</span>
    </div>
    <div className="progress" style={{ height: '8px' }}>
      <div 
        className={`progress-bar ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-slate-400'}`} 
        role="progressbar" 
        style={{ width: `${score}%` }} 
        aria-valuenow={score} 
        aria-valuemin="0" 
        aria-valuemax="100"
      ></div>
    </div>
  </div>
);

export const MatchBreakdown = ({ matchData }) => {
  if (!matchData || !matchData.data) return null;
  const { experienceScore, educationScore, skillsScore } = matchData.data;

  // We didn't explicitly return skillsScore directly in data except in the backend response it was embedded or implicit.
  // Wait, let's use the scores we have. (We have experienceScore, educationScore, certificationScore, languageScore)
  // I'll calculate average skills score or just show what's available.

  return (
    <Card className="mb-4">
      <CardHeader className="border-b pb-3 mb-3">
        <h6 className="m-0 font-semibold text-slate-800">Match Breakdown</h6>
      </CardHeader>
      <CardContent>
        {experienceScore !== undefined && <ScoreBar label="Experience Alignment" score={experienceScore} />}
        {educationScore !== undefined && <ScoreBar label="Education Alignment" score={educationScore} />}
      </CardContent>
    </Card>
  );
};
