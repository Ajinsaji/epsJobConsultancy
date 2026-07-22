import { cn } from '../../../lib/cn';
import { Bell, CheckCircle, FileText, Calendar, Building, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const getIconForType = (type) => {
  switch (type) {
    case 'APPLICATION_SUBMITTED':
      return <FileText className="h-5 w-5 text-indigo-500" />;
    case 'INTERVIEW_SCHEDULED':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'APPLICATION_ACCEPTED':
    case 'CANDIDATE_ACCEPTED':
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    case 'NEW_APPLICANT':
      return <Building className="h-5 w-5 text-violet-500" />;
    default:
      return <Info className="h-5 w-5 text-slate-500" />;
  }
};

export function NotificationItem({ notification, onRead }) {
  const { title, message, read, metadata, type, createdAt } = notification;

  const content = (
    <div 
      className={cn(
        "flex gap-4 p-4 rounded-xl border transition-all cursor-pointer",
        read 
          ? "bg-white border-slate-100 opacity-75 hover:bg-slate-50" 
          : "bg-indigo-50/30 border-indigo-100 hover:bg-indigo-50 shadow-sm"
      )}
      onClick={() => {
        if (!read) onRead(notification._id);
      }}
    >
      <div className={cn(
        "flex shrink-0 h-10 w-10 items-center justify-center rounded-full",
        read ? "bg-slate-100" : "bg-white shadow-sm"
      )}>
        {getIconForType(type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={cn("text-sm truncate", read ? "font-semibold text-slate-700" : "font-bold text-slate-900")}>
          {title}
        </h4>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {message}
        </p>
        <span className="mt-2 block text-xs font-semibold text-slate-400">
          {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {!read && (
        <div className="flex shrink-0 items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
        </div>
      )}
    </div>
  );

  if (metadata?.actionUrl) {
    return (
      <Link to={metadata.actionUrl} onClick={() => !read && onRead(notification._id)}>
        {content}
      </Link>
    );
  }

  return content;
}
