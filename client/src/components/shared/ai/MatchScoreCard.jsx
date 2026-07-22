import React from 'react';
import { RecommendationBadge } from './RecommendationBadge';
import { Card, CardContent } from '../../ui/Card';

export const MatchScoreCard = ({ matchData, onClick }) => {
  if (!matchData || !matchData.data) return null;
  const { overallScore, recommendation, matchedSkills, missingSkills } = matchData.data;

  // Gauge calculation
  const strokeDasharray = `${overallScore}, 100`;
  const getColor = (score) => {
    if (score >= 90) return '#10b981'; // emerald
    if (score >= 75) return '#3b82f6'; // blue
    if (score >= 60) return '#f59e0b'; // amber
    return '#64748b'; // slate
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4 d-flex align-items-center gap-4">
        {/* SVG Circular Gauge */}
        <div className="relative" style={{ width: '60px', height: '60px' }}>
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              className="text-slate-200"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke={getColor(overallScore)}
              strokeWidth="3"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 d-flex align-items-center justify-content-center">
            <span className="text-sm font-bold text-slate-700">{overallScore}%</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="font-semibold text-slate-800">AI Match Score</span>
            <RecommendationBadge recommendation={recommendation} />
          </div>
          <div className="text-xs text-slate-500">
            {matchedSkills?.length || 0} Matched Skills • {(missingSkills?.critical?.length || 0) + (missingSkills?.important?.length || 0)} Missing
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
