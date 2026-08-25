import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Product } from '../data/products'
import { ProductArt } from './ProductArt'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}`} className="group flex flex-col">
      <div className="relative overflow-hidden border border-line bg-paper">
        <div className="absolute left-3 top-3 z-10 font-mono text-[11px] uppercase tracking-wideish text-ink-soft">
          {product.variants.length} {product.variantKind}
        </div>
        {(product.new || product.bestSeller) && (
          <div className="absolute right-3 top-3 z-10 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-wideish text-paper">
            {product.new ? 'New' : 'Best seller'}
          </div>
        )}
        <div className="overflow-hidden">
          <ProductArt
            art={product.art}
            color={product.artColor}
            className="aspect-square w-full transition-transform duration-500 ease-editorial group-hover:scale-[1.06]"
          />
        </div>
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">{product.brand}</p>
          <h3 className="mt-0.5 truncate font-display text-[16px] font-medium leading-snug">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-[14px]">
            ${product.price.toFixed(2)}
            {product.compareAt && (
              <span className="ml-2 text-muted line-through">${product.compareAt.toFixed(2)}</span>
            )}
          </p>
        </div>
      </div>
      <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-ink transition-colors duration-300 ease-editorial group-hover:text-accent">
        View options
        <ArrowRight
          size={13}
          className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
