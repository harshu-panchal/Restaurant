# Zaffran & Co. — Wedding Catering Website

A premium Indian wedding catering website: a marketing site (home, about,
services, menu, packages, gallery, testimonials, contact, get-a-quote) backed
by a REST API and a content/enquiry admin panel.

- `frontend/` — React + TypeScript + Vite + Tailwind CSS v4
- `backend/` — Node.js + Express + MongoDB/Mongoose

## Prerequisites

- Node.js 18+
- A MongoDB connection string (local MongoDB, [Atlas](https://www.mongodb.com/atlas), or the zero-install option below)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

- `MONGODB_URI` — your MongoDB connection string
- `JWT_SECRET` — any long random string
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your first admin login

No MongoDB installed yet? Run the API against a throwaway, zero-install
in-memory database instead of setting `MONGODB_URI`:

```bash
npm run dev:memory
```

(Data resets every time you stop this process — fine for trying things out,
not for real use.)

Otherwise, once `MONGODB_URI` points at a real database:

```bash
npm run seed          # creates the first admin login + default site settings
npm run seed:content  # optional — populates sample menu/services/packages/gallery
npm run dev           # starts the API on http://localhost:5000
```

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL should match the backend's URL + /api
npm run dev            # http://localhost:5173
```

## 3. Log in to the admin panel

Visit `http://localhost:5173/admin/login` with the email/password you set as
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`. From there you can manage the
menu, services, packages, gallery, testimonials, enquiries, and site-wide
settings (business name, contact details, WhatsApp number, hero copy).

## Notes

- **Testimonials** are seeded unpublished. Only publish real customer quotes
  via the admin panel — the site never fabricates reviews.
- **Images** in `frontend/public/images` are generated placeholders, each
  labeled with what it should be replaced with. Swap them for real
  photography via the admin panel's image upload fields.
- **WhatsApp** — set the business WhatsApp number in Admin → Settings; the
  floating button and mobile action bar read from there.
- **File storage** defaults to local disk (`backend/uploads`). Set
  `STORAGE_PROVIDER=cloudinary` and fill in the `CLOUDINARY_*` env vars to
  move uploads to Cloudinary instead (see `backend/services/imageService.js`).
