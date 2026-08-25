import React from 'react'
import { cn } from '../../lib/cn'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
}

export function Toast({ message, type = 'info', isVisible }: ToastProps) {
  const typeClasses = {
    success: 'bg-success/15 border border-success/30 text-success',
    error: 'bg-error/15 border border-error/30 text-error',
    info: 'bg-accent/15 border border-accent/30 text-accent',
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 max-w-sm rounded-md border px-4 py-3 text-[13px] font-medium',
        'transition-all duration-300 ease-fast',
        typeClasses[type],
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none',
      )}
    >
      {message}
    </div>
  )
}
