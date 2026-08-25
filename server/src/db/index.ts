import sqlite3 from 'sqlite3'
import path from 'node:path'
import fs from 'node:fs'

let db: sqlite3.Database | null = null

type RowData = Record<string, any>

function getDbPath(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  return path.join(__dirname, '..', '..', 'data', 'kept.db')
}

export function initDb(): Promise<sqlite3.Database> {
  if (db) return Promise.resolve(db)

  const dbPath = getDbPath()
  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return new Promise((resolve, reject) => {
    const dbInstance = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err)
        return
      }

      dbInstance.exec(
        `
        CREATE TABLE IF NOT EXISTS users (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid          TEXT UNIQUE NOT NULL DEFAULT (lower(hex(randomblob(16)))),
          email         TEXT UNIQUE NOT NULL,
          name          TEXT,
          password_hash TEXT,
          role          TEXT NOT NULL DEFAULT 'USER',
          created_at    TEXT NOT NULL DEFAULT (datetime('now')),
          updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS products (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid          TEXT UNIQUE NOT NULL DEFAULT (lower(hex(randomblob(16)))),
          slug          TEXT UNIQUE NOT NULL,
          brand         TEXT NOT NULL,
          name          TEXT NOT NULL,
          category      TEXT NOT NULL,
          price         REAL NOT NULL,
          compare_at    REAL,
          art           TEXT NOT NULL,
          art_color     TEXT NOT NULL,
          variant_kind  TEXT NOT NULL,
          variants      TEXT NOT NULL DEFAULT '[]',
          description   TEXT NOT NULL,
          details       TEXT NOT NULL DEFAULT '[]',
          specs         TEXT NOT NULL DEFAULT '[]',
          shipping      TEXT NOT NULL,
          sku           TEXT,
          stock_quantity INTEGER NOT NULL DEFAULT 0,
          low_stock_threshold INTEGER NOT NULL DEFAULT 5,
          new_flag      INTEGER NOT NULL DEFAULT 0,
          best_seller   INTEGER NOT NULL DEFAULT 0,
          rating        REAL DEFAULT 0,
          review_count  INTEGER DEFAULT 0,
          image_url     TEXT,
          created_at    TEXT NOT NULL DEFAULT (datetime('now')),
          updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS inventory_changes (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id    INTEGER NOT NULL,
          user_id       INTEGER,
          change_type   TEXT NOT NULL,
          quantity      INTEGER NOT NULL,
          previous_qty  INTEGER NOT NULL,
          new_qty       INTEGER NOT NULL,
          reason        TEXT,
          created_at    TEXT NOT NULL DEFAULT (datetime('now')),
          FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users (id)
        );

        CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
        CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
        CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory_changes (product_id);
        CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory_changes (user_id);
        `,
        (err) => {
          if (err) { reject(err); return }
          db = dbInstance
          dbInstance.run(`ALTER TABLE products ADD COLUMN visible INTEGER NOT NULL DEFAULT 1`, (_err: any) => {
            resolve(dbInstance)
          })
        },
      )
    })
  })
}

export function getDbSync(): sqlite3.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.')
  }
  return db
}

export function dbAll(sql: string, params: any[] = []): Promise<RowData[]> {
  return new Promise((resolve, reject) => {
    getDbSync().all(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows as RowData[])
    })
  })
}

export function dbGet(sql: string, params: any[] = []): Promise<RowData | undefined> {
  return new Promise((resolve, reject) => {
    getDbSync().get(sql, params, (err, row) => {
      if (err) reject(err)
      else resolve(row as RowData | undefined)
    })
  })
}

export function dbRun(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  return new Promise((resolve, reject) => {
    getDbSync().run(sql, params, function (err) {
      if (err) reject(err)
      else resolve({ lastID: this.lastID, changes: this.changes })
    })
  })
}
