# LINTANG Portal — Kota Tangerang

Portal berita resmi Lembaga Investigasi Negara (LINTANG) Kota Tangerang.

## Tech Stack

- **Client:** React 19, Vite, Tailwind CSS 4, React Router
- **Server:** Node.js, Express, SQLite (sql.js), JWT
- **Auth:** bcrypt + JSON Web Token

## Struktur

```
new_project/
├── client/          Frontend SPA
│   └── src/
│       ├── pages/public/  Home, PostDetail, CategoryArchive, Search, Login
│       ├── layouts/       PublicLayout, AdminLayout
│       ├── context/       AuthContext (login/logout/me)
│       └── api.js         Axios instance + JWT interceptor
├── server/          Express API
│   └── src/
│       ├── routes/        auth, posts, categories, pages, media, tags, users
│       ├── controllers/   route handlers
│       ├── middleware/     JWT + role gates
│       ├── models/        database access
│       └── utils/         database.js (sql.js + DDL), middleware.js
├── api/             (legacy)
└── package.json     workspaces: [client, server]
```

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login → JWT |
| GET | `/api/auth/me` | Current user |
| GET | `/api/posts` | Published posts (paginated, filter by category/search) |
| GET | `/api/posts/:slug` | Single post + related |
| GET | `/api/categories` | All categories + post count |
| GET | `/api/categories/:slug` | Category + paginated posts |
| GET | `/api/pages` | Active static pages |
| GET | `/api/pages/:slug` | Single page |
| GET | `/api/tags` | (stub) |
| GET | `/api/media` | (stub) |
| GET | `/api/users` | (stub) |

## Database Schema

- **users** — name, email, password (bcrypt), role (admin/editor/author), department, is_active
- **categories** — name, slug, type, description, is_featured
- **tags** — name, slug, tag_type (topic/location/person/organization/event)
- **posts** — title, slug, excerpt, content (HTML), featured_image, author_id, category_id, status (draft/published/archived), priority, views, published_at
- **post_tag** — pivot post_id ↔ tag_id
- **media** — filename, original_name, mime_type, size, path
- **pages** — title, slug, content, page_type, meta fields, is_active
- **logs** — user_id, action, model_type, model_id, old_values, new_values, ip_address, user_agent

## Frontend Routes

| Route | Halaman |
|-------|---------|
| `/` | Home — featured post, latest, popular, kategori |
| `/posts/:slug` | Detail artikel + related posts |
| `/categories/:slug` | Arsip kategori |
| `/search` | Pencarian |
| `/:slug` | Halaman statis (profil, kontak, FAQ, dll) |
| `/login` | Login admin |
| `/admin/*` | Admin dashboard (dilindungi auth) |

## Instalasi & Setup

```bash
# Install dependencies
npm install

# Seed database
npm -w server run seed

# Development (client + server concurrently)
npm run dev
```

Server berjalan di `http://localhost:3001`, client di `http://localhost:5173`.

## Default Credentials

- **Admin:** admin@lintang.tangerangkota.go.id / password
- **Editor:** editor@lintang.tangerangkota.go.id / password

## Fitur

- Publikasi post tanpa approval (draft → published → archived)
- Audit trail semua perubahan (create, update, delete)
- Role-based access: Admin (full), Editor (tambah/edit/publish + upload media), Author (tambah/edit/publish)
- Pagination: 10 per halaman (admin), 12 per halaman (publik)
- Featured image via URL
- Upload media max 10MB
- Responsive design
