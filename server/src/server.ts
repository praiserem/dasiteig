import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { initDb, dbGet, dbRun, dbAll } from './db'
import { requireAuth, requireRole } from './middleware/auth'
import { authRoutes } from './routes/auth'
import { productRoutes } from './routes/products'
import { inventoryRoutes } from './routes/inventory'
import bcrypt from 'bcrypt'
import type { Request, Response, NextFunction } from 'express'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads')

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? true
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }),
)
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use('/uploads', express.static(UPLOAD_DIR))

initDb()

app.post('/api/auth/signup', authRoutes.signup)
app.post('/api/auth/login', authRoutes.login)
app.post('/api/auth/logout', authRoutes.logout)

app.get('/api/products', productRoutes.list)
app.get('/api/products/:slug', productRoutes.get)
app.get('/api/stats', requireAuth, requireRole('OWNER'), asyncHandlerRoute(async (req: Request, res: Response) => {
  const products = await dbAll('SELECT stock_quantity, low_stock_threshold, price FROM products')
  const users = await dbAll('SELECT COUNT(*) as count FROM users')
  const history = await dbAll(`SELECT ic.*, p.name as product_name FROM inventory_changes ic LEFT JOIN products p ON ic.product_id = p.id ORDER BY ic.created_at DESC LIMIT 10`)

  const totalProducts = products.length
  const totalStock = products.reduce((sum: number, p: any) => sum + p.stock_quantity, 0)
  const lowStock = products.filter((p: any) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length
  const outOfStock = products.filter((p: any) => p.stock_quantity === 0).length
  const totalUsers = (users[0] as any)?.count || 0

  res.json({ stats: { totalProducts, totalStock, lowStock, outOfStock, totalUsers }, recentActivity: history })
}))

app.use(requireAuth)

app.get('/api/auth/session', authRoutes.session)
app.post('/api/products', requireRole('OWNER'), productRoutes.create)
app.put('/api/products/:id', requireRole('OWNER'), productRoutes.update)
app.delete('/api/products/:id', requireRole('OWNER'), productRoutes.remove)

app.post('/api/upload', requireRole('OWNER'), (req: Request, res: Response) => {
  const chunks: Buffer[] = []
  req.on('data', (chunk: Buffer) => chunks.push(chunk))
  req.on('end', () => {
    const contentType = req.headers['content-type'] || ''
    let ext = 'jpg'
    if (contentType.includes('png')) ext = 'png'
    else if (contentType.includes('webp')) ext = 'webp'
    else if (contentType.includes('gif')) ext = 'gif'

    const filename = `${crypto.randomUUID()}.${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)
    fs.writeFileSync(filepath, Buffer.concat(chunks))
    const url = `/uploads/${filename}`
    res.json({ url })
  })
  req.on('error', () => {
    res.status(500).json({ error: 'Upload failed' })
  })
})

app.get('/api/inventory/history', requireRole('OWNER'), inventoryRoutes.history)
app.post('/api/inventory/:id/adjust', requireRole('OWNER'), inventoryRoutes.adjust)

app.put(
  '/api/user',
  asyncHandlerRoute(async (req: Request, res: Response) => {
    const { name } = req.body
    if (name !== undefined) {
      await dbRun('UPDATE users SET name = ?, updated_at = datetime(\'now\') WHERE id = ?', [name, req.user!.id])
    }
    const user = await dbGet('SELECT id, uuid, email, name, role FROM users WHERE id = ?', [req.user!.id])
    res.json({ user })
  }),
)

app.post(
  '/api/auth/password',
  asyncHandlerRoute(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'Invalid request' })
    }
    const row = await dbGet('SELECT password_hash FROM users WHERE id = ?', [req.user!.id])
    if (!row || !row.password_hash) {
      return res.status(404).json({ error: 'User not found' })
    }
    const valid = await bcrypt.compare(currentPassword, row.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }
    const hash = await bcrypt.hash(newPassword, 12)
    await dbRun('UPDATE users SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = ?', [hash, req.user!.id])
    res.json({ success: true })
  }),
)

function asyncHandlerRoute(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', '..', 'dist')
  app.use(express.static(distPath))

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {})

export default app
