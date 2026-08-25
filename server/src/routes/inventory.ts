import type { Request, Response } from 'express'
import { initDb, dbAll, dbGet, dbRun } from '../db'
import { asyncHandler } from '../lib/asyncHandler'
import { transformProduct } from '../lib/utils'

export const inventoryRoutes = {
  history: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const rows = await dbAll(
      `SELECT ic.id, ic.product_id, ic.user_id, ic.change_type, ic.quantity,
         ic.previous_qty, ic.new_qty, ic.reason, ic.created_at,
         p.name as product_name, p.sku, u.email as user_email
         FROM inventory_changes ic
         LEFT JOIN products p ON ic.product_id = p.id
         LEFT JOIN users u ON ic.user_id = u.id
         ORDER BY ic.created_at DESC LIMIT 100`,
    )

    res.json({ changes: rows })
  }),

  adjust: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const { id } = req.params
    const { type, quantity, reason } = req.body

    if (!type || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid adjustment' })
    }

    const validTypes = ['ADD', 'REMOVE', 'SET']
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid change type' })
    }

    const product = await dbGet('SELECT id, stock_quantity FROM products WHERE id = ?', [Number(id)])

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    let newQty: number
    if (type === 'ADD') {
      newQty = product.stock_quantity + quantity
    } else if (type === 'REMOVE') {
      newQty = product.stock_quantity - quantity
      if (newQty < 0) {
        return res.status(400).json({
          error: `Cannot remove ${quantity}, only ${product.stock_quantity} in stock`,
          maxRemovable: product.stock_quantity,
        })
      }
    } else {
      newQty = quantity
    }

    await dbRun(
      `INSERT INTO inventory_changes (product_id, user_id, change_type, quantity, previous_qty, new_qty, reason)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Number(id), req.user?.id || null, type, quantity, product.stock_quantity, newQty, reason || null],
    )

    await dbRun(
      "UPDATE products SET stock_quantity = ?, updated_at = datetime('now') WHERE id = ?",
      [newQty, Number(id)],
    )

    const updated = await dbGet('SELECT * FROM products WHERE id = ?', [Number(id)])
    res.json({ product: transformProduct(updated!) })
  }),
}
