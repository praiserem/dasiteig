export interface Variant {
  label: string
  swatch?: string
}

export interface Product {
  slug: string
  brand: string
  name: string
  category: 'bags' | 'tech' | 'apparel' | 'tools' | 'home' | 'accessories'
  price: number
  compareAt?: number
  art: 'tote' | 'torch' | 'jacket' | 'multitool' | 'beanie' | 'mug' | 'satchel' | 'lamp' | 'sunglasses'
  artColor: string
  variantKind: string
  variants: Variant[]
  rating: number
  reviewCount: number
  description: string
  details: string[]
  specs: { label: string; value: string }[]
  shipping: string
  new?: boolean
  bestSeller?: boolean
}

export const products: Product[] = [
  {
    slug: 'fieldrunner-canvas-tote',
    brand: 'Fieldrunner',
    name: 'Fieldrunner Canvas Tote',
    category: 'bags',
    price: 58,
    art: 'tote',
    artColor: '#C9BFA6',
    variantKind: 'COLORS',
    variants: [
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Ink', swatch: '#2B2A26' },
      { label: 'Rust', swatch: '#B75A32' },
      { label: 'Olive', swatch: '#6C6B4C' },
    ],
    rating: 4.8,
    reviewCount: 214,
    description:
      'A 16oz waxed canvas tote sized for a laptop, a water bottle, and whatever you pick up on the way home. The base is reinforced twice; the strap is sewn, not riveted.',
    details: [
      '16oz cotton canvas, waxed finish',
      'Interior zip pocket and pen slot',
      'Double-stitched base gusset',
      'Fits a 15" laptop upright',
    ],
    specs: [
      { label: 'Capacity', value: '18L' },
      { label: 'Strap drop', value: '11 in' },
      { label: 'Weight', value: '1.1 lb' },
      { label: 'Care', value: 'Spot clean' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
    bestSeller: true,
  },
  {
    slug: 'anchorlight-pocket-torch',
    brand: 'Anchorlight',
    name: 'Anchorlight Pocket Torch',
    category: 'tech',
    price: 42,
    art: 'torch',
    artColor: '#3A362E',
    variantKind: 'FINISHES',
    variants: [
      { label: 'Brushed Steel', swatch: '#B7B7AE' },
      { label: 'Matte Black', swatch: '#1C1A16' },
      { label: 'Brass', swatch: '#B08A4E' },
    ],
    rating: 4.7,
    reviewCount: 133,
    description:
      'A machined aluminum flashlight that fits a coin pocket and outputs 900 lumens at the top of its three-stage dial. USB-C recharge, no proprietary cable required.',
    details: [
      'Machined 6061 aluminum body',
      '900 lm high / 200 lm med / 20 lm low',
      'USB-C rechargeable, 4hr fast charge',
      'IPX6 water resistant',
    ],
    specs: [
      { label: 'Length', value: '3.4 in' },
      { label: 'Weight', value: '2.1 oz' },
      { label: 'Battery', value: '650mAh' },
      { label: 'Runtime', value: 'Up to 30 hr (low)' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
    new: true,
  },
  {
    slug: 'waxed-trail-jacket',
    brand: 'Fieldrunner',
    name: 'Waxed Trail Jacket',
    category: 'apparel',
    price: 128,
    compareAt: 148,
    art: 'jacket',
    artColor: '#5B5842',
    variantKind: 'SIZES',
    variants: [
      { label: 'XS' },
      { label: 'S' },
      { label: 'M' },
      { label: 'L' },
      { label: 'XL' },
    ],
    rating: 4.9,
    reviewCount: 302,
    description:
      'A four-pocket field jacket in waxed cotton twill, cut roomy enough for a midweight layer. Corduroy collar, brass hardware, and a hem long enough to sit on.',
    details: [
      '9oz waxed cotton twill shell',
      'Corduroy under-collar',
      'Four bellows pockets, brass snaps',
      'Unlined for year-round layering',
    ],
    specs: [
      { label: 'Fit', value: 'Relaxed' },
      { label: 'Length', value: 'Hip + 3 in' },
      { label: 'Shell', value: '100% cotton' },
      { label: 'Care', value: 'Re-wax yearly' },
    ],
    shipping: 'Ships in 2–3 business days. Free over $75.',
    bestSeller: true,
  },
  {
    slug: 'keepers-multitool',
    brand: "Keeper's",
    name: "Keeper's Multitool",
    category: 'tools',
    price: 64,
    art: 'multitool',
    artColor: '#8A8377',
    variantKind: 'FINISHES',
    variants: [
      { label: 'Stonewash', swatch: '#8A8377' },
      { label: 'Black Oxide', swatch: '#232019' },
    ],
    rating: 4.6,
    reviewCount: 98,
    description:
      'Twelve tools in a body sized for a pocket, not a toolbox: pliers, three drivers, a blade, a bottle opener, and the rest of what actually gets used weekly.',
    details: [
      '420 stainless construction',
      '12 tools, one-hand opening pliers',
      'Includes belt sheath',
      'Airline-safe checked packaging',
    ],
    specs: [
      { label: 'Closed length', value: '4.1 in' },
      { label: 'Weight', value: '6.3 oz' },
      { label: 'Tools', value: '12' },
      { label: 'Warranty', value: '25 years' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
  },
  {
    slug: 'harbor-wool-beanie',
    brand: 'Harbor',
    name: 'Harbor Wool Beanie',
    category: 'apparel',
    price: 28,
    art: 'beanie',
    artColor: '#B75A32',
    variantKind: 'COLORS',
    variants: [
      { label: 'Rust', swatch: '#B75A32' },
      { label: 'Charcoal', swatch: '#3A362E' },
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Navy', swatch: '#2C3440' },
      { label: 'Moss', swatch: '#4E5A3D' },
      { label: 'Cream', swatch: '#F5F1E7' },
    ],
    rating: 4.9,
    reviewCount: 441,
    description:
      'Merino and nylon blend, ribbed the whole way through, no fold-up cuff to fuss with. Heavier gauge than most — this one is built for actual cold.',
    details: [
      '80% merino wool / 20% nylon',
      'Fine-gauge, double-thick knit',
      'No branding on the outside',
      'One size, stretch fit',
    ],
    specs: [
      { label: 'Weight', value: '3.1 oz' },
      { label: 'Fit', value: 'One size' },
      { label: 'Origin', value: 'Knit in Portugal' },
      { label: 'Care', value: 'Hand wash cold' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
    bestSeller: true,
  },
  {
    slug: 'longwear-steel-mug',
    brand: 'Longwear',
    name: 'Longwear Steel Mug',
    category: 'home',
    price: 24,
    art: 'mug',
    artColor: '#B7B7AE',
    variantKind: 'FINISHES',
    variants: [
      { label: 'Steel', swatch: '#B7B7AE' },
      { label: 'Black', swatch: '#1C1A16' },
      { label: 'Rust', swatch: '#B75A32' },
    ],
    rating: 4.7,
    reviewCount: 176,
    description:
      'Double-walled 12oz steel mug that keeps coffee hot past the point most mugs give up. No handle to knock loose, no coating to wear through.',
    details: [
      '18/8 stainless steel, double wall',
      'Keeps drinks hot 4+ hours',
      'Fits standard cup holders',
      'Dishwasher safe',
    ],
    specs: [
      { label: 'Capacity', value: '12 oz' },
      { label: 'Weight', value: '9.8 oz' },
      { label: 'Diameter', value: '3.2 in' },
      { label: 'Care', value: 'Dishwasher safe' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
  },
  {
    slug: 'satchel-no2-crossbody',
    brand: 'Satchel Co.',
    name: 'Satchel No. 2 Crossbody',
    category: 'bags',
    price: 86,
    art: 'satchel',
    artColor: '#6C6B4C',
    variantKind: 'COLORS',
    variants: [
      { label: 'Olive', swatch: '#6C6B4C' },
      { label: 'Ink', swatch: '#2B2A26' },
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Rust', swatch: '#B75A32' },
    ],
    rating: 4.8,
    reviewCount: 159,
    description:
      'Full-grain leather trim over waxed canvas, sized for a wallet, keys, and a phone with room to spare. The strap adjusts short enough to wear across the chest.',
    details: [
      'Waxed canvas body, leather trim',
      'Magnetic flap closure',
      'Adjustable strap, 24–52 in drop',
      'Interior card slots',
    ],
    specs: [
      { label: 'Capacity', value: '3L' },
      { label: 'Strap drop', value: '24–52 in' },
      { label: 'Weight', value: '0.9 lb' },
      { label: 'Care', value: 'Leather conditioner as needed' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
    new: true,
  },
  {
    slug: 'nightwatch-desk-lamp',
    brand: 'Nightwatch',
    name: 'Nightwatch Desk Lamp',
    category: 'home',
    price: 74,
    art: 'lamp',
    artColor: '#1C1A16',
    variantKind: 'FINISHES',
    variants: [
      { label: 'Black', swatch: '#1C1A16' },
      { label: 'Sand', swatch: '#D8CBA8' },
    ],
    rating: 4.6,
    reviewCount: 87,
    description:
      'A weighted-base task lamp with a warm-to-cool dial instead of presets. The arm holds any angle without a spring fighting you the whole way there.',
    details: [
      'Stepless warm-to-cool dial, 2700K–5000K',
      'Cast iron weighted base',
      'Friction-hinge arm, holds any angle',
      'USB-C powered, includes cable',
    ],
    specs: [
      { label: 'Height', value: '18 in' },
      { label: 'Base', value: '5.5 in diameter' },
      { label: 'Cable', value: '6 ft USB-C' },
      { label: 'Bulb life', value: '30,000 hr LED' },
    ],
    shipping: 'Ships in 2–3 business days. Free over $75.',
  },
  {
    slug: 'trailhead-sunglasses',
    brand: 'Trailhead',
    name: 'Trailhead Sunglasses',
    category: 'accessories',
    price: 46,
    art: 'sunglasses',
    artColor: '#2B2A26',
    variantKind: 'COLORS',
    variants: [
      { label: 'Tortoise', swatch: '#8A5A2E' },
      { label: 'Black', swatch: '#1C1A16' },
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Olive', swatch: '#6C6B4C' },
      { label: 'Rust', swatch: '#B75A32' },
    ],
    rating: 4.5,
    reviewCount: 122,
    description:
      'Polarized lenses in a bio-acetate frame, weighted so they sit flat in a shirt pocket without sliding. UV400 across every colorway.',
    details: [
      'Bio-acetate frame',
      'Polarized UV400 lenses',
      'Spring-hinge temples',
      'Includes soft pouch',
    ],
    specs: [
      { label: 'Lens width', value: '52 mm' },
      { label: 'Weight', value: '0.9 oz' },
      { label: 'UV rating', value: 'UV400' },
      { label: 'Case', value: 'Soft pouch included' },
    ],
    shipping: 'Ships in 1–2 business days. Free over $75.',
    new: true,
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
