import { Bell } from 'lucide-react';

export function NotificationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 mb-3">
        <Bell className="h-6 w-6 text-slate-300" />
      </div>
      <h4 className="text-sm font-bold text-slate-700">No Notifications</h4>
      <p className="text-xs text-slate-500 mt-1">You're all caught up! Check back later for updates.</p>
    </div>
  );
}
