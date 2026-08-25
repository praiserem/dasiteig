# Agent Guide — KEPT General Goods

## Project Overview
A premium e-commerce website for everyday goods, built with React + TypeScript + Vite on the frontend and Express + SQLite on the backend. Features include product inventory management, user authentication, and an owner admin panel.

## Architecture

### Frontend (`/` - root project)
- **React 18** + **TypeScript** + **Vite** + **Tailwind CSS**
- **React Router v6** for routing
- **Framer Motion** for animations
- **Lucide React** for icons
- **Design system** in `src/components/ui/` (primitives: Button, Input, Badge, Modal, etc.)

### Backend (`server/`)
- **Express.js** API server
- **SQLite** database (file-based, no external DB required)
- **bcrypt** for password hashing
- **JWT** tokens in httpOnly cookies for authentication
- **Role-based access control**: `USER` (default) and `OWNER` (server-side verified)

### API Endpoints
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/signup` | None | Create user account |
| POST | `/api/auth/login` | None | Login + set cookie |
| POST | `/api/auth/logout` | None | Clear cookie |
| GET | `/api/auth/session` | Required | Check session |
| GET | `/api/products` | None | List all products |
| GET | `/api/products/:slug` | None | Get product by slug |
| POST | `/api/products` | OWNER | Create product |
| PUT | `/api/products/:id` | OWNER | Update product |
| DELETE | `/api/products/:id` | OWNER | Delete product |
| POST | `/api/inventory/:id/adjust` | OWNER | Adjust stock |
| GET | `/api/inventory/history` | OWNER | Inventory change history |
| PUT | `/api/user` | Required | Update user profile |
| POST | `/api/auth/password` | Required | Change password |

## Running the Project

### Prerequisites
- Node.js >= 20
- npm

### Development
Two terminals are needed:

**Terminal 1 — Backend (API server):**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 — Frontend (Vite dev server):**
```bash
npm install
npm run dev
```

The Vite proxy forwards `/api/*` requests to the server on `http://localhost:3001`.

### Database Seed
```bash
cd server
npm run seed
```
This creates 9 sample products and an owner account:
- Email: `owner@kept.shop`
- Password: `ownerpassword123`

### Owner Configuration
Set `OWNER_EMAIL` in `server/.env` to designate which email address gets the OWNER role. The default is `owner@kept.shop`.

### Production Build
```bash
npm run build
cd server
npm run build
npm start
```
The Express server serves the built frontend from `../dist`.

## Key Files

### Frontend
- `src/App.tsx` — Root router with auth guards
- `src/hooks/useAuth.tsx` — Auth context/provider
- `src/hooks/useCart.tsx` — Cart context
- `src/lib/api.ts` — API client
- `src/components/ui/` — Design system components
- `src/components/admin/AdminSidebar.tsx` — Admin sidebar
- `src/pages/` — Page components
- `src/pages/admin/` — Admin page components
- `src/pages/AdminLayout.tsx` — Admin layout wrapper
- `src/data/products.ts` — Product type definitions & seed data

### Backend
- `server/src/server.ts` — Express server entry
- `server/src/db/index.ts` — SQLite database layer
- `server/src/middleware/auth.ts` — Auth/role middleware
- `server/src/routes/auth.ts` — Auth routes
- `server/src/routes/products.ts` — Product CRUD routes
- `server/src/routes/inventory.ts` — Inventory adjustment routes
- `server/src/lib/utils.ts` — Shared utilities
- `server/src/seed.ts` — Database seed script

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend) |
| `cd server && npm run dev` | Start Express server (backend) |
| `cd server && npm run seed` | Seed the database |
| `npm run build` | Build frontend for production |
| `cd server && npm run build` | Build backend for production |
| `cd server && npm start` | Start production server |
| `npx tsc --noEmit` | Type-check frontend |
| `cd server && npx tsc --noEmit` | Type-check backend |
