import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnnouncementBar } from './components/AnnouncementBar'
import { Navbar } from './components/Navbar'
import { MobileMenu } from './components/MobileMenu'
import { SearchOverlay } from './components/SearchOverlay'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'
import { CategoryPage } from './pages/CategoryPage'
import { SearchPage } from './pages/SearchPage'
import { StaticPage } from './pages/StaticPage'

const staticPages: Record<string, { title: string; body: string }> = {
  '/about': {
    title: 'Our story.',
    body: 'KEPT started as a folding table at a Sunday market — one canvas tote, one flashlight, and a spreadsheet. We still pick everything the same way: would we replace this with the same thing when it wears out? If yes, it goes on the shelf.',
  },
  '/contact': {
    title: 'Get in touch.',
    body: 'Email hello@kept.shop and a person answers, usually the same day. Phone support runs weekdays, 9am–5pm.',
  },
  '/faq': {
    title: 'Frequently asked questions.',
    body: 'Shipping usually takes 3–5 business days after your order leaves the warehouse. Returns are accepted within 30 days on unused items in original packaging. Sizing charts are on every apparel product page under Specifications.',
  },
  '/shipping': {
    title: 'Shipping.',
    body: 'Free shipping on US orders over $75. Orders under $75 ship for a flat $6.50. Most orders leave the warehouse within two business days and arrive within a week.',
  },
  '/returns': {
    title: 'Returns.',
    body: 'You have 30 days from delivery to return unused items in original packaging for a full refund. Start a return from your account or by emailing hello@kept.shop with your order number.',
  },
  '/privacy': {
    title: 'Privacy.',
    body: 'We collect only what is needed to fulfill and support your order. We do not sell customer data. Full policy available on request from hello@kept.shop.',
  },
  '/terms': {
    title: 'Terms.',
    body: 'By ordering from KEPT you agree to our standard terms of sale, including our returns and shipping policies outlined elsewhere on this site.',
  },
  '/reviews': {
    title: 'Customer reviews.',
    body: 'Every review on KEPT comes from a verified, paid order. We publish the good and the mixed ones — reviews only get removed if they violate our community guidelines.',
  },
  '/journal': {
    title: 'The journal.',
    body: 'Buying guides and comparisons, written by the same people who pick what goes on the shelf. New posts most weeks.',
  },
  '/bundles': {
    title: 'Starter sets and bundles.',
    body: 'Every bundle on KEPT pairs two things we already sell separately, at 15% off together. Bundles are on the homepage — full catalog coming soon.',
  },
  '/orders/lookup': {
    title: 'Track your order.',
    body: 'Enter your order number and email at checkout confirmation to see live tracking. Questions? Email hello@kept.shop with your order number.',
  },
  '/account': {
    title: 'Account.',
    body: 'Sign in to view order history, saved addresses, and returns. Account creation happens automatically at your first checkout.',
  },
}

export default function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar onSearchOpen={() => setSearchOpen(true)} onMenuOpen={() => setMobileMenuOpen(true)} />

      <main id="main-content" className="flex-1" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          {Object.entries(staticPages).map(([path, page]) => (
            <Route key={path} path={path} element={<StaticPage {...page} />} />
          ))}
          <Route
            path="*"
            element={
              <StaticPage title="Page not found." body="That page moved or never existed. Head back to the shop from the menu above." />
            }
          />
        </Routes>
      </main>

      <Footer />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </div>
  )
}
