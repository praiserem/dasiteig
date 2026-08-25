import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, Truck } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductGallery } from '../components/ProductGallery'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../hooks/useCart'
import { StockBadge } from '../components/ui/stockBadge'
import { Button } from '../components/ui/button'

const tabs = ['Description', 'Specifications'] as const
type Tab = (typeof tabs)[number]

export function ProductPage() {
  const { slug } = useParams()
  const { products, loading } = useProducts()
  const product = slug ? products.find((p) => p.slug === slug) : undefined
  const [variant, setVariant] = useState(product?.variants[0]?.label ?? '')
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<Tab>('Description')
  const { addToCart } = useCart()

  const related = useMemo(
    () =>
      product
        ? products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
        : [],
    [product, products],
  )

  if (loading) {
    return (
      <div className="shell py-24">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-48 rounded bg-border/30" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="aspect-square rounded-xl bg-border/30" />
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-border/30" />
              <div className="h-8 w-64 rounded bg-border/30" />
              <div className="h-6 w-32 rounded bg-border/30" />
              <div className="h-20 w-full rounded bg-border/30" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="shell py-24 text-center">
        <p className="font-display text-2xl text-text">Product not found.</p>
        <p className="mt-2 text-text-secondary">It may have been removed or the link may be incorrect.</p>
        <Link to="/" className="mt-6 inline-block text-sm text-accent hover:underline">Back to shop</Link>
      </div>
    )
  }

  const isOutOfStock = product.status === 'OUT_OF_STOCK'

  return (
    <div className="shell py-10 lg:py-14">
      <nav className="mb-8 text-[13px] text-text-tertiary">
        <Link to="/" className="hover:text-accent">Home</Link>
        {' / '}
        <Link to={`/category/${product.category}`} className="capitalize hover:text-accent">{product.category}</Link>
        {' / '}
        <span className="text-text-secondary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery art={product.art} color={product.artColor} imageUrl={product.imageUrl} />

        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <p className="font-mono text-2xl text-text">
              ${product.price.toFixed(2)}
              {product.compareAt && (
                <span className="ml-3 text-base text-text-tertiary line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </p>
            <StockBadge status={product.status} />
          </div>

          {product.sku && (
            <p className="mt-2 font-mono text-[12px] text-text-tertiary">SKU: {product.sku}</p>
          )}

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary">
            {product.description}
          </p>

          {product.variants.length > 0 && (
            <div className="mt-7">
              <p className="eyebrow mb-2.5">
                {product.variantKind}: <span className="text-text-secondary">{variant}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setVariant(v.label)}
                    className={`flex items-center gap-2 rounded-md border px-3.5 py-2 text-[13px] transition-colors duration-200 ${
                      variant === v.label
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-text-tertiary hover:border-accent'
                    }`}
                  >
                    {v.swatch && (
                      <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: v.swatch }} />
                    )}
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-text-secondary hover:text-accent"
                aria-label="Decrease quantity"
                disabled={isOutOfStock}
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm text-text">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 text-text-secondary hover:text-accent"
                aria-label="Increase quantity"
                disabled={isOutOfStock}
              >
                <Plus size={14} />
              </button>
            </div>
            <Button
              variant={isOutOfStock ? 'secondary' : 'primary'}
              className="flex-1"
              disabled={isOutOfStock}
              onClick={() => !isOutOfStock && addToCart(product, variant, quantity)}
            >
              {isOutOfStock ? 'Out of stock' : `Add to cart — $${(product.price * quantity).toFixed(2)}`}
            </Button>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-md border border-border px-4 py-3 text-[13px] text-text-secondary">
            <Truck size={16} className="shrink-0 text-accent" />
            {product.shipping}
          </div>

          <div className="mt-10 border-t border-border">
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`border-b-2 py-3 text-[13px] font-medium uppercase tracking-wide transition-colors duration-200 ${
                    tab === t ? 'border-accent text-text' : 'border-transparent text-text-secondary hover:text-text'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="py-6 text-[14px] leading-relaxed text-text-secondary">
              {tab === 'Description' && (
                <ul className="space-y-2">
                  {product.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-accent">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {tab === 'Specifications' && (
                <dl className="divide-y divide-border">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between py-2.5">
                      <dt className="text-text-tertiary">{s.label}</dt>
                      <dd className="font-mono text-text">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-border pt-12">
          <p className="eyebrow mb-3">You might also like</p>
          <h2 className="mb-8 font-display text-2xl font-medium tracking-tighter text-text">
            More from {product.category}.
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
