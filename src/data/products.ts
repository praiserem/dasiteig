export interface Variant {
  label: string
  swatch?: string
}

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'

export interface Product {
  id?: number
  uuid?: string
  slug: string
  brand: string
  name: string
  category: string
  price: number
  compareAt?: number | null
  art: string
  artColor: string
  variantKind: string
  variants: Variant[]
  description: string
  details: string[]
  specs: { label: string; value: string }[]
  shipping: string
  sku?: string | null
  stockQuantity: number
  lowStockThreshold: number
  new?: boolean
  bestSeller?: boolean
  imageUrl?: string | null
  visible?: boolean
  createdAt?: string
  updatedAt?: string
  status: StockStatus
}

export const CATEGORIES = ['bags', 'tech', 'apparel', 'tools', 'home', 'accessories'] as const

function parseJson(str: string): any[] {
  try { return JSON.parse(str) } catch { return [] }
}

function getStockStatus(stock: number, threshold: number): StockStatus {
  if (stock === 0) return 'OUT_OF_STOCK'
  if (stock <= threshold) return 'LOW_STOCK'
  return 'IN_STOCK'
}

export function transformApiProduct(p: Record<string, any>): Product {
  return {
    id: p.id,
    uuid: p.uuid,
    slug: p.slug,
    brand: p.brand,
    name: p.name,
    category: p.category,
    price: p.price,
    compareAt: p.compareAt ?? p.compare_at ?? null,
    art: p.art || 'tote',
    artColor: p.art_color ?? p.artColor ?? '#3A362E',
    variantKind: p.variant_kind ?? p.variantKind ?? 'COLORS',
    variants: Array.isArray(p.variants) ? p.variants : parseJson(p.variants),
    description: p.description,
    details: Array.isArray(p.details) ? p.details : parseJson(p.details),
    specs: Array.isArray(p.specs) ? p.specs : parseJson(p.specs),
    shipping: p.shipping,
    sku: p.sku,
    stockQuantity: p.stockQuantity ?? p.stock_quantity ?? 0,
    lowStockThreshold: p.lowStockThreshold ?? p.low_stock_threshold ?? 5,
    new: Boolean(p.new ?? p.new_flag),
    bestSeller: Boolean(p.bestSeller ?? p.best_seller),
    imageUrl: p.imageUrl ?? p.image_url ?? null,
    visible: Boolean(p.visible ?? true),
    createdAt: p.createdAt ?? p.created_at,
    updatedAt: p.updatedAt ?? p.updated_at,
    status: getStockStatus(
      p.stockQuantity ?? p.stock_quantity ?? 0,
      p.lowStockThreshold ?? p.low_stock_threshold ?? 5,
    ),
  }
}
