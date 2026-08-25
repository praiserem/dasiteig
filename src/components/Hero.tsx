import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, ShieldCheck, Headphones } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductArt } from './ProductArt'

const trustPoints = [
  { icon: ShieldCheck, label: 'Made to be used' },
  { icon: Truck, label: 'Free shipping $75+' },
  { icon: Headphones, label: 'Human support' },
]

export function Hero() {
  const { products } = useProducts()
  const featured = products.filter((p) => p.visible !== false).slice(0, 5)

  return (
    <section className="relative border-b border-border py-12 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 -translate-y-1/3 rounded-full bg-violet/5 blur-[100px]" />
      </div>

      <div className="shell relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center lg:col-span-5"
        >
          <p className="eyebrow mb-4">General goods</p>
          <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-tighter sm:text-[52px] lg:text-[56px]">
            Everyday goods,<br /> kept well.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary">
            Bags, tools, apparel, and objects for the desk — chosen for what they're
            made of, not how they photograph.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/search" className="btn-primary">Browse all products</Link>
            <Link to="/category/bags" className="btn-secondary">Shop bags</Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <Icon size={18} className="text-accent" strokeWidth={1.75} />
                <span className="text-[12px] leading-snug text-text-tertiary">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative lg:col-span-7"
        >
          {featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {featured.slice(0, 1).map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="col-span-2 sm:col-span-2 sm:row-span-2 group">
                  <div className="relative overflow-hidden rounded-xl border border-border bg-modal transition-colors group-hover:border-accent">
                    <ProductArt art={p.art} color={p.artColor} imageUrl={p.imageUrl} className="aspect-[4/3] sm:aspect-auto sm:h-full w-full" />
                  </div>
                </Link>
              ))}
              {featured.slice(1, 5).map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group">
                  <div className="relative overflow-hidden rounded-xl border border-border bg-modal transition-colors group-hover:border-accent">
                    <ProductArt art={p.art} color={p.artColor} imageUrl={p.imageUrl} className="aspect-square w-full" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['#C9BFA6', '#B75A32', '#3A362E', '#8A8377', '#B7B7AE'].map((color, i) => (
                <div key={i} className={`rounded-xl border border-border bg-modal ${i === 0 ? 'col-span-2 sm:col-span-2 sm:row-span-2' : 'aspect-square'}`}>
                  <div className="h-full w-full rounded-xl" style={{ backgroundColor: color, opacity: 0.15 }} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
