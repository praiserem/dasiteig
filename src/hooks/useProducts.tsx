import { createContext, useContext, useEffect, useState, useMemo, useCallback, type ReactNode } from 'react'
import { api } from '../lib/api'
import { type Product, transformApiProduct } from '../data/products'

interface ProductsContextValue {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getProductBySlug: (slug: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<{ products: any[] }>('/api/products')
      setProducts(res.products.map(transformApiProduct))
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products],
  )

  const value = useMemo(
    () => ({ products, loading, error, refetch: fetchProducts, getProductBySlug }),
    [products, loading, error, fetchProducts, getProductBySlug],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
