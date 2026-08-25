import { Link } from 'react-router-dom'
import { brands } from '../data/collections'

export function BrandList() {
  return (
    <section className="border-b border-line py-14 lg:py-20">
      <div className="shell">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3">Shop by brand</p>
            <h2 className="font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
              Brands in stock.
            </h2>
          </div>
          <Link
            to="/search"
            className="link-underline shrink-0 text-[13px] font-medium uppercase tracking-wideish"
          >
            All products
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-8">
          {brands.map((b) => (
            <Link
              key={b.slug}
              to={`/search?brand=${b.slug}`}
              className="link-underline font-display text-xl font-medium text-ink-soft sm:text-2xl"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
