import { Hero } from '../components/Hero'
import { ProductGrid } from '../components/ProductGrid'
import { CategorySection } from '../components/CategorySection'
import { EditorialSection } from '../components/EditorialSection'
import { BundleSection } from '../components/BundleSection'
import { BrandList } from '../components/BrandList'
import { TrustSection } from '../components/TrustSection'
import { products } from '../data/products'

export function Home() {
  return (
    <>
      <Hero />
      <ProductGrid
        id="featured"
        eyebrow="Current picks"
        title="On the shelf now."
        description="Bags, apparel, tools, and home objects — live stock and price on every card."
        products={products}
        viewAllHref="/search"
        viewAllLabel={`See all ${products.length}`}
      />
      <CategorySection />
      <EditorialSection />
      <BundleSection />
      <BrandList />
      <TrustSection />
    </>
  )
}
