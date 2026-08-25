import { Link } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { navCategories } from '../data/categories'
import { useCart } from '../hooks/useCart'

interface NavbarProps {
  onSearchOpen: () => void
  onMenuOpen: () => void
}

export function Navbar({ onSearchOpen, onMenuOpen }: NavbarProps) {
  const { itemCount, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="shrink-0 font-display text-xl font-semibold tracking-tightest">
          KEPT<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navCategories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="link-underline text-[13px] font-medium uppercase tracking-wideish"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="hidden items-center gap-2 border border-line px-3 py-2 text-[13px] text-muted transition-colors duration-300 ease-editorial hover:border-accent hover:text-accent sm:flex"
          >
            <Search size={15} />
            <span className="hidden xl:inline">Search products or brands</span>
            <kbd className="hidden font-mono text-[10px] text-muted xl:inline">⌘K</kbd>
          </button>
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="p-2.5 text-ink hover:text-accent sm:hidden"
          >
            <Search size={19} />
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden p-2.5 text-ink hover:text-accent lg:inline-flex"
          >
            <User size={19} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2.5 text-ink hover:text-accent"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-paper">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={onMenuOpen}
            aria-label="Open menu"
            className="p-2.5 text-ink hover:text-accent lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
