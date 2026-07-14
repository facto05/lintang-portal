# Functional Requirements Document (FRD)
## Web Portal Berita Lembaga Investigasi Negara Kota Tangerang (LINTANG)

### 1. Authentication & Authorization

#### 1.1 User Login
- Users akses `/login`
- Input: email, password
- Validasi kredensial terhadap database
- Redirect sesuai role: admin/editor/author → dashboard
- Session maintenance
- Error handling untuk invalid credentials

#### 1.2 Role-Based Access Control (RBAC)
**Admin**
- Full access: create, edit, delete semua konten
- Manage users & roles
- Konfigurasi sistem
- Lihat audit logs

**Editor**
- Create, edit, publish posts
- Manage categories & tags
- Upload media
- Lihat dashboard

**Author**
- Create & edit posts
- Publish posts langsung
- Upload media untuk posts sendiri
- Lihat stats posts sendiri

**Public (tidak login)**
- Baca semua published posts
- Search & filter
- Download press releases (PDF)
- Tidak bisa akses dashboard

### 2. Content Management System (CMS)

#### 2.1 Create Post
- Form: Title, Excerpt, Content (WYSIWYG), Category, Tags
- Upload featured image
- Meta fields: meta_title, meta_description
- Attach PDF (untuk press release)
- Priority selection (low/normal/high/urgent)
- Save as draft atau publish langsung
- Auto-slug generation dari title

#### 2.2 Edit Post
- Modify semua fields
- Update published_at jika republish
- Change priority atau category
- Replace images/PDF

#### 2.3 Publish Workflow (Simplified)
**Draft → Published**

- Author/Editor creates post (status: draft)
- Click "Publish" → Status langsung published
- Published_at timestamp otomatis set
- No approval required
- All changes logged in audit trail

#### 2.4 Delete Post
- Admin: dapat delete semua posts
- Editor/Author: dapat delete posts sendiri
- Soft delete (archive) atau hard delete
- Confirmation required

#### 2.5 Category Management
- Admin/Editor create/edit categories
- Types: investigation, activity, policy, press_release, general
- Mark sebagai featured
- Cannot delete jika ada posts

#### 2.6 Tags Management
- Authors dapat membuat tags saat edit post
- Select dari existing tags
- Tag types: topic, location, person, organization, event
- Auto-complete suggestion

### 3. Media Management

#### 3.1 Upload Media
- Support: JPEG, PNG, WebP, PDF
- Max 5MB per file
- Auto-generate thumbnail (300px)
- Store: local atau cloud storage
- Alt text untuk images

#### 3.2 Media Library
- List all uploaded media
- Filter by type, upload date
- Delete unused media
- Replace existing media
- Add/edit alt text

### 4. Frontend - Public Portal

#### 4.1 Homepage
- Hero section: Featured breaking news
- Latest posts grid (12 items, 3 columns)
- Category sidebar: Featured categories
- Search box di header
- Pagination at bottom

#### 4.2 Single Post Page
- Breadcrumb navigation
- Post title (H1), category badge, date, author
- Featured image (full width)
- Content dengan formatting preserved
- Tags section
- Related posts (by category, max 3)
- Share buttons (social media)
- PDF download button (jika ada)

#### 4.3 Category Archive
- Category name & description
- Posts filtered by category (paginated)
- Sort options: newest, oldest, most viewed

#### 4.4 Search
- Global search across title, content, tags
- Results paginated (10 per page)
- Filter results by category
- Display relevance score

#### 4.5 Tag Pages
- List all posts dengan specific tag
- Related tags sidebar

#### 4.6 Static Pages
- Profil LINTANG (About)
- Kontak & Lokasi
- FAQ
- Unduhan Formulir/Regulasi
- Privacy Policy

### 5. Admin Dashboard

#### 5.1 Dashboard Home
- Statistics cards: Total posts, drafts, published
- Recent posts list (5 items)
- Quick actions: Create post, Upload media
- System health status

#### 5.2 Posts Management
- List view: title, author, status, category, date, views
- Filter: status, category, author, priority
- Sort: newest, oldest, most viewed
- Bulk actions: delete, change status, change category
- Search by title

#### 5.3 Users Management (Admin only)
- List users dengan role, department, last login
- Create/edit/deactivate user
- Reset password
- Assign role
- View user activity logs

#### 5.4 Categories Management
- Table: name, slug, type, post count, is_featured
- Create/edit/delete category
- Reorder categories

#### 5.5 Media Library
- Grid or list view
- Filter: type, upload date
- Preview image
- Edit alt text
- Delete media

### 6. Search & Discovery

#### 6.1 Advanced Search
- Keyword search
- Filter by: category, tag, date range, author
- Sort by: relevance, date, views

#### 6.2 Sidebar Widgets
- Recent posts
- Popular categories
- Featured posts
- Tags cloud

### 7. SEO & Performance

#### 7.1 Meta Tags
- Dynamic title & description per page
- OG tags untuk social sharing
- Canonical URLs
- Schema.org structured data

#### 7.2 URL Structure
- Homepage: `/`
- Single post: `/posts/{slug}`
- Category: `/categories/{slug}`
- Tag: `/tags/{slug}`
- Search: `/search?q={keyword}`
- Static pages: `/{slug}`

#### 7.3 Sitemap
- XML sitemap auto-generated
- Include semua published posts & pages
- Update priority based on freshness

### 8. Security Requirements

#### 8.1 Authentication
- Email verification optional
- Password hashing dengan bcrypt
- Session timeout after 30 minutes inactivity
- Remember me functionality (14 days)

#### 8.2 Authorization
- Middleware untuk role checking
- Admin dapat edit semua posts
- Editor/Author hanya edit posts sendiri

#### 8.3 Protection
- CSRF tokens pada semua forms
- XSS sanitization pada content
- SQL injection prevention via Eloquent ORM
- Rate limiting: 5 login attempts per minute
- IP logging untuk audit

#### 8.4 Audit Logging
- Log semua create/update/delete operations
- Capture user ID, IP address, timestamp
- Record old values & new values
- Searchable audit trail di admin

### 9. Performance & Caching

#### 9.1 Caching Strategy
- Cache published posts (1 hour TTL)
- Cache categories list (24 hours)
- Cache tags list (24 hours)
- Cache homepage (1 hour)

#### 9.2 Image Optimization
- WebP conversion
- Responsive image sizes
- Lazy loading untuk images
- Thumbnail generation

#### 9.3 Database Optimization
- Indexes on frequently queried columns
- Pagination (10-50 items per page)
- Eager loading relationships

### 10. Accessibility

#### 10.1 WCAG 2.1 AA Compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text semua images
- Form labels associated
- Keyboard navigation support
- Color contrast minimum 4.5:1
- Focus indicators visible

#### 10.2 Screen Reader Support
- ARIA labels untuk interactive elements
- Skip to main content link
- Proper landmark regions

### 11. Error Handling

#### 11.1 User-Facing Errors
- 404 Not Found: Helpful message dengan link to homepage
- 500 Server Error: Generic message, support contact
- Form validation: Clear inline error messages

#### 11.2 System Errors
- Logging semua exceptions
- Error tracking
- Admin alert untuk critical errors
- Graceful degradation

### 12. Reporting & Analytics

#### 12.1 Post Statistics
- View count tracking
- Download count (PDF)
- Most viewed posts
- Trending posts (last 30 days)

#### 12.2 User Activity
- Login history
- Content created per user
- System audit trail

### 13. Integration Points

#### 13.1 Export/Download
- Export posts list (CSV)
- PDF download untuk press releases
- Media batch download

#### 13.2 Future Integrations
- RSS Feed generation
- Social media posting
- Newsletter subscription
- API untuk third-party apps

**Key Change: No Approval Workflow**
- Authors dapat langsung publish tanpa waiting approval
- Faster content publication
- Simplified editorial process
- Audit trail tetap tersedia untuk tracking
