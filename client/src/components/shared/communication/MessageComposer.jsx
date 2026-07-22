import { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useUpload } from '../../../hooks/useUpload';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

export function MessageComposer({ onSendMessage, disabled }) {
  const [body, setBody] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const { uploadFile, isUploading } = useUpload();
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    // Basic validation according to recommendation (Images, PDFs under 10MB)
    const validFiles = acceptedFiles.filter(f => {
      if (f.size > 10 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });
    setPendingFiles(prev => [...prev, ...validFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': []
    },
    noClick: true, // Only open file dialog on paperclip click, otherwise typing handles clicks
    noKeyboard: true
  });

  const removeFile = (index) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (disabled || isUploading || (!body.trim() && pendingFiles.length === 0)) return;

    try {
      // 1. Upload files first
      const uploadedAttachments = [];
      for (const file of pendingFiles) {
        // Assume 'communication' is a valid category in upload system
        const meta = await uploadFile(file, 'communication');
        uploadedAttachments.push({
          url: meta.url,
          originalName: meta.originalName,
          mimeType: meta.mimeType,
          size: meta.size
        });
      }

      // 2. Send message
      await onSendMessage(body, uploadedAttachments);
      
      // 3. Reset state
      setBody('');
      setPendingFiles([]);
      setTimeout(() => inputRef.current?.focus(), 10);
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "p-4 border-t border-slate-100 bg-white relative",
        isDragActive && "after:absolute after:inset-0 after:bg-indigo-50/90 after:z-10 after:flex after:items-center after:justify-center after:content-['Drop_files_here_to_attach'] after:text-indigo-600 after:font-bold after:border-2 after:border-dashed after:border-indigo-400"
      )}
    >
      <input {...getInputProps()} id="composer-file-input" />
      
      {pendingFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {pendingFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-100 text-slate-700 text-xs py-1 px-3 rounded-full border border-slate-200 shadow-sm">
              <span className="truncate max-w-[150px] font-medium">{f.name}</span>
              <button 
                type="button" 
                onClick={() => removeFile(i)}
                className="hover:bg-slate-200 rounded-full p-0.5 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form 
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 shadow-inner transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50"
      >
        <label 
          htmlFor="composer-file-input" 
          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl cursor-pointer transition shrink-0"
        >
          <Paperclip className="h-5 w-5" />
        </label>
        
        <textarea
          ref={inputRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent resize-none outline-none py-3 px-2 text-sm text-slate-800 placeholder:text-slate-400 min-h-[44px] max-h-32"
          rows={1}
          disabled={disabled || isUploading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        
        <button
          type="submit"
          disabled={disabled || isUploading || (!body.trim() && pendingFiles.length === 0)}
          className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50 disabled:active:scale-100 shrink-0 shadow-sm font-semibold"
        >
          {isUploading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
}
