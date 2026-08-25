import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { Product, transformApiProduct } from '../../data/products'
import { Button } from '../../components/ui/button'
import { StockBadge } from '../../components/ui/stockBadge'

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get<{ products: any[] }>('/api/products')
      setProducts(res.products.map((p) => transformApiProduct(p)))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-border/30" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded bg-border/30" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-medium text-text">Products</h1>
          <p className="mt-1 text-text-secondary">{products.length} products in your catalog</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm">
            + Add product
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                Product
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                Brand
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                Price
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                Status
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border transition-colors hover:bg-surface/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-text">{p.name}</p>
                  <p className="text-xs text-text-tertiary">{p.slug}</p>
                </td>
                <td className="px-4 py-3 text-[14px] text-text-secondary">{p.brand}</td>
                <td className="px-4 py-3 text-right font-mono text-[14px] text-text">
                  ${p.price.toFixed(2)}
                  {p.compareAt && <span className="ml-1 text-text-tertiary">/{p.compareAt.toFixed(2)}</span>}
                </td>
                <td className="px-4 py-3 text-right font-mono text-[14px] text-text">{p.stockQuantity}</td>
                <td className="px-4 py-3">
                  <StockBadge status={p.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/products/edit/${p.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No products yet.</p>
          <Link to="/admin/products/new" className="mt-2 inline-block text-accent">
            Add your first product
          </Link>
        </div>
      )}
    </div>
  )
}
