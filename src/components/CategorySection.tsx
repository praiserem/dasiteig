import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/categories'

export function CategorySection() {
  return (
    <section className="border-b border-border py-14 lg:py-20">
      <div className="shell">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <p className="eyebrow mb-3">Shop by format</p>
            <h2 className="font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">
              Pick a format.
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              Six departments, everything counted. Open one to compare what's in stock.
            </p>
          </div>
          <Link
            to="/search"
            className="link-underline shrink-0 text-[13px] font-medium uppercase tracking-wide"
          >
            Shop all products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border/20 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="group flex flex-col justify-between gap-8 bg-surface p-7 transition-colors duration-200 hover:bg-elevated"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wide text-text-tertiary">
                  {c.count} products
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-text-secondary transition-transform duration-200 ease-fast group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tighter text-text">{c.name}</h3>
                <p className="mt-2 text-[14px] text-text-secondary">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
