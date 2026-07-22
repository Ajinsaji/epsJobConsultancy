import { User as UserIcon, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export function ConversationHeader({ conversation }) {
  const { user } = useAuth();

  if (!conversation) return null;

  const otherParticipant = conversation.participants.find(p => p._id !== user?._id) || {};

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
          <UserIcon className="h-5 w-5 text-slate-500" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {otherParticipant.fullName || otherParticipant.email || 'Unknown User'}
          </h2>
          <p className="text-xs text-slate-500">
            {conversation.type} • {conversation.relatedEntity?.entityType}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Placeholder actions for V1.0 */}
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
          <Phone className="h-4 w-4" />
        </button>
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
          <Video className="h-4 w-4" />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
