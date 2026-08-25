import React from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-[12px] font-medium text-text-secondary mb-1.5">{label}</label>}
        <input
          className={cn(
            'w-full rounded-md border border-border bg-modal px-4 py-2.5 text-[14px] text-text placeholder:text-text-tertiary',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
            error && 'border-error focus:border-error focus:ring-error/30',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-[12px] text-error">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-[12px] text-text-tertiary">{helperText}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
