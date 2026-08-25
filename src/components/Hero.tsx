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
          <p className="eyebrow mb-4">General goods, since 2019</p>
          <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-tighter sm:text-[52px] lg:text-[56px]">
            Everyday goods,<br /> kept well.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary">
            Bags, tools, apparel, and objects for the desk — chosen for what they're
            made of, not how they photograph. Every price and spec shown before the
            cart.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="#shelf" className="btn-primary">
              Shop the shelf
            </Link>
            <Link to="/category/bags" className="btn-secondary">
              Shop bags
            </Link>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ProductArt art="tote" color="#C9BFA6" className="col-span-2 aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:row-span-2" />
            <ProductArt art="beanie" color="#B75A32" className="aspect-square" />
            <ProductArt art="torch" color="#3A362E" className="aspect-square" />
            <ProductArt art="multitool" color="#8A8377" className="aspect-square" />
            <ProductArt art="mug" color="#B7B7AE" className="col-span-2 aspect-[2/1] sm:col-span-1 sm:aspect-square" />
          </div>
          <span className="absolute -bottom-3 left-3 border border-border bg-elevated px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-text-tertiary sm:left-6">
            This week on the shelf
          </span>
        </motion.div>
      </div>
    </section>
  )
}
