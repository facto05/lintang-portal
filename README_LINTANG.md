# Portal Berita LINTANG Kota Tangerang

Portal berita resmi Lembaga Investigasi Negara Kota Tangerang.

## Tech Stack

- Laravel 13
- PHP 8.5
- Tailwind CSS 4
- MySQL/SQLite
- Breeze Authentication

## Features Implemented

### Admin Panel
- Dashboard dengan statistics (total posts, published, drafts, views)
- Posts Management (CRUD, direct publish, search, filter)
- Categories Management
- Media Library (upload, manage)
- Static Pages Management
- Audit Logs

### Public Portal
- Homepage dengan featured post
- Category archives
- Single post pages dengan related posts
- Search functionality
- Responsive design

### Database Tables
- users (dengan role: admin, editor, author)
- categories (5 types: investigation, activity, policy, press_release, general)
- posts (status: draft, published, archived)
- tags (5 types: topic, location, person, organization, event)
- post_tag (pivot)
- media
- pages
- logs (audit trail)

## Installation & Setup

1. Install dependencies:
```bash
composer install
npm install
```

2. Run migrations:
```bash
php artisan migrate
```

3. Seed initial data:
```bash
php artisan db:seed --class=LintangSeeder
php artisan db:seed --class=SamplePostsSeeder
```

4. Create storage symlink:
```bash
php artisan storage:link
```

5. Build assets:
```bash
npm run build
```

6. Run server:
```bash
php artisan serve
```

## Default Credentials

**Admin:**
- Email: admin@lintang.tangerangkota.go.id
- Password: password

**Editor:**
- Email: editor@lintang.tangerangkota.go.id
- Password: password

## Routes

### Public
- `/` - Homepage
- `/posts/{slug}` - Single post
- `/categories/{slug}` - Category archive
- `/search` - Search posts
- `/{slug}` - Static pages

### Admin (requires auth)
- `/admin/dashboard` - Dashboard
- `/admin/posts` - Posts management
- `/admin/categories` - Categories management
- `/admin/media` - Media library
- `/admin/pages` - Static pages management

## Project Structure

```
app/
├── Http/Controllers/
│   ├── Admin/ (PostController, CategoryController, MediaController, PageController, DashboardController)
│   └── Public/ (PostController, CategoryController, SearchController, PageController)
├── Models/ (User, Post, Category, Tag, Media, Page, Log)

resources/views/
├── layouts/ (admin.blade.php, public.blade.php)
├── admin/ (dashboard, posts, categories, media, pages)
└── public/ (posts, categories, pages, search)

docs/
├── PRD.md - Product Requirements Document
├── ERD.md - Entity Relationship Diagram
├── FRD.md - Functional Requirements Document
└── DESIGN_SYSTEM.md - Design System Guide
```

## Key Features

### No Approval Workflow
Posts dapat langsung dipublikasikan tanpa approval. Status:
- **draft** - Sedang dibuat
- **published** - Live di website
- **archived** - Tidak ditampilkan

### Audit Trail
Semua perubahan (create, update, delete) dicatat di tabel `logs` dengan informasi:
- User yang melakukan action
- Old & new values
- IP address & user agent
- Timestamp

### Role-Based Access
- **Admin**: Full access
- **Editor**: Create, edit, publish posts; Upload media
- **Author**: Create, edit, publish posts

## Development

```bash
# Watch assets
npm run dev

# Run tests (bila ada)
php artisan test

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## Notes

- Media upload max: 10MB
- Posts pagination: 10 per page (admin), 12 per page (public)
- Featured image: URL-based (dapat diintegrasikan dengan media library)
- PDF download: Optional untuk press releases

Built with ❤️ for LINTANG Kota Tangerang
