export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'

export interface VariantInput {
  label: string
  swatch?: string
}

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
  variants: VariantInput[]
  description: string
  details: string[]
  specs: { label: string; value: string }[]
  shipping: string
  sku?: string | null
  stockQuantity: number
  lowStockThreshold: number
  new: boolean
  bestSeller: boolean
  rating?: number
  reviewCount?: number
  imageUrl?: string | null
  createdAt?: string
  updatedAt?: string
  status: StockStatus
}
