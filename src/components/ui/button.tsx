import React from 'react'
import { cn } from '../../lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  asChild?: boolean
}

const variantClasses = {
  primary: 'bg-accent text-bg hover:bg-accent-hover hover:-translate-y-0.5',
  secondary: 'border border-border bg-surface text-text hover:border-accent hover:text-accent',
  destructive: 'border border-error/30 bg-error-soft text-error hover:border-error hover:bg-error hover:text-bg',
  ghost: 'text-text-secondary hover:text-text hover:bg-surface',
  link: 'text-accent underline-offset-2 hover:underline',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-6 py-3 text-[14px]',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, asChild = false, children, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-fast focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50'

    if (asChild) {
      const Child = React.Children.only(children as unknown as React.ReactElement)
      return React.cloneElement(Child as React.ReactElement<any>, {
        ref,
        className: cn(baseClasses, variantClasses[variant], sizeClasses[size], (Child as any).props.className, className),
      })
    }

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], fullWidth && 'w-full', className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
