import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../lib/cn';

export function AnalyticsCard({ title, value, icon, trend, trendValue, className }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-eps-text2 uppercase tracking-wider">{title}</p>
          {icon && <div className="text-eps-navy/50">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-eps-navy">{value}</h4>
        </div>
        {trend && (
          <div className="mt-3 flex items-center text-sm">
            <span className={cn('font-medium', trend === 'up' ? 'text-eps-success' : 'text-eps-danger')}>
              {trend === 'up' ? '+' : '-'}{trendValue}
            </span>
            <span className="ml-2 text-eps-text2">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
