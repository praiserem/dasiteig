export interface Bundle {
  slug: string
  kicker: string
  name: string
  description: string
  originalPrice: number
  bundlePrice: number
  artA: { art: string; artColor: string }
  artB: { art: string; artColor: string }
}

export const bundles: Bundle[] = [
  {
    slug: 'weekender-set',
    kicker: 'Starter set',
    name: 'The weekender set',
    description: 'The tote you carry every day, plus the beanie you forget you\'re wearing.',
    originalPrice: 86,
    bundlePrice: 73,
    artA: { art: 'tote', artColor: '#C9BFA6' },
    artB: { art: 'beanie', artColor: '#B75A32' },
  },
  {
    slug: 'desk-set',
    kicker: 'Desk set',
    name: 'The desk set',
    description: 'A torch for the bag and a lamp for the desk — both dial from warm to cool.',
    originalPrice: 116,
    bundlePrice: 98,
    artA: { art: 'torch', artColor: '#3A362E' },
    artB: { art: 'lamp', artColor: '#1C1A16' },
  },
  {
    slug: 'trail-duo',
    kicker: 'Two-pack',
    name: 'Trailhead duo',
    description: 'Two colorways of the same frame — one for the car, one for everywhere else.',
    originalPrice: 92,
    bundlePrice: 78,
    artA: { art: 'sunglasses', artColor: '#2B2A26' },
    artB: { art: 'sunglasses', artColor: '#8A5A2E' },
  },
]

export interface EditorialArticle {
  slug: string
  category: string
  title: string
  description: string
  readTime: string
  artA: { art: string; artColor: string }
  artB: { art: string; artColor: string }
}

export const editorial: EditorialArticle[] = [
  {
    slug: 'canvas-vs-waxed-cotton',
    category: 'Bags',
    title: 'Canvas vs. waxed cotton: which tote lasts longer?',
    description: 'Same silhouette, different fabric. We put both through a year of daily carry.',
    readTime: '6 min read',
    artA: { art: 'tote', artColor: '#C9BFA6' },
    artB: { art: 'satchel', artColor: '#6C6B4C' },
  },
  {
    slug: 'multitool-vs-single-blade',
    category: 'Tools',
    title: 'Multitool or single blade — what actually matters',
    description: 'Twelve tools sound useful until you count the ones you actually reach for.',
    readTime: '5 min read',
    artA: { art: 'multitool', artColor: '#8A8377' },
    artB: { art: 'multitool', artColor: '#232019' },
  },
  {
    slug: 'guide-to-desk-lamps',
    category: 'Home',
    title: "Beginner's guide to picking a desk lamp",
    description: 'Color temperature, arm type, and the one spec most listings leave out.',
    readTime: '4 min read',
    artA: { art: 'lamp', artColor: '#1C1A16' },
    artB: { art: 'lamp', artColor: '#D8CBA8' },
  },
]

export interface Brand {
  name: string
  slug: string
}

export const brands: Brand[] = [
  { name: 'Fieldrunner', slug: 'fieldrunner' },
  { name: 'Anchorlight', slug: 'anchorlight' },
  { name: "Keeper's", slug: 'keepers' },
  { name: 'Harbor', slug: 'harbor' },
  { name: 'Satchel Co.', slug: 'satchel-co' },
  { name: 'Longwear', slug: 'longwear' },
  { name: 'Nightwatch', slug: 'nightwatch' },
  { name: 'Trailhead', slug: 'trailhead' },
]
