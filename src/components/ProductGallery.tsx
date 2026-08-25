import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductArt } from './ProductArt'

interface ProductGalleryProps {
  art: string
  color: string
}

export function ProductGallery({ art, color }: ProductGalleryProps) {
  const shots = [0, 1, 2, 3]
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex shrink-0 gap-2 sm:flex-col">
        {shots.map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-16 w-16 shrink-0 border transition-colors duration-200 ${
              active === i ? 'border-ink' : 'border-line hover:border-line-strong'
            }`}
          >
            <ProductArt art={art} color={color} className="h-full w-full" />
          </button>
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden border border-line">
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
