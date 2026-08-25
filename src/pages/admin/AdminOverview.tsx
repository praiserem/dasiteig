import { useEffect, useState } from 'react'
import { Package, TrendingUp, AlertTriangle } from 'lucide-react'
import { api } from '../../lib/api'
import { StatCard } from '../../components/ui/statCard'
import { StockBadge } from '../../components/ui/stockBadge'
import { Link } from 'react-router-dom'
import { StatCardSkeleton } from '../../components/ui/loadingState'
import { EmptyState } from '../../components/ui/emptyState'
import { Button } from '../../components/ui/button'

interface DashboardStats {
  totalProducts: number
  totalStock: number
  lowStock: number
  outOfStock: number
  totalUsers: number
}

interface ActivityItem {
  id: number
  product_name: string
  change_type: string
  quantity: number
  new_qty: number
  created_at: string
}

export function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const res = await api.get<{ stats: DashboardStats; recentActivity: ActivityItem[] }>('/api/stats')
      setStats(res.stats)
      setActivity(res.recentActivity || [])
    } catch {
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-medium text-text">Overview</h1>
          <p className="mt-1 text-text-secondary">Dashboard overview of your inventory</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="space-y-8">
        <h1 className="font-display text-3xl font-medium text-text">Overview</h1>
        <EmptyState title="Could not load dashboard" description="Please try refreshing the page." />
      </div>
    )
  }

  const isEmpty = stats.totalProducts === 0

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-medium text-text">Overview</h1>
          <p className="mt-1 text-text-secondary">Dashboard overview of your inventory</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm">{isEmpty ? 'Add your first product' : '+ Add product'}</Button>
        </Link>
      </div>

      {isEmpty ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center">
          <h2 className="font-display text-xl font-medium text-text">Your store is empty</h2>
          <p className="mt-2 text-text-secondary max-w-md mx-auto">Start by adding your first product. Once it's created, it'll appear on the public website automatically.</p>
          <Link to="/admin/products/new" className="mt-6 inline-block">
            <Button variant="primary">Add your first product</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total products" value={stats.totalProducts} icon={<Package size={18} className="text-accent" />} />
            <StatCard label="Total stock" value={stats.totalStock} icon={<TrendingUp size={18} className="text-accent" />} />
            <StatCard label="Low stock" value={stats.lowStock} icon={<AlertTriangle size={18} className="text-warning" />} />
            <StatCard label="Out of stock" value={stats.outOfStock} icon={<AlertTriangle size={18} className="text-error" />} />
          </div>

          {stats.outOfStock > 0 && (
            <div className="rounded-xl border border-error/30 bg-error/5 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-error" />
                <p className="font-medium text-error">{stats.outOfStock} product(s) are out of stock</p>
              </div>
            </div>
          )}

          <div>
            <h2 className="font-display text-xl font-medium text-text mb-4">Recent inventory changes</h2>
            {activity.length === 0 ? (
              <EmptyState title="No changes yet" description="Adjust stock and changes will appear here." />
            ) : (
              <div className="rounded-xl border border-border bg-surface">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-[12px] font-mono uppercase tracking-wide text-text-tertiary">Product</th>
                      <th className="px-4 py-3 text-left text-[12px] font-mono uppercase tracking-wide text-text-tertiary">Type</th>
                      <th className="px-4 py-3 text-right text-[12px] font-mono uppercase tracking-wide text-text-tertiary">Qty</th>
                      <th className="px-4 py-3 text-right text-[12px] font-mono uppercase tracking-wide text-text-tertiary">New stock</th>
                      <th className="px-4 py-3 text-right text-[12px] font-mono uppercase tracking-wide text-text-tertiary">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((item) => (
                      <tr key={item.id} className="border-t border-border">
                        <td className="px-4 py-3 text-[14px] text-text">{item.product_name}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[12px] font-medium ${
                            item.change_type === 'ADD' ? 'text-success' : item.change_type === 'REMOVE' ? 'text-error' : 'text-accent'
                          }`}>{item.change_type}</span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-[14px] text-text">{item.quantity}</td>
                        <td className="px-4 py-3 text-right font-mono text-[14px] text-text">{item.new_qty}</td>
                        <td className="px-4 py-3 text-right text-[13px] text-text-tertiary">{new Date(item.created_at).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
