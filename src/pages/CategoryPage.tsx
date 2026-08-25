import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { categories } from '../data/categories'
import { ProductCard } from '../components/ProductCard'
import { EmptyState } from '../components/ui/emptyState'

export function CategoryPage() {
  const { slug } = useParams()
  const { products, loading } = useProducts()

  const category = categories.find((c) => c.slug === slug)
  const isSpecial = slug === 'new' || slug === 'best-sellers'

  const title = slug === 'new' ? 'New arrivals' : slug === 'best-sellers' ? 'Best sellers' : category?.name ?? 'Products'
  const description = slug === 'new' ? 'The latest additions to the shelf.'
    : slug === 'best-sellers' ? 'What most people end up adding to their bag.'
    : category?.description ?? ''

  const list = useMemo(() => {
    if (slug === 'new') return products.filter((p) => p.new)
    if (slug === 'best-sellers') return products.filter((p) => p.bestSeller)
    return products.filter((p) => p.category === slug)
  }, [products, slug])

  return (
    <div className="shell py-12 lg:py-16">
      <nav className="mb-6 text-[13px] text-text-tertiary">
        <Link to="/" className="hover:text-accent">Home</Link>
        {' / '}
        <span className="text-text-secondary">{title}</span>
      </nav>
      {!isSpecial && <p className="eyebrow mb-3">Shop by format</p>}
      <h1 className="font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">{title}</h1>
      {description && <p className="mt-3 max-w-lg text-[15px] text-text-secondary">{description}</p>}

      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="aspect-square rounded-xl bg-border/30" />
              <div className="h-4 w-24 rounded bg-border/30" />
              <div className="h-5 w-36 rounded bg-border/30" />
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No products here yet"
            description={isSpecial ? "Products will appear here as they're added." : "No products in this category yet."}
          />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
