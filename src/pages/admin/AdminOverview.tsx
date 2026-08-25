import { useEffect, useState } from 'react'
import { Package, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { api } from '../../lib/api'
import { Product, StockStatus, transformApiProduct } from '../../data/products'
import { StatCard } from '../../components/ui/statCard'
import { StockBadge } from '../../components/ui/stockBadge'
import { Link } from 'react-router-dom'
import { ProductSkeleton, StatCardSkeleton } from '../../components/ui/loadingState'
import { EmptyState } from '../../components/ui/emptyState'
import { Button } from '../../components/ui/button'

interface InventoryHistoryItem {
  id: number
  product_name: string
  sku?: string
  change_type: string
  quantity: number
  previous_qty: number
  new_qty: number
  reason?: string
  user_email?: string
  created_at: string
}

export function AdminOverview() {
  const [products, setProducts] = useState<Product[]>([])
  const [history, setHistory] = useState<InventoryHistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const productsRes = await api.get<{ products: any[] }>('/api/products')
      const historyRes = await api.get<{ changes: InventoryHistoryItem[] }>('/api/inventory/history')

      setProducts(productsRes.products.map((p) => transformApiProduct(p)))
      setHistory(historyRes.changes || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const totalStock = products.reduce((sum, p) => sum + p.stockQuantity, 0)
  const lowStock = products.filter((p) => p.status === 'LOW_STOCK').length
  const outOfStock = products.filter((p) => p.status === 'OUT_OF_STOCK').length

  const recentHistory = history.slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-medium text-text">Overview</h1>
          <p className="mt-1 text-text-secondary">Dashboard overview of your inventory</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-medium text-text">Overview</h1>
          <p className="mt-1 text-text-secondary">Dashboard overview of your inventory</p>
        </div>
        <Link to="/admin/inventory">
          <Button variant="secondary" size="sm">
            View full inventory
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total products"
          value={products.length}
          icon={<Package size={18} className="text-accent" />}
        />
        <StatCard
          label="Total stock"
          value={totalStock}
          icon={<TrendingUp size={18} className="text-accent" />}
        />
        <StatCard
          label="Low stock"
          value={lowStock}
          icon={<AlertTriangle size={18} className="text-warning" />}
        />
        <StatCard
          label="Out of stock"
          value={outOfStock}
          icon={<AlertTriangle size={18} className="text-error" />}
        />
      </div>

      {outOfStock > 0 && (
        <div className="rounded-xl border border-error/30 bg-error/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-error" />
            <p className="font-medium text-error">{outOfStock} product(s) are out of stock</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {products.filter((p) => p.status === 'OUT_OF_STOCK').map((p) => (
              <Link key={p.id} to={`/admin/inventory`}>
                <span className="text-sm text-error hover:text-error/80">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {lowStock > 0 && (
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-warning" />
            <p className="font-medium text-warning">{lowStock} product(s) are low in stock</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="font-display text-xl font-medium text-text mb-4">Recent inventory changes</h2>
        {recentHistory.length === 0 ? (
          <EmptyState
            title="No changes yet"
            description="Adjust stock and changes will appear here."
          />
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
                {recentHistory.map((item) => (
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
    </div>
  )
}
