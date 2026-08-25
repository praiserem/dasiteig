import React from 'react'

interface LoadingSkeletonProps {
  lines?: number
  className?: string
}

export function LoadingSkeleton({ lines = 1, className }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse space-y-2 ${className || ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-border/30 last:w-3/4"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="animate-pulse border border-border bg-surface rounded-xl overflow-hidden">
      <div className="aspect-square w-full bg-border/30" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-2/3 rounded bg-border/30" />
        <div className="h-4 w-3/4 rounded bg-border/30" />
        <div className="h-3 w-1/2 rounded bg-border/30" />
        <div className="h-4 w-1/4 rounded bg-border/30" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-surface p-6">
      <div className="h-3 w-24 rounded bg-border/30" />
      <div className="mt-3 h-8 w-16 rounded bg-border/30" />
    </div>
  )
}
