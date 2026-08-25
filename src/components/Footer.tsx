import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: '/search' },
      { label: 'New arrivals', href: 'category/new' },
      { label: 'Best sellers', href: '/category/best-sellers' },
      { label: 'Bundles', href: '/bundles' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Journal', href: '/journal' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

const socialLinks = [
  { icon: 'ig', href: '#', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="shell grid grid-cols-2 gap-10 py-14 sm:grid-cols-3 lg:grid-cols-5 lg:py-20">
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="font-display text-2xl font-semibold text-text">
            KEPT
          </Link>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-text-secondary">
            Everyday goods, kept well. A small general store for objects that outlast
            their trend cycle.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-text-secondary hover:text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M12 22c2.7 0 4.2-.8 5.2-1.8" />
                <path d="M9 16c-1.2 0-2-.8-2-2" />
                <circle cx="16" cy="7" r="1" />
              </svg>
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-[14px] text-text-secondary hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-[12px] text-text-tertiary sm:flex-row">
          <p>© {new Date().getFullYear()} KEPT General Goods. All rights reserved.</p>
          <p>hello@kept.shop · Mon–Fri, 9am–5pm</p>
        </div>
      </div>
    </footer>
  )
}
