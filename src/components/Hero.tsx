import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, ShieldCheck, Headphones } from 'lucide-react'
import { ProductArt } from './ProductArt'

const trustPoints = [
  { icon: ShieldCheck, label: 'Made to be used' },
  { icon: Truck, label: 'Free shipping $75+' },
  { icon: Headphones, label: 'Human support' },
]

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="shell grid grid-cols-1 gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center lg:col-span-5"
        >
          <p className="eyebrow mb-4">General goods, since 2019</p>
          <h1 className="font-display text-[44px] font-semibold leading-[1.03] tracking-tightest sm:text-[56px] lg:text-[58px]">
            Everyday goods, kept well.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Bags, tools, apparel, and objects for the desk — chosen for what they're made of, not
            how they photograph. Every price and spec shown before the cart.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shelf" className="btn-primary">
              Shop the shelf
            </a>
            <Link to="/category/bags" className="btn-secondary">
              Shop bags
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <Icon size={18} className="text-accent" strokeWidth={1.75} />
                <span className="text-[12px] leading-snug text-muted">{label}</span>
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
          <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3">
            <ProductArt art="tote" color="#C9BFA6" className="col-span-2 aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:row-span-2" />
            <ProductArt art="beanie" color="#B75A32" className="aspect-square" />
            <ProductArt art="torch" color="#3A362E" className="aspect-square" />
            <ProductArt art="multitool" color="#8A8377" className="aspect-square" />
            <ProductArt art="mug" color="#B7B7AE" className="col-span-2 aspect-[2/1] sm:col-span-1 sm:aspect-square" />
          </div>
          <span className="absolute -bottom-3 left-3 border border-line bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-wideish text-muted sm:left-6">
            This week on the shelf
          </span>
        </motion.div>
      </div>
    </section>
  )
}
