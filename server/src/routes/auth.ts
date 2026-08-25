import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { initDb, dbGet, dbRun } from '../db'
import { asyncHandler } from '../lib/asyncHandler'

const BCRYPT_ROUNDS = 12
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@kept.shop'

interface UserSession {
  id: number
  uuid: string
  email: string
  name: string | null
  role: string
}

export function generateToken(user: UserSession): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '30d' })
}

export const authRoutes = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const { email, name, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }

    const existing = await dbGet('SELECT id FROM users WHERE email = ?', [email.toLowerCase()])
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    const role = email.toLowerCase() === OWNER_EMAIL.toLowerCase() ? 'OWNER' : 'USER'
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

    const result = await dbRun(
      'INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)',
      [email.toLowerCase(), name || null, passwordHash, role],
    )

    const token = generateToken({
      id: result.lastID,
      uuid: '',
      email: email.toLowerCase(),
      name: name || null,
      role,
    })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    res.status(201).json({ user: { id: result.lastID, email: email.toLowerCase(), name: name || null, role } })
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    await initDb()
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await dbGet(
      'SELECT id, uuid, email, name, role, password_hash FROM users WHERE email = ?',
      [email.toLowerCase()],
    )

    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const session = {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    const token = generateToken(session)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  }),

  logout: (req: Request, res: Response) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    res.json({ message: 'Logged out' })
  },

  session: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ user: null })
    }
    res.json({
      user: {
        id: req.user.id,
        uuid: req.user.uuid,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
      },
    })
  }),
}
