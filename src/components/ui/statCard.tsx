import React from 'react'
import { cn } from '../../lib/cn'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function StatCard({ label, value, icon, trend = 'neutral', className }: StatCardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-text-secondary',
  }

  return (
    <div className={cn('rounded-xl border border-border bg-surface p-6', className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wide text-text-tertiary">{label}</p>
        {icon && <div className="text-text-tertiary">{icon}</div>}
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-text">{value}</p>
      {trend !== 'neutral' && (
        <span className={`mt-1 text-[12px] font-medium ${trendColors[trend]}`}>
          {trend === 'up' ? '↗' : '↘'}
        </span>
      )}
    </div>
  )
}
