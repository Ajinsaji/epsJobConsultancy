import { cn } from '../../../lib/cn';
import { User as UserIcon } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export function ConversationList({ 
  conversations, 
  currentConversationId, 
  onSelect,
  isLoading 
}) {
  const { user } = useAuth();

  if (isLoading && conversations.length === 0) {
    return (
      <div className="flex flex-col gap-2 p-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 w-full rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        No active conversations.
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      {conversations.map(conversation => {
        // Find other participant's name (assuming 1-on-1 for V1.0)
        const otherParticipant = conversation.participants.find(p => p._id !== user?._id) || {};
        const unreadCount = conversation.unreadCounts?.[user?._id] || 0;
        const isActive = currentConversationId === conversation._id;
        
        return (
          <button
            key={conversation._id}
            onClick={() => onSelect(conversation._id)}
            className={cn(
              "flex items-center gap-3 p-4 border-b border-slate-100 transition text-left hover:bg-slate-50 focus:outline-none",
              isActive && "bg-indigo-50/50 border-l-4 border-l-indigo-500"
            )}
          >
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                <UserIcon className="h-5 w-5 text-slate-500" />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-sm font-bold text-slate-900 truncate pr-2">
                  {otherParticipant.fullName || otherParticipant.email || 'Unknown User'}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {conversation.lastActivity ? new Date(conversation.lastActivity).toLocaleDateString() : ''}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {conversation.type} • {conversation.relatedEntity?.entityType}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
