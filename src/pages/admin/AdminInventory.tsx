import { useEffect, useState, useMemo } from 'react'
import { Search, Filter, SortAsc, SortDesc, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { Product, StockStatus, transformApiProduct } from '../../data/products'
import { StockBadge } from '../../components/ui/stockBadge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { ProductSkeleton } from '../../components/ui/loadingState'
import { EmptyState } from '../../components/ui/emptyState'

type FilterType = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'
type SortField = 'name' | 'stock' | 'price' | 'newest' | 'oldest'

interface InventoryTableRowProps {
  product: Product
  onAdjustClick: (product: Product) => void
}

function InventoryTableRow({ product, onAdjustClick }: InventoryTableRowProps) {
  return (
    <tr className="border-t border-border transition-colors hover:bg-surface/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-md bg-modal flex items-center justify-center">
            <span className="text-xs text-text-tertiary">{product.art}</span>
          </div>
          <div>
            <p className="font-medium text-text">{product.name}</p>
            <p className="text-xs text-text-tertiary">{product.brand}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-mono text-sm text-text-secondary">{product.sku || '—'}</td>
      <td className="px-4 py-3 font-mono text-sm text-text">{product.stockQuantity}</td>
      <td className="px-4 py-3">
        <StockBadge status={product.status} />
      </td>
      <td className="px-4 py-3 font-mono text-sm text-accent">${product.price.toFixed(2)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onAdjustClick(product)}
            className="rounded-md px-2 py-1 text-[12px] font-medium text-accent hover:bg-accent/10"
          >
            + Stock
          </button>
          <button
            onClick={() => onAdjustClick(product)}
            className="rounded-md px-2 py-1 text-[12px] font-medium text-text-secondary hover:bg-surface"
          >
            − Stock
          </button>
          <Link to={`/admin/products/edit/${product.id}`}>
            <button className="rounded-md px-2 py-1 text-[12px] font-medium text-text-secondary hover:bg-surface">
              Edit
            </button>
          </Link>
        </div>
      </td>
    </tr>
  )
}

export function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [sortField, setSortField] = useState<SortField>('newest')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const navigate = useNavigate()

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

  const filtered = useMemo(() => {
    let result = [...products]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)))
    }

    if (filter === 'in_stock') {
      result = result.filter((p) => p.status === 'IN_STOCK')
    } else if (filter === 'low_stock') {
      result = result.filter((p) => p.status === 'LOW_STOCK')
    } else if (filter === 'out_of_stock') {
      result = result.filter((p) => p.status === 'OUT_OF_STOCK')
    }

    result.sort((a, b) => {
      let aVal: any, bVal: any
      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        case 'stock':
          aVal = a.stockQuantity
          bVal = b.stockQuantity
          break
        case 'price':
          aVal = a.price
          bVal = b.price
          break
        case 'newest':
          aVal = a.updatedAt || a.createdAt || ''
          bVal = b.updatedAt || b.createdAt || ''
          break
        case 'oldest':
          aVal = a.createdAt || ''
          bVal = b.createdAt || ''
          break
        default:
          return 0
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [products, searchQuery, filter, sortField, sortDir])

  const handleAdjustClick = (product: Product) => {
    navigate(`/admin/inventory/adjust/${product.id}`, {
      state: { productName: product.name, currentStock: product.stockQuantity },
    })
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
          <h1 className="font-display text-3xl font-medium text-text">Inventory</h1>
          <p className="mt-1 text-text-secondary">{filtered.length} products in stock</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm">
            + Add product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or SKU..."
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="rounded-md border border-border bg-modal px-3 py-2 text-[13px] text-text focus:outline-none focus:ring-1 focus:ring-accent/30"
          >
            <option value="all">All products</option>
            <option value="in_stock">In stock</option>
            <option value="low_stock">Low stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>

          <select
            value={`${sortField}-${sortDir}`}
            onChange={(e) => {
              const [field, dir] = e.target.value.split('-')
              setSortField(field as SortField)
              setSortDir(dir as 'asc' | 'desc')
            }}
            className="rounded-md border border-border bg-modal px-3 py-2 text-[13px] text-text focus:outline-none focus:ring-1 focus:ring-accent/30"
          >
            <option value="newest-desc">Newest first</option>
            <option value="oldest-asc">Oldest first</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="stock-asc">Stock low→high</option>
            <option value="price-asc">Price low→high</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 && !loading ? (
        <EmptyState
          title="No products match"
          description="Try adjusting your search or filter."
          icon={<Filter size={48} />}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                  SKU
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-mono uppercase tracking-wide text-text-tertiary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <InventoryTableRow key={p.id} product={p} onAdjustClick={handleAdjustClick} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
