import React from 'react';

export const RecommendationBadge = ({ recommendation }) => {
  if (!recommendation) return null;

  const getStyle = (code) => {
    switch (code) {
      case 'EXCELLENT':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'STRONG':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'POTENTIAL':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'WEAK':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const styleClass = getStyle(recommendation.code);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styleClass}`}>
      {recommendation.label}
    </span>
  );
};
