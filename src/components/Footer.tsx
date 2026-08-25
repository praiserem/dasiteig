import { Link } from 'react-router-dom'
import { Instagram, Mail } from 'lucide-react'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: '/search' },
      { label: 'New arrivals', href: '/category/new' },
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
      { label: 'Track order', href: '/orders/lookup' },
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

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell grid grid-cols-2 gap-10 py-14 sm:grid-cols-4 lg:grid-cols-5 lg:py-20">
        <div className="col-span-2 lg:col-span-2">
          <p className="font-display text-2xl font-semibold tracking-tightest">
            KEPT<span className="text-accent">.</span>
          </p>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/60">
            Everyday goods, kept well. A small general store for objects that outlast their
            trend cycle.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Instagram size={16} />
            </a>
            <a
              href="mailto:hello@kept.shop"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow !text-white/45">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-[14px] text-white/75 transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-[12px] text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} KEPT General Goods. All rights reserved.</p>
          <p>hello@kept.shop · Mon–Fri, 9am–5pm</p>
        </div>
      </div>
    </footer>
  )
}
