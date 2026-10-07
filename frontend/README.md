# Zaffran & Co. — Frontend

React + TypeScript + Vite + Tailwind CSS v4. See the repository root [README](../README.md) for full setup (backend + frontend together).

## Quick start

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your backend
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

## Structure

- `src/pages` — route-level pages (public + `src/pages/admin`)
- `src/components/ui` — generic, reusable UI primitives (Button, Modal, SectionHeading, …)
- `src/components/sections` — homepage/marketing sections built from `ui` primitives
- `src/components/layout` — header, footer, WhatsApp button, mobile action bar
- `src/components/admin` — admin-only building blocks (tables, forms, sidebar)
- `src/hooks` — `useAuth`, `useSiteSettings`, `useToast`, `useApi` (generic fetch hook)
- `src/services` — the API client and typed endpoint wrappers
- `scripts/generate-placeholders.mjs` — regenerates the placeholder imagery in `public/images`

Placeholder images in `public/images` are generated, labeled SVGs standing in for real photography — replace them via the admin panel (Gallery, Menu, Services, Packages) once real photos are available.
