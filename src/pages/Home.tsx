import { useProducts } from '../hooks/useProducts'
import { Hero } from '../components/Hero'
import { ProductGrid } from '../components/ProductGrid'
import { TrustSection } from '../components/TrustSection'
import { StatCardSkeleton } from '../components/ui/loadingState'
import { EmptyState } from '../components/ui/emptyState'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export function Home() {
  const { products, loading } = useProducts()

  return (
    <>
      <Hero />
      {loading ? (
        <div className="py-20">
          <div className="shell">
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
            </div>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20">
          <EmptyState
            title="Nothing on the shelf yet"
            description="Products will appear here once they're added in the admin panel."
            actionLabel="Sign in to manage"
            onAction={() => window.location.href = '/login'}
          />
        </div>
      ) : (
        <ProductGrid
          id="featured"
          eyebrow="Current picks"
          title="On the shelf now."
          description="Bags, apparel, tools, and home objects — live stock and price on every card."
          products={products}
          viewAllHref="/search"
          viewAllLabel={`See all ${products.length}`}
        />
      )}
      <TrustSection />
    </>
  )
}
