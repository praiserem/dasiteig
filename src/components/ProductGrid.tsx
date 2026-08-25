import { Link } from 'react-router-dom'
import { Product } from '../data/products'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  eyebrow: string
  title: string
  description: string
  products: Product[]
  viewAllHref?: string
  viewAllLabel?: string
  id?: string
}

export function ProductGrid({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = 'See all',
  id,
}: ProductGridProps) {
  return (
    <section id={id} className="border-b border-line py-14 lg:py-20">
      <div className="shell">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tightest sm:text-4xl">{title}</h2>
            <p className="mt-3 text-[15px] text-ink-soft">{description}</p>
          </div>
          {viewAllHref && (
            <Link to={viewAllHref} className="link-underline shrink-0 text-[13px] font-medium uppercase tracking-wideish">
              {viewAllLabel}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
