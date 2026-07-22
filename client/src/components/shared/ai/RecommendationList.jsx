import React from 'react';
import { RecommendationCard } from './RecommendationCard';
import { RecommendationSkeleton } from './RecommendationSkeleton';
import { RecommendationEmptyState } from './RecommendationEmptyState';

export const RecommendationList = ({ 
  recommendations, 
  isLoading, 
  onAction, 
  onViewDetails,
  emptyTitle,
  emptyMessage,
  layout = 'grid' // 'grid' | 'list'
}) => {
  if (isLoading) {
    return <RecommendationSkeleton count={3} />;
  }

  if (!recommendations || recommendations.length === 0) {
    return <RecommendationEmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {recommendations.map(rec => (
        <RecommendationCard 
          key={rec.recommendationId} 
          recommendation={rec} 
          onAction={onAction} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};
