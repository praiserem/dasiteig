import React from 'react'
import { cn } from '../../lib/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md'
}

const badgeVariants = {
  default: 'bg-accent text-bg',
  secondary: 'bg-surface text-text-secondary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  error: 'bg-error/15 text-error',
  outline: 'border border-border text-text-secondary',
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-mono text-[11px] font-medium uppercase tracking-wide',
          badgeVariants[variant],
          size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1',
          className,
        )}
        {...props}
      />
    )
  },
)
Badge.displayName = 'Badge'

export { Badge }
