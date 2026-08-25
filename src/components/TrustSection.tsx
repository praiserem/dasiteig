import { Link } from 'react-router-dom'
import { DollarSign, Lock, Truck, Headphones, RotateCcw } from 'lucide-react'

const points = [
  { icon: DollarSign, title: 'Transparent pricing', body: 'The price on the card is the price at checkout. No surprise fees.' },
  { icon: Lock, title: 'Secure checkout', body: 'Encrypted payments, never stored on our servers.' },
  { icon: Truck, title: 'Fast shipping', body: 'Most orders leave the warehouse within two business days.' },
  { icon: Headphones, title: 'Human support', body: "A real person answers, and they've used what you're asking about." },
  { icon: RotateCcw, title: 'Easy returns', body: '30 days, no restocking fee, no interrogation.' },
]

export function TrustSection() {
  return (
    <section className="border-b border-border py-14 lg:py-20">
      <div className="shell">
        <div className="mb-10 max-w-lg">
          <p className="eyebrow mb-3">Before you check out</p>
          <h2 className="font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">
            Everything stays simple.
          </h2>
          <p className="mt-3 text-[15px] text-text-secondary">
            What you pick on the product page is what you pay for. Reviews are from paid orders.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {points.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={20} className="text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-[15px] font-medium text-text">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/reviews" className="link-underline text-[13px] font-medium uppercase tracking-wide">
            Read our customer reviews
          </Link>
        </div>
      </div>
    </section>
  )
}
