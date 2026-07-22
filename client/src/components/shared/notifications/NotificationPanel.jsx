import { NotificationItem } from './NotificationItem';
import { NotificationEmptyState } from './NotificationEmptyState';

export function NotificationPanel({ notifications, isLoading, markAsRead, markAllAsRead }) {
  if (isLoading && notifications.length === 0) {
    return (
      <div className="p-4 space-y-3">
        {[1,2,3].map(i => (
          <div key={i} className="h-24 w-full rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return (
    <div className="flex flex-col h-full max-h-[400px]">
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 shrink-0 bg-slate-50/50">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Notifications</span>
        <button 
          onClick={markAllAsRead}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          Mark all read
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {notifications.map(n => (
          <NotificationItem key={n._id} notification={n} onRead={markAsRead} />
        ))}
      </div>
    </div>
  );
}
