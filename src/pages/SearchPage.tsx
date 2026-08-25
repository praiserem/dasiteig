import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'

export function SearchPage() {
  const [params] = useSearchParams()
  const brandFilter = params.get('brand')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    let list = products
    if (brandFilter) {
      list = list.filter((p) => p.brand.toLowerCase().replace(/[^a-z]/g, '-').includes(brandFilter))
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.includes(q),
      )
    }
    return list
  }, [query, brandFilter])

  return (
    <div className="shell py-12 lg:py-16">
      <p className="eyebrow mb-3">Full catalog</p>
      <h1 className="font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
        All products.
      </h1>
      <div className="mt-6 flex max-w-md items-center gap-3 border border-line px-4 py-3">
        <Search size={16} className="text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name, brand, or category"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">Nothing matches that filter.</p>
      )}
    </div>
  )
}
