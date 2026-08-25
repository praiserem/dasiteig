import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { products } from '../data/products'
import { navCategories } from '../data/categories'
import { ProductArt } from './ProductArt'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const RECENT_KEY = 'kept-recent-searches'

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [recent, setRecent] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY)
      setRecent(raw ? JSON.parse(raw) : [])
    } catch {
      setRecent([])
    }
  }, [isOpen])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [query])

  const commitSearch = (term: string) => {
    if (!term.trim()) return
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5)
    setRecent(next)
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-0 flex max-h-screen w-full max-w-2xl flex-col bg-paper shadow-drawer sm:mt-20 sm:max-h-[80vh]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <Search size={18} className="shrink-0 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && commitSearch(query)}
                placeholder="Search products or brands"
                className="w-full bg-transparent font-display text-lg placeholder:text-muted focus:outline-none"
              />
              <button onClick={onClose} aria-label="Close search" className="p-1 text-ink hover:text-accent">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {query.trim() === '' ? (
                <div className="space-y-8">
                  {recent.length > 0 && (
                    <div>
                      <p className="eyebrow mb-3">Recent searches</p>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((r) => (
                          <button
                            key={r}
                            onClick={() => setQuery(r)}
                            className="border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-accent"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="eyebrow mb-3">Suggested categories</p>
                    <div className="flex flex-wrap gap-2">
                      {navCategories.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/category/${c.slug}`}
                          onClick={onClose}
                          className="border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-accent"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">
                  Nothing matches “{query}.” Try a category or brand name.
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="eyebrow mb-3">
                    {results.length} result{results.length === 1 ? '' : 's'}
                  </p>
                  {results.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/products/${p.slug}`}
                      onClick={() => {
                        commitSearch(p.name)
                        onClose()
                      }}
                      className="flex items-center gap-4 border-b border-line py-3 last:border-none"
                    >
                      <ProductArt art={p.art} color={p.artColor} className="h-14 w-14 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow">{p.brand}</p>
                        <p className="truncate font-display text-[15px]">{p.name}</p>
                      </div>
                      <p className="shrink-0 font-mono text-sm">${p.price.toFixed(2)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
