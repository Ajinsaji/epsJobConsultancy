import React from 'react'
import GlassCard from '../../../../components/ui/GlassCard'
import { GlassButton } from '../../../../components/ui/GlassButton'

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <GlassCard className="max-w-md w-full p-6 bg-slate-900 border-white/10 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{title || 'Confirm Action'}</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            {message || 'Are you sure you want to proceed? This action cannot be undone.'}
          </p>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <GlassButton variant="ghost" onClick={onClose} className="px-4 py-2 text-xs">
            Cancel
          </GlassButton>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="rounded-xl px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition"
          >
            Confirm & Delete
          </button>
        </div>
      </GlassCard>
    </div>
  )
}
