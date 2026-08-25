import type { Request, Response } from 'express'
import { initDb, dbAll, dbGet, dbRun } from '../db'
import { asyncHandler } from '../lib/asyncHandler'
import { transformProduct } from '../lib/utils'

export const productRoutes = {
  list: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const rows = await dbAll(
      `SELECT id, uuid, slug, brand, name, category, price, compare_at,
         art, art_color, variant_kind, variants, description, details, specs,
         shipping, sku, stock_quantity, low_stock_threshold, new_flag,
         best_seller, rating, review_count, image_url, created_at, updated_at
         FROM products ORDER BY created_at DESC`,
    )

    const products = rows.map((p: any) => transformProduct(p))
    res.json({ products })
  }),

  get: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const { slug } = req.params
    const row = await dbGet('SELECT * FROM products WHERE slug = ?', [slug])

    if (!row) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ product: transformProduct(row) })
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const {
      slug,
      brand,
      name,
      category,
      price,
      compareAt,
      art = 'tote',
      artColor = '#3A362E',
      variantKind = 'COLORS',
      variants = [],
      description,
      details = [],
      specs = [],
      shipping = 'Ships in 1–2 business days.',
      sku,
      stockQuantity = 0,
      lowStockThreshold = 5,
    } = req.body

    if (!slug || !brand || !name || !category || !price || !description) {
      return res.status(400).json({ error: 'Required fields missing' })
    }

    const existing = await dbGet('SELECT id FROM products WHERE slug = ?', [slug])
    if (existing) {
      return res.status(409).json({ error: 'Product with this slug already exists' })
    }

    const result = await dbRun(
      `INSERT INTO products (slug, brand, name, category, price, compare_at, art, art_color,
       variant_kind, variants, description, details, specs, shipping, sku,
       stock_quantity, low_stock_threshold, new_flag, best_seller)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        brand,
        name,
        category,
        price,
        compareAt || null,
        art,
        artColor,
        variantKind,
        JSON.stringify(variants),
        description,
        JSON.stringify(details),
        JSON.stringify(specs),
        shipping,
        sku || null,
        stockQuantity,
        lowStockThreshold,
        0,
        0,
      ],
    )

    const row = await dbGet('SELECT * FROM products WHERE id = ?', [Number(result.lastID)])
    res.status(201).json({ product: transformProduct(row!) })
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const { id } = req.params
    const fields: string[] = []
    const values: any[] = []

    const updatable = [
      'slug', 'brand', 'name', 'category', 'price', 'compare_at', 'art', 'art_color',
      'variant_kind', 'variants', 'description', 'details', 'specs', 'shipping',
      'sku', 'stock_quantity', 'low_stock_threshold', 'new_flag', 'best_seller',
      'rating', 'review_count', 'image_url',
    ]

    for (const key of updatable) {
      if (req.body[key] !== undefined) {
        fields.push(`${key} = ?`)
        values.push(
          key === 'variants' || key === 'details' || key === 'specs'
            ? JSON.stringify(req.body[key])
            : req.body[key],
        )
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(Number(id))
    const result = await dbRun(
      `UPDATE products SET ${fields.join(', ')}, updated_at = datetime('now') WHERE id = ?`,
      values,
    )

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const row = await dbGet('SELECT * FROM products WHERE id = ?', [Number(id)])
    res.json({ product: transformProduct(row!) })
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const { id } = req.params
    const result = await dbRun('DELETE FROM products WHERE id = ?', [Number(id)])
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ success: true })
  }),
}
