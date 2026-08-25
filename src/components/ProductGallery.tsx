import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductArt } from './ProductArt'

interface ProductGalleryProps {
  art: string
  color: string
}

export function ProductGallery({ art, color }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex shrink-0 gap-2 sm:flex-col">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-16 shrink-0 rounded-md border transition-all duration-200 ${
              active === i
                ? 'border-accent ring-2 ring-accent/20'
                : 'border-border hover:border-text-tertiary'
            }`}
          >
            <ProductArt art={art} color={color} className="h-full w-full rounded-md" />
          </button>
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-modal">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductArt art={art} color={color} className="aspect-square w-full" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
