import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { navCategories } from '../data/categories'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-paper shadow-drawer"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="font-display text-lg font-semibold tracking-tightest">
                KEPT<span className="text-accent">.</span>
              </span>
              <button onClick={onClose} aria-label="Close menu" className="p-2 text-ink hover:text-accent">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto py-2">
              {navCategories.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={`/category/${c.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between border-b border-line px-5 py-4 font-display text-lg font-medium"
                  >
                    {c.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-1 border-t border-line px-5 py-5 text-[13px] uppercase tracking-wideish text-muted">
              <Link to="/reviews" onClick={onClose} className="py-2">
                Reviews
              </Link>
              <Link to="/account" onClick={onClose} className="py-2">
                Account
              </Link>
              <Link to="/contact" onClick={onClose} className="py-2">
                Support
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
