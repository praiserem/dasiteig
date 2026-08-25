import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { AnnouncementBar } from './components/AnnouncementBar'
import { Navbar } from './components/Navbar'
import { MobileMenu } from './components/MobileMenu'
import { SearchOverlay } from './components/SearchOverlay'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'
import { CategoryPage } from './pages/CategoryPage'
import { SearchPage } from './pages/SearchPage'
import { StaticPage } from './pages/StaticPage'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { AccountLayout } from './pages/Account'
import { AdminLayout } from './pages/AdminLayout'
import { AdminOverview } from './pages/admin/AdminOverview'
import { AdminProducts } from './pages/admin/AdminProducts'
import { ProductForm } from './pages/admin/ProductForm'
import { AdminInventory } from './pages/admin/AdminInventory'
import { StockAdjustPage } from './pages/admin/StockAdjustPage'

const staticPages: Record<string, { title: string; body: string }> = {
  '/about': {
    title: 'Our story.',
    body: 'KEPT started as a folding table at a Sunday market. We still pick everything the same way: would we replace this with the same thing when it wears out? If yes, it goes on the shelf.',
  },
  '/contact': {
    title: 'Get in touch.',
    body: 'Email hello@kept.shop and a person answers, usually the same day.',
  },
  '/faq': {
    title: 'Frequently asked questions.',
    body: 'Shipping usually takes 1–2 business days after your order leaves the warehouse. Returns are accepted within 30 days on unused items in original packaging.',
  },
  '/shipping': {
    title: 'Shipping.',
    body: 'Free shipping on US orders over $75. Orders under $75 ship for a flat $6.50.',
  },
  '/returns': {
    title: 'Returns.',
    body: 'You have 30 days from delivery to return unused items in original packaging for a full refund.',
  },
  '/privacy': {
    title: 'Privacy.',
    body: 'We collect only what is needed to fulfill and support your order. We do not sell customer data.',
  },
  '/terms': {
    title: 'Terms.',
    body: 'By ordering from KEPT you agree to our standard terms of sale, including our returns and shipping policies.',
  },
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<RequireAuth><AccountLayout /></RequireAuth>} />
            <Route path="/account/:tab" element={<RequireAuth><AccountLayout /></RequireAuth>} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="inventory/adjust/:id" element={<StockAdjustPage />} />
            </Route>
            {Object.entries(staticPages).map(([path, page]) => (
              <Route key={path} path={path} element={<StaticPage {...page} />} />
            ))}
            <Route path="*" element={<StaticPage title="Page not found." body="That page moved or never existed. Head back to the shop from the menu above." />} />
          </Routes>
        </main>

        <Footer />
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
        <CartDrawer />
      </div>
    </AuthProvider>
  )
}
