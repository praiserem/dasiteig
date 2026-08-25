import React from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We couldn\'t load this content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <AlertCircle size={48} className="mb-4 text-error" />
      <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md border border-border bg-surface px-4 py-2 text-[13px] font-medium text-text transition-all hover:border-accent hover:text-accent"
        >
          Try again
        </button>
      )}
    </div>
  )
}
