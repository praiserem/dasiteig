import dotenv from 'dotenv'
import { initDb, dbAll, dbRun, dbGet } from './db'
import bcrypt from 'bcrypt'

dotenv.config()

const products = [
  {
    slug: 'fieldrunner-canvas-tote',
    brand: 'Fieldrunner',
    name: 'Fieldrunner Canvas Tote',
    category: 'bags',
    price: 15,
    art: 'tote',
    artColor: '#C9BFA6',
    variantKind: 'COLORS',
    variants: JSON.stringify([
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Ink', swatch: '#2B2A26' },
      { label: 'Rust', swatch: '#B75A32' },
      { label: 'Olive', swatch: '#6C6B4C' },
    ]),
    description: 'A 16oz waxed canvas tote sized for a laptop, a water bottle, and whatever you pick up on the way home.',
    details: JSON.stringify([
      '16oz cotton canvas, waxed finish',
      'Interior zip pocket and pen slot',
      'Double-stitched base gusset',
      'Fits a 15" laptop upright',
    ]),
    specs: JSON.stringify([
      { label: 'Capacity', value: '18L' },
      { label: 'Strap drop', value: '11 in' },
      { label: 'Weight', value: '1.1 lb' },
      { label: 'Care', value: 'Spot clean' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'TOTE-001',
    stockQuantity: 34,
    lowStockThreshold: 5,
    newFlag: 0,
    bestSeller: 1,
    rating: 4.8,
    reviewCount: 214,
  },
  {
    slug: 'anchorlight-pocket-torch',
    brand: 'Anchorlight',
    name: 'Anchorlight Pocket Torch',
    category: 'tech',
    price: 24,
    art: 'torch',
    artColor: '#3A362E',
    variantKind: 'FINISHES',
    variants: JSON.stringify([
      { label: 'Brushed Steel', swatch: '#B7B7AE' },
      { label: 'Matte Black', swatch: '#1C1A16' },
      { label: 'Brass', swatch: '#B08A4E' },
    ]),
    description: 'A machined aluminum flashlight that fits a coin pocket and outputs 900 lumens.',
    details: JSON.stringify([
      'Machined 6061 aluminum body',
      '900 lm high / 200 lm med / 20 lm low',
      'USB-C rechargeable, 4hr fast charge',
      'IPX6 water resistant',
    ]),
    specs: JSON.stringify([
      { label: 'Length', value: '3.4 in' },
      { label: 'Weight', value: '2.1 oz' },
      { label: 'Battery', value: '650mAh' },
      { label: 'Runtime', value: 'Up to 30 hr (low)' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'TORCH-001',
    stockQuantity: 12,
    lowStockThreshold: 5,
    newFlag: 0,
    bestSeller: 0,
    rating: 4.7,
    reviewCount: 133,
  },
  {
    slug: 'waxed-trail-jacket',
    brand: 'Fieldrunner',
    name: 'Waxed Trail Jacket',
    category: 'apparel',
    price: 30,
    art: 'jacket',
    artColor: '#5B5842',
    variantKind: 'SIZES',
    variants: JSON.stringify([
      { label: 'XS' }, { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' },
    ]),
    description: 'A four-pocket field jacket in waxed cotton twill, cut roomy enough for a midweight layer.',
    details: JSON.stringify([
      '9oz waxed cotton twill shell',
      'Corduroy under-collar',
      'Four bellow pockets, brass snaps',
      'Unlined for year-round layering',
    ]),
    specs: JSON.stringify([
      { label: 'Fit', value: 'Relaxed' },
      { label: 'Length', value: 'Hip + 3 in' },
      { label: 'Shell', value: '100% cotton' },
      { label: 'Care', value: 'Re-wax yearly' },
    ]),
    shipping: 'Ships in 2–3 business days. Free over $75.',
    sku: 'JACKET-001',
    stockQuantity: 8,
    lowStockThreshold: 5,
    newFlag: 0,
    bestSeller: 1,
    rating: 4.9,
    reviewCount: 302,
  },
  {
    slug: 'keepers-multitool',
    brand: "Keeper's",
    name: "Keeper's Multitool",
    category: 'tools',
    price: 20,
    art: 'multitool',
    artColor: '#8A8377',
    variantKind: 'FINISHES',
    variants: JSON.stringify([
      { label: 'Stonewash', swatch: '#8A8377' },
      { label: 'Black Oxide', swatch: '#232019' },
    ]),
    description: 'Twelve tools in a body sized for a pocket, not a toolbox.',
    details: JSON.stringify([
      '420 stainless construction',
      '12 tools, one-hand opening pliers',
      'Includes belt sheath',
      'Airline-safe checked packaging',
    ]),
    specs: JSON.stringify([
      { label: 'Closed length', value: '4.1 in' },
      { label: 'Weight', value: '6.3 oz' },
      { label: 'Tools', value: '12' },
      { label: 'Warranty', value: '25 years' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'TOOL-001',
    stockQuantity: 0,
    lowStockThreshold: 5,
    newFlag: 0,
    bestSeller: 0,
    rating: 4.6,
    reviewCount: 98,
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
    variants: JSON.stringify([
      { label: 'Rust', swatch: '#B75A32' },
      { label: 'Charcoal', swatch: '#3A362E' },
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Navy', swatch: '#2C3440' },
      { label: 'Moss', swatch: '#4E5A3D' },
      { label: 'Cream', swatch: '#F5F1E7' },
    ]),
    description: 'Merino and nylon blend, ribbed the whole way through, no fold-up cuff.',
    details: JSON.stringify([
      '80% merino wool / 20% nylon',
      'Fine-gauge, double-thick knit',
      'No branding on the outside',
      'One size, stretch fit',
    ]),
    specs: JSON.stringify([
      { label: 'Weight', value: '3.1 oz' },
      { label: 'Fit', value: 'One size' },
      { label: 'Origin', value: 'Knit in Portugal' },
      { label: 'Care', value: 'Hand wash cold' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'BEANIE-001',
    stockQuantity: 52,
    lowStockThreshold: 10,
    newFlag: 0,
    bestSeller: 1,
    rating: 4.9,
    reviewCount: 441,
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
    variants: JSON.stringify([
      { label: 'Steel', swatch: '#B7B7AE' },
      { label: 'Black', swatch: '#1C1A16' },
      { label: 'Rust', swatch: '#B75A32' },
    ]),
    description: 'Double-walled 12oz steel mug that keeps coffee hot past the point most mugs give up.',
    details: JSON.stringify([
      '18/8 stainless steel, double wall',
      'Keeps drinks hot 4+ hours',
      'Fits standard cup holders',
      'Dishwasher safe',
    ]),
    specs: JSON.stringify([
      { label: 'Capacity', value: '12 oz' },
      { label: 'Weight', value: '9.8 oz' },
      { label: 'Diameter', value: '3.2 in' },
      { label: 'Care', value: 'Dishwasher safe' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'MUG-001',
    stockQuantity: 3,
    lowStockThreshold: 5,
    newFlag: 0,
    bestSeller: 0,
    rating: 4.7,
    reviewCount: 176,
  },
  {
    slug: 'satchel-no2-crossbody',
    brand: 'Satchel Co.',
    name: 'Satchel No. 2 Crossbody',
    category: 'bags',
    price: 16,
    art: 'satchel',
    artColor: '#6C6B4C',
    variantKind: 'COLORS',
    variants: JSON.stringify([
      { label: 'Olive', swatch: '#6C6B4C' },
      { label: 'Ink', swatch: '#2B2A26' },
      { label: 'Sand', swatch: '#D8CBA8' },
      { label: 'Rust', swatch: '#B75A32' },
    ]),
    description: 'Full-grain leather trim over waxed canvas, sized for a wallet, keys, and a phone.',
    details: JSON.stringify([
      'Waxed canvas body, leather trim',
      'Magnetic flap closure',
      'Adjustable strap, 24–52 in drop',
      'Interior card slots',
    ]),
    specs: JSON.stringify([
      { label: 'Capacity', value: '3L' },
      { label: 'Strap drop', value: '24–52 in' },
      { label: 'Weight', value: '0.9 lb' },
      { label: 'Care', value: 'Leather conditioner as needed' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'SATCHEL-001',
    stockQuantity: 21,
    lowStockThreshold: 5,
    newFlag: 1,
    bestSeller: 0,
    rating: 4.8,
    reviewCount: 159,
  },
  {
    slug: 'nightwatch-desk-lamp',
    brand: 'Nightwatch',
    name: 'Nightwatch Desk Lamp',
    category: 'home',
    price: 18,
    art: 'lamp',
    artColor: '#1C1A16',
    variantKind: 'FINISHES',
    variants: JSON.stringify([
      { label: 'Black', swatch: '#1C1A16' },
      { label: 'Sand', swatch: '#D8CBA8' },
    ]),
    description: 'A weighted-base task lamp with a warm-to-cool dial instead of presets.',
    details: JSON.stringify([
      'Stepless warm-to-cool dial, 2700K–5000K',
      'Cast iron weighted base',
      'Friction-hinge arm, holds any angle',
      'USB-C powered, includes cable',
    ]),
    specs: JSON.stringify([
      { label: 'Height', value: '18 in' },
      { label: 'Base', value: '5.5 in diameter' },
      { label: 'Cable', value: '6 ft USB-C' },
      { label: 'Bulb life', value: '30,000 hr LED' },
    ]),
    shipping: 'Ships in 2–3 business days. Free over $75.',
    sku: 'LAMP-001',
    stockQuantity: 6,
    lowStockThreshold: 5,
    newFlag: 0,
    bestSeller: 0,
    rating: 4.6,
    reviewCount: 87,
  },
  {
    slug: 'trailhead-sunglasses',
    brand: 'Trailhead',
    name: 'Trailhead Sunglasses',
    category: 'accessories',
    price: 25,
    art: 'sunglasses',
    artColor: '#2B2A26',
    variantKind: 'COLORS',
    variants: JSON.stringify([
      { label: 'Tortoise' }, { label: 'Black' }, { label: 'Sand' },
      { label: 'Olive' }, { label: 'Rust' },
    ]),
    description: 'Polarized lenses in a bio-acetate frame, weighted so they sit flat in a shirt pocket.',
    details: JSON.stringify([
      'Bio-acetate frame',
      'Polarized UV400 lenses',
      'Spring-hinge temples',
      'Includes soft pouch',
    ]),
    specs: JSON.stringify([
      { label: 'Lens width', value: '52 mm' },
      { label: 'Weight', value: '0.9 oz' },
      { label: 'UV rating', value: 'UV400' },
      { label: 'Case', value: 'Soft pouch included' },
    ]),
    shipping: 'Ships in 1–2 business days. Free over $75.',
    sku: 'SUN-001',
    stockQuantity: 18,
    lowStockThreshold: 5,
    newFlag: 1,
    bestSeller: 0,
    rating: 4.5,
    reviewCount: 122,
  },
]

async function main() {
  await initDb()

  await dbRun('DELETE FROM inventory_changes', [])
  await dbRun('DELETE FROM products', [])

  const insert =
    'INSERT INTO products (slug, brand, name, category, price, art, art_color, variant_kind, variants, description, details, specs, shipping, sku, stock_quantity, low_stock_threshold, new_flag, best_seller, rating, review_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

  for (const item of products) {
    await dbRun(insert, [
      item.slug,
      item.brand,
      item.name,
      item.category,
      item.price,
      item.art,
      item.artColor,
      item.variantKind,
      item.variants,
      item.description,
      item.details,
      item.specs,
      item.shipping,
      item.sku,
      item.stockQuantity,
      item.lowStockThreshold,
      item.newFlag,
      item.bestSeller,
      item.rating,
      item.reviewCount,
    ])
  }

  const ownerEmail = process.env.OWNER_EMAIL || 'owner@kept.shop'
  const existing = await dbGet('SELECT id FROM users WHERE email = ?', [ownerEmail])
  if (!existing) {
    const hash = await bcrypt.hash('ownerpassword123', 12)
    await dbRun('INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)', [
      ownerEmail,
      'Owner',
      hash,
      'OWNER',
    ])
    console.log(`Seeded ${products.length} products`)
    console.log(`Owner account created: ${ownerEmail}`)
  } else {
    console.log(`Owner account already exists: ${ownerEmail}`)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
