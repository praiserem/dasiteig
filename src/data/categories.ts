export interface Category {
  slug: string
  name: string
  description: string
}

export const categories: Category[] = [
  { slug: 'bags', name: 'Bags', description: 'Totes, satchels, and packs built for daily rotation.' },
  { slug: 'tech', name: 'Tech', description: 'Small devices that earn a spot in the pocket.' },
  { slug: 'apparel', name: 'Apparel', description: 'Outerwear and knitwear in wearable colorways.' },
  { slug: 'tools', name: 'Tools', description: 'Hardware you reach for before you think about it.' },
  { slug: 'home', name: 'Home', description: 'Objects for the desk, the shelf, the counter.' },
  { slug: 'accessories', name: 'Accessories', description: 'The small stuff that finishes an outfit.' },
]

export const navCategories = [
  { slug: 'bags', name: 'Bags' },
  { slug: 'tools', name: 'Tools' },
  { slug: 'apparel', name: 'Apparel' },
  { slug: 'tech', name: 'Tech' },
  { slug: 'home', name: 'Home' },
  { slug: 'accessories', name: 'Accessories' },
]
