# KEPT — General Goods

An original ecommerce site (brand, copy, and code all original) built with a
design system inspired by the layout, spacing, and UX rhythm of a modern
independent-store reference — not its content, images, or code.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (drawer, overlay, hero, hover motion)
- Lucide React (icons)
- React Router (product pages, category pages, search, static pages)

## Getting started

This project was built in a sandboxed environment with no network access, so
dependencies could not be installed or the dev server run/tested here. To run
it locally:

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To type-check and build for production:

```bash
npm run build
npm run preview
```

## What to check first

- `/` — homepage: hero, "On the shelf now" product grid, "Pick a format"
  categories, comparison/editorial section, bundles, brand strip, trust
  section
- `/products/fieldrunner-canvas-tote` — product detail page (swap the slug
  for any product in `src/data/products.ts`)
- `/category/bags` — category listing
- `/search` — full catalog with live text filtering
- Cart icon (top right) — slide-in drawer, persists to `localStorage`
- Search icon — animated search overlay with recent searches
- Hamburger icon (mobile widths) — animated slide-in nav

## Project structure

```
src/
  components/   Navbar, AnnouncementBar, MobileMenu, Hero, ProductCard,
                ProductGrid, CategorySection, EditorialSection,
                BundleSection, BrandList, TrustSection, SearchOverlay,
                CartDrawer, ProductGallery, ProductArt, Footer
  pages/        Home, ProductPage, CategoryPage, SearchPage, StaticPage
  data/         products, categories, collections (bundles/editorial/brands)
  hooks/        useCart (React context + localStorage)
  lib/          small utilities
```

## Notes on originality

- Brand name, logo mark, copy, product names, and descriptions are all
  original.
- Product imagery is not photography — it's original SVG line art rendered
  in `ProductArt.tsx`, composed in code rather than generated or copied from
  any source.
- Category set, bundle pairings, and editorial article topics were invented
  for this brand's catalog (everyday-carry goods) rather than mirroring any
  reference's specific products.

## Known gap

Because this project was authored without network access, it has not been
run through `npm install` / `npm run dev` in a real browser. It was reviewed
manually and checked with a TypeScript compiler against stubbed third-party
types to catch structural errors, but you should do a first real run-through
(`npm install && npm run dev`) and skim each page before treating it as
launch-ready. If anything breaks on install, it's most likely a version
mismatch in `package.json` — pin exact versions there if you hit issues.
