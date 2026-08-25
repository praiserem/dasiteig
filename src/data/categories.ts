export interface Category {
  slug: string
  name: string
  count: number
  description: string
}

export const categories: Category[] = [
  { slug: 'bags', name: 'Bags', count: 9, description: 'Totes, satchels, and packs built for daily rotation.' },
  { slug: 'tech', name: 'Tech', count: 6, description: 'Small devices that earn a spot in the pocket.' },
  { slug: 'apparel', name: 'Apparel', count: 7, description: 'Outerwear and knitwear in wearable colorways.' },
  { slug: 'tools', name: 'Tools', count: 5, description: 'Hardware you reach for before you think about it.' },
  { slug: 'home', name: 'Home', count: 6, description: 'Objects for the desk, the shelf, the counter.' },
  { slug: 'accessories', name: 'Accessories', count: 8, description: 'The small stuff that finishes an outfit.' },
]

export const navCategories = [
  { slug: 'bags', name: 'Bags' },
  { slug: 'tools', name: 'Tools' },
  { slug: 'apparel', name: 'Apparel' },
  { slug: 'tech', name: 'Tech' },
  { slug: 'home', name: 'Home' },
  { slug: 'accessories', name: 'Accessories' },
]
