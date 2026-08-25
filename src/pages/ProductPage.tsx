import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, Star, Truck } from 'lucide-react'
import { getProduct, products } from '../data/products'
import { ProductGallery } from '../components/ProductGallery'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const tabs = ['Description', 'Specifications', 'Reviews', 'FAQ'] as const
type Tab = (typeof tabs)[number]

export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined
  const [variant, setVariant] = useState(product?.variants[0]?.label ?? '')
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<Tab>('Description')
  const { addToCart } = useCart()

  const related = useMemo(
    () =>
      product
        ? products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
        : [],
    [product],
  )

  if (!product) {
    return (
      <div className="shell py-24 text-center">
        <p className="font-display text-2xl">We couldn't find that product.</p>
        <Link to="/" className="link-underline mt-4 inline-block text-sm">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="shell py-10 lg:py-14">
      <nav className="mb-8 text-[13px] text-muted">
        <Link to="/" className="hover:text-accent">
          Home
        </Link>
        {' / '}
        <Link to={`/category/${product.category}`} className="capitalize hover:text-accent">
          {product.category}
        </Link>
        {' / '}
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery art={product.art} color={product.artColor} />

        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-[13px] text-muted">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-5 font-mono text-2xl">
            ${product.price.toFixed(2)}
            {product.compareAt && (
              <span className="ml-3 text-base text-muted line-through">
                ${product.compareAt.toFixed(2)}
              </span>
            )}
          </p>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-7">
            <p className="eyebrow mb-2.5">
              {product.variantKind}: <span className="text-ink-soft">{variant}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setVariant(v.label)}
                  className={`flex items-center gap-2 border px-3.5 py-2 text-[13px] transition-colors duration-200 ${
                    variant === v.label
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line text-ink-soft hover:border-ink'
                  }`}
                >
                  {v.swatch && (
                    <span
                      className="h-3 w-3 rounded-full border border-black/10"
                      style={{ backgroundColor: v.swatch }}
                    />
                  )}
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center border border-line">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-ink hover:text-accent"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 text-ink hover:text-accent"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, variant, quantity)}
              className="btn-primary flex-1"
            >
              Add to cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 border border-line px-4 py-3 text-[13px] text-ink-soft">
            <Truck size={16} className="shrink-0 text-accent" />
            {product.shipping}
          </div>

          <div className="mt-10 border-t border-line">
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`border-b-2 py-3 text-[13px] font-medium uppercase tracking-wideish transition-colors duration-200 ${
                    tab === t ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="py-6 text-[14px] leading-relaxed text-ink-soft">
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
                <dl className="divide-y divide-line">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between py-2.5">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="font-mono text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === 'Reviews' && (
                <p>
                  {product.reviewCount} verified buyers rated this {product.rating.toFixed(1)} out
                  of 5. Full reviews open after checkout confirmation.
                </p>
              )}
              {tab === 'FAQ' && (
                <p>
                  Ships in 1–2 business days. 30-day returns on unused items. Reach support any
                  weekday for sizing or fit questions.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-line pt-12">
          <p className="eyebrow mb-3">You might also like</p>
          <h2 className="mb-8 font-display text-2xl font-semibold tracking-tightest">
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
