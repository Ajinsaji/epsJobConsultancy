import { cn } from '../../../lib/cn';
import { FileText, Image as ImageIcon, Download } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export function MessageBubble({ message }) {
  const { user } = useAuth();
  
  // Handle temp messages during optimistic updates
  const isSender = typeof message.senderId === 'string' 
    ? message.senderId === user?._id 
    : message.senderId?._id === user?._id;

  return (
    <div className={cn("flex w-full mb-4", isSender ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
        isSender ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
      )}>
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.body}
        </p>
        
        {message.attachments?.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {message.attachments.map((file, idx) => (
              <a 
                key={idx}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex items-center gap-3 p-2 rounded-xl transition",
                  isSender ? "bg-indigo-500/50 hover:bg-indigo-500 text-white" : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  isSender ? "bg-indigo-400" : "bg-white"
                )}>
                  {file.mimeType?.startsWith('image/') ? (
                    <ImageIcon className={cn("h-4 w-4", isSender ? "text-white" : "text-slate-500")} />
                  ) : (
                    <FileText className={cn("h-4 w-4", isSender ? "text-white" : "text-slate-500")} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{file.originalName}</p>
                  <p className={cn("text-[10px]", isSender ? "text-indigo-200" : "text-slate-400")}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Download className={cn("h-4 w-4 shrink-0 mr-1", isSender ? "text-indigo-200" : "text-slate-400")} />
              </a>
            ))}
          </div>
        )}
        
        <div className={cn(
          "flex justify-end mt-1 gap-1 items-center", 
          isSender ? "text-indigo-200" : "text-slate-400"
        )}>
          <span className="text-[10px]">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isSender && (
            <span className="text-[10px] ml-1 uppercase tracking-wider">{message.status}</span>
          )}
        </div>
      </div>
    </div>
  );
}
