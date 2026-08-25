import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { Product, transformApiProduct } from '../../data/products'
import { Button } from '../../components/ui/button'
import { StockBadge } from '../../components/ui/stockBadge'
import { Modal } from '../../components/ui/modal'
import { EmptyState } from '../../components/ui/emptyState'

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get<{ products: any[] }>('/api/products')
      setProducts(res.products.map(transformApiProduct))
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.del(`/api/products/${deleteTarget.id}`)
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch {
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-border/30" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded bg-border/30" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-medium text-text">Products</h1>
          <p className="mt-1 text-text-secondary">{products.length} product{products.length === 1 ? '' : 's'} in your catalog</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm">+ Add product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="No products yet"
          description="Add your first product to start building your catalog."
          actionLabel="+ Add product"
          onAction={() => navigate('/admin/products/new')}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">Product</th>
                <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">Brand</th>
                <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">Price</th>
                <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">Stock</th>
                <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">Status</th>
                <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border transition-colors hover:bg-surface/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text">{p.name}</p>
                    <p className="text-xs text-text-tertiary">{p.visible !== false ? 'Visible' : 'Hidden'}</p>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-text-secondary">{p.brand}</td>
                  <td className="px-4 py-3 text-right font-mono text-[14px] text-text">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[14px] text-text">{p.stockQuantity}</td>
                  <td className="px-4 py-3"><StockBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/products/${p.slug}`} className="rounded px-2 py-1 text-[12px] text-text-tertiary hover:text-accent" target="_blank">View</Link>
                      <Link to={`/admin/products/edit/${p.id}`} className="rounded px-2 py-1 text-[12px] font-medium text-accent hover:bg-accent/10">Edit</Link>
                      <button onClick={() => setDeleteTarget(p)} className="rounded px-2 py-1 text-[12px] text-text-tertiary hover:text-error">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete product"
        description="This will permanently remove this product from your catalog."
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleDelete} disabled={deleting} className="bg-error hover:bg-error/90">
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-text-secondary">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
