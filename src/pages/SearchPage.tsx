import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { Input } from '../components/ui/input'

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
      <h1 className="font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">
        All products.
      </h1>
      <div className="mt-6 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, brand, or category"
            className="pl-10"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-10 text-center text-sm text-text-tertiary">Nothing matches that filter.</p>
      )}
    </div>
  )
}
