import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User, LogIn } from 'lucide-react'
import { navCategories } from '../data/categories'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

interface NavbarProps {
  onSearchOpen: () => void
  onMenuOpen: () => void
}

export function Navbar({ onSearchOpen, onMenuOpen }: NavbarProps) {
  const { itemCount, openCart } = useCart()
  const { user } = useAuth()
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    ...navCategories.map((c) => ({ to: `/category/${c.slug}`, label: c.name, exact: false })),
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-nav-bg/80 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-18">
        <Link to="/" className="shrink-0 font-display text-xl font-semibold text-text">
          KEPT
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `text-[13px] font-medium uppercase tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-text-secondary hover:text-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="hidden items-center gap-2 border border-border bg-modal px-3 py-2 text-[13px] text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent sm:flex"
          >
            <Search size={15} />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden font-mono text-[10px] text-text-tertiary xl:inline">⌘K</kbd>
          </button>
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="p-2.5 text-text-secondary hover:text-accent sm:hidden"
          >
            <Search size={19} />
          </button>
          {user ? (
            <Link to="/account" aria-label="Account" className="p-2.5 text-text-secondary hover:text-accent lg:inline-flex">
              <User size={19} />
            </Link>
          ) : (
            <Link to="/login" aria-label="Login" className="p-2.5 text-text-secondary hover:text-accent lg:inline-flex">
              <LogIn size={19} />
            </Link>
          )}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2.5 text-text-secondary hover:text-accent"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-bg">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={onMenuOpen}
            aria-label="Open menu"
            className="p-2.5 text-text-secondary hover:text-accent lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
