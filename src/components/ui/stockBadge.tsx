import React from 'react'
import { cn } from '../../lib/cn'
import { type StockStatus } from '../../data/products'

interface StockBadgeProps {
  status: StockStatus
  size?: 'sm' | 'md'
  showText?: boolean
}

const statusConfig: Record<StockStatus, { label: string; classes: string }> = {
  IN_STOCK: { label: 'In stock', classes: 'bg-success/15 text-success' },
  LOW_STOCK: { label: 'Low stock', classes: 'bg-warning/15 text-warning' },
  OUT_OF_STOCK: { label: 'Out of stock', classes: 'bg-error/15 text-error' },
}

export function StockBadge({ status, size = 'md', showText = true }: StockBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-mono text-[11px] font-medium uppercase tracking-wide',
        config.classes,
        size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1',
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'IN_STOCK'
            ? 'bg-success'
            : status === 'LOW_STOCK'
              ? 'bg-warning'
              : 'bg-error',
        )}
      />
      {showText && config.label}
    </span>
  )
}
