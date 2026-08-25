import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { ProductCard } from '../components/ProductCard'

export function CategoryPage() {
  const { slug } = useParams()

  let title = 'Products'
  let description = ''
  let list = products

  if (slug === 'new') {
    title = 'New arrivals'
    description = 'The latest additions to the shelf.'
    list = products.filter((p) => p.new)
  } else if (slug === 'best-sellers') {
    title = 'Best sellers'
    description = 'What most people end up adding to their bag.'
    list = products.filter((p) => p.bestSeller)
  } else {
    const category = categories.find((c) => c.slug === slug)
    title = category?.name ?? 'Products'
    description = category?.description ?? ''
    list = products.filter((p) => p.category === slug)
  }

  return (
    <div className="shell py-12 lg:py-16">
      <nav className="mb-6 text-[13px] text-muted">
        <Link to="/" className="hover:text-accent">
          Home
        </Link>
        {' / '}
        <span className="text-ink-soft">{title}</span>
      </nav>
      <p className="eyebrow mb-3">Shop by format</p>
      <h1 className="font-display text-3xl font-semibold tracking-tightest sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-lg text-[15px] text-ink-soft">{description}</p>}

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">No products here yet — check back soon.</p>
      )}
    </div>
  )
}
