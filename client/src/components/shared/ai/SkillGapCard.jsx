import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';

export const SkillGapCard = ({ matched, missing }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="border-b pb-3 mb-3">
        <h6 className="m-0 font-semibold text-slate-800">Skill Alignment</h6>
      </CardHeader>
      <CardContent>
        {matched?.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Matched Skills</div>
            <div className="d-flex flex-wrap gap-2">
              {matched.map(skill => (
                <span key={skill} className="badge bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <i className="bi bi-check-circle me-1"></i>{skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {missing?.critical?.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Missing Critical Skills</div>
            <div className="d-flex flex-wrap gap-2">
              {missing.critical.map(skill => (
                <span key={skill} className="badge bg-rose-100 text-rose-800 border border-rose-200">
                  <i className="bi bi-exclamation-circle me-1"></i>{skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {missing?.important?.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Missing Important Skills</div>
            <div className="d-flex flex-wrap gap-2">
              {missing.important.map(skill => (
                <span key={skill} className="badge bg-amber-100 text-amber-800 border border-amber-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {missing?.optional?.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Missing Optional Skills</div>
            <div className="d-flex flex-wrap gap-2">
              {missing.optional.map(skill => (
                <span key={skill} className="badge bg-slate-100 text-slate-600 border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
