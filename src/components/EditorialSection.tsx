import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { editorial } from '../data/collections'
import { ProductArt } from './ProductArt'

export function EditorialSection() {
  return (
    <section className="border-b border-line py-14 lg:py-20">
      <div className="shell">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <p className="eyebrow mb-3">Help picking</p>
            <h2 className="font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
              Can't decide? Compare them.
            </h2>
            <p className="mt-3 text-[15px] text-ink-soft">
              Specs pulled from the same sheets as the product pages, plus a real pick for each
              kind of buyer.
            </p>
          </div>
          <Link
            to="/journal"
            className="link-underline shrink-0 text-[13px] font-medium uppercase tracking-wideish"
          >
            All comparisons
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {editorial.map((a) => (
            <Link key={a.slug} to={`/journal/${a.slug}`} className="group flex flex-col">
              <div className="grid grid-cols-2 gap-0.5 overflow-hidden border border-line">
                <ProductArt
                  art={a.artA.art}
                  color={a.artA.artColor}
                  className="aspect-square transition-transform duration-500 ease-editorial group-hover:scale-[1.05]"
                />
                <ProductArt
                  art={a.artB.art}
                  color={a.artB.artColor}
                  className="aspect-square transition-transform duration-500 ease-editorial group-hover:scale-[1.05]"
                />
              </div>
              <p className="eyebrow mt-4">{a.category}</p>
              <h3 className="mt-1.5 font-display text-[18px] font-medium leading-snug">{a.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{a.description}</p>
              <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
                <span>{a.readTime}</span>
                <ArrowRight
                  size={15}
                  className="text-ink transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-accent"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
