import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Briefcase } from 'lucide-react';
import { MatchScore } from '../ai/MatchScore';
import { cn } from '../../lib/cn';

export function CandidateCard({ candidate, onAction, actionLabel = "View Profile", matchScore, className }) {
  return (
    <Card className={cn('transition-all hover:shadow-float', className)}>
      <CardContent className="p-5 flex flex-col items-center text-center">
        <Avatar src={candidate.photo} alt={candidate.fullName} size="xl" className="mb-4" />
        <h3 className="text-card-title text-eps-navy">{candidate.fullName}</h3>
        <p className="text-sm text-eps-text2 font-medium mt-1">{candidate.title || 'Professional'}</p>
        
        <div className="mt-3 flex items-center gap-3 text-xs text-eps-text2">
          {candidate.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {candidate.location}</span>}
          {candidate.experience && <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {candidate.experience}</span>}
        </div>

        {matchScore && (
          <div className="mt-4">
            <MatchScore score={matchScore} />
          </div>
        )}
        
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {candidate.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="secondary" className="font-normal text-[10px] px-2 py-0">{skill}</Badge>
            ))}
            {candidate.skills.length > 3 && <span className="text-xs text-eps-text2">+{candidate.skills.length - 3}</span>}
          </div>
        )}
      </CardContent>
      {onAction && (
        <CardFooter className="p-5 pt-0">
          <Button className="w-full" onClick={() => onAction(candidate)}>{actionLabel}</Button>
        </CardFooter>
      )}
    </Card>
  );
}
