import React from 'react'
import { cn } from '../../lib/cn'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-[12px] font-medium text-text-secondary mb-1.5">{label}</label>}
        <select
          className={cn(
            'w-full appearance-none rounded-md border border-border bg-modal px-4 py-2.5 text-[14px] text-text',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
            error && 'border-error focus:border-error focus:ring-error/30',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1.5 text-[12px] text-error">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-[12px] text-text-tertiary">{helperText}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select }
