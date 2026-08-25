import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '../data/products'

export interface CartLine {
  slug: string
  name: string
  brand: string
  price: number
  art: string
  artColor: string
  variant: string
  quantity: number
  stock: number
}

interface CartContextValue {
  lines: CartLine[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product, variant: string, quantity?: number) => void
  removeLine: (slug: string, variant: string) => void
  setQuantity: (slug: string, variant: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const STORAGE_KEY = 'kept-cart-v2'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartLine[]) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // storage unavailable, ignore
    }
  }, [lines])

  const addToCart: CartContextValue['addToCart'] = (product, variant, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === product.slug && l.variant === variant)
      if (existing) {
        const newQty = existing.quantity + quantity
        const maxStock = existing.stock
        return prev.map((l) =>
          l.slug === product.slug && l.variant === variant
            ? { ...l, quantity: Math.min(newQty, maxStock) }
            : l,
        )
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          art: product.art,
          artColor: product.artColor,
          variant,
          quantity,
          stock: product.stockQuantity,
        },
      ]
    })
    setIsOpen(true)
  }

  const removeLine: CartContextValue['removeLine'] = (slug, variant) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.variant === variant)))
  }

  const setQuantity: CartContextValue['setQuantity'] = (slug, variant, quantity) => {
    if (quantity < 1) {
      removeLine(slug, variant)
      return
    }
    setLines((prev) =>
      prev.map((l) => (l.slug === slug && l.variant === variant ? { ...l, quantity } : l)),
    )
  }

  const clearCart = () => setLines([])

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.quantity, 0), [lines])
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines])

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    removeLine,
    setQuantity,
    clearCart,
    subtotal,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
