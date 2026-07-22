import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div 
        className={cn("relative w-full max-w-lg rounded-card bg-eps-bg p-6 shadow-float", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-eps-border pb-4">
          <h2 className="text-xl font-bold text-eps-navy">{title}</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-eps-surface transition-colors">
            <X className="h-5 w-5 text-eps-text2" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
