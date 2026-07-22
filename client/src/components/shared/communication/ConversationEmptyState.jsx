import { MessageCircle } from 'lucide-react';

export function ConversationEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-slate-50/50">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
        <MessageCircle className="h-8 w-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-700">No Conversation Selected</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        Select a conversation from the list or start a new one to begin messaging.
      </p>
    </div>
  );
}
