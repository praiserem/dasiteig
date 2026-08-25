import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { ProductArt } from './ProductArt'

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeLine, setQuantity, subtotal } = useCart()
  const freeShippingLeft = Math.max(0, 75 - subtotal)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col rounded-l-2xl border-l border-border bg-elevated shadow-drawer"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <p className="font-display text-lg font-semibold text-text">
                Your bag {lines.length > 0 && `(${lines.length})`}
              </p>
              <button onClick={closeCart} aria-label="Close cart" className="p-2 text-text-secondary hover:text-accent">
                <X size={20} />
              </button>
            </div>

            {subtotal < 75 && lines.length > 0 && (
              <div className="border-b border-border bg-accent/10 px-5 py-3 text-[13px] text-text-secondary">
                {`Add $${freeShippingLeft.toFixed(2)} more for free shipping.`}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="font-display text-lg text-text">Your bag is empty.</p>
                  <p className="text-sm text-text-tertiary">
                    Everything you add sticks around, even after you close this.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {lines.map((line) => (
                    <li key={`${line.slug}-${line.variant}`} className="flex gap-4 py-5">
                      <ProductArt art={line.art} color={line.artColor} className="h-20 w-20 shrink-0 rounded-md" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="eyebrow">{line.brand}</p>
                          <p className="font-display text-[15px] leading-tight text-text">{line.name}</p>
                          <p className="mt-0.5 text-sm text-text-secondary">{line.variant}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border rounded-md">
                            <button
                              onClick={() => setQuantity(line.slug, line.variant, line.quantity - 1)}
                              className="p-1.5 text-text-secondary hover:text-accent"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm text-text">{line.quantity}</span>
                            <button
                              onClick={() => setQuantity(line.slug, line.variant, line.quantity + 1)}
                              className="p-1.5 text-text-secondary hover:text-accent"
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="font-mono text-accent">${(line.price * line.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeLine(line.slug, line.variant)}
                        aria-label="Remove item"
                        className="self-start p-1 text-text-tertiary hover:text-accent"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-border px-5 py-5">
                <div className="mb-4 flex items-center justify-between font-display text-base">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-center text-[12px] text-text-tertiary">
                  Taxes and shipping calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
