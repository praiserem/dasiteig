import { Link } from 'react-router-dom'
import { bundles } from '../data/collections'
import { ProductArt } from './ProductArt'
import { Button } from './ui/button'

export function BundleSection() {
  return (
    <section className="border-b border-border py-14 lg:py-20">
      <div className="shell">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <p className="eyebrow mb-3">Bought together</p>
            <h2 className="font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">
              Starter sets and bundles.
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              Pairings that actually go together. The saving applies the moment you add the set.
            </p>
          </div>
          <Link
            to="/bundles"
            className="link-underline shrink-0 text-[13px] font-medium uppercase tracking-wide"
          >
            See all bundles
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {bundles.map((b) => (
            <div key={b.slug} className="flex flex-col rounded-xl border border-border bg-surface">
              <div className="relative grid grid-cols-2 gap-0.5 overflow-hidden rounded-t-xl border-b border-border">
                <span className="absolute left-3 top-3 z-10 bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-bg">
                  15% off together
                </span>
                <ProductArt art={b.artA.art} color={b.artA.artColor} className="aspect-square" />
                <ProductArt art={b.artB.art} color={b.artB.artColor} className="aspect-square" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{b.kicker}</p>
                <h3 className="mt-1.5 font-display text-xl font-medium tracking-tighter text-text">{b.name}</h3>
                <p className="mt-2 flex-1 text-[14px] text-text-secondary">{b.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-mono text-[15px]">
                    <span className="mr-2 text-text-tertiary line-through">${b.originalPrice.toFixed(2)}</span>
                    <span className="text-accent">${b.bundlePrice.toFixed(2)}</span>
                  </p>
                  <Button variant="secondary" size="sm">
                    Add the set
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
