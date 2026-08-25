import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductArt } from './ProductArt'

interface ProductGalleryProps {
  art: string
  color: string
  imageUrl?: string | null
}

export function ProductGallery({ art, color, imageUrl }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  const hasImage = Boolean(imageUrl)

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {hasImage && (
        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            onClick={() => setActive(0)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-all duration-200 ${
              active === 0 ? 'border-accent ring-2 ring-accent/20' : 'border-border hover:border-text-tertiary'
            }`}
          >
            <img src={imageUrl!} alt="" className="h-full w-full object-cover" />
          </button>
        </div>
      )}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-modal">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {hasImage && active === 0 ? (
              <img src={imageUrl!} alt="Product" className="aspect-square w-full object-cover" />
            ) : (
              <ProductArt art={art} color={color} className="aspect-square w-full" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
