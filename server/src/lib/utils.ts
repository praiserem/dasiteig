import type { Product } from './types'

export function parseJson(str: string): any[] {
  try {
    return JSON.parse(str)
  } catch {
    return []
  }
}

export function getStockStatus(stock: number, threshold: number): 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' {
  if (stock === 0) return 'OUT_OF_STOCK'
  if (stock <= threshold) return 'LOW_STOCK'
  return 'IN_STOCK'
}

export function transformProduct(p: any): Product {
  return {
    id: p.id,
    uuid: p.uuid,
    slug: p.slug,
    brand: p.brand,
    name: p.name,
    category: p.category,
    price: p.price,
    compareAt: p.compare_at,
    art: p.art,
    artColor: p.art_color,
    variantKind: p.variant_kind,
    variants: parseJson(p.variants),
    description: p.description,
    details: parseJson(p.details),
    specs: parseJson(p.specs),
    shipping: p.shipping,
    sku: p.sku,
    stockQuantity: p.stock_quantity,
    lowStockThreshold: p.low_stock_threshold,
    new: Boolean(p.new_flag),
    bestSeller: Boolean(p.best_seller),
    rating: p.rating,
    reviewCount: p.review_count,
    imageUrl: p.image_url,
    visible: Boolean(p.visible),
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    status: getStockStatus(p.stock_quantity, p.low_stock_threshold),
  }
}
