import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

export function MessageList({ messages, isLoading }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 p-6 flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-16 w-2/3 rounded-2xl bg-slate-100 animate-pulse ${i % 2 === 0 ? 'self-end' : 'self-start'}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
          No messages yet. Say hello!
        </div>
      ) : (
        messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
