# Product Requirements Document (PRD)
## Web Portal Berita Lembaga Investigasi Negara (LINTANG) Kota Tangerang

### 1. Overview
**Project**: Web Portal Berita Lembaga Investigasi Negara Kota Tangerang  
**Singkatan**: LINTANG Kota Tangerang  
**Purpose**: Portal berita resmi untuk menyebarkan informasi, press release, hasil investigasi, dan kegiatan lembaga  
**Target Audience**: Masyarakat umum, media, stakeholder, instansi pemerintah  
**Ownership**: Lembaga Investigasi Negara Kota Tangerang  
**Timeline**: July 2026  

### 2. Problem Statement
Lembaga Investigasi Negara Kota Tangerang membutuhkan platform digital resmi untuk:
- Menyebarkan informasi resmi dan akurat kepada publik
- Mempublikasikan press release dan hasil investigasi
- Dokumentasi kegiatan lembaga
- Membangun kepercayaan publik melalui transparansi informasi
- Menjadi sumber referensi utama media dan masyarakat

### 3. Goals & Objectives
**Primary Goals:**
1. Membangun portal berita resmi yang kredibel dan profesional
2. Memudahkan publikasi berita dengan workflow sederhana (no approval)
3. Menyediakan arsip berita yang terstruktur dan mudah diakses
4. Mendukung transparansi dan akuntabilitas lembaga
5. SEO-friendly untuk menjangkau audiens luas

**Success Metrics:**
- Publikasi berita real-time (langsung publish)
- Aksesibilitas 99.9% uptime
- Load time < 3 detik
- Mobile-responsive 100%
- Search engine indexing optimal

### 4. User Personas
**1. Admin/Editor LINTANG**
- Peran: Staf humas, admin website
- Goals: Publish berita cepat, manage konten
- Tech Savvy: Medium
- Pain Points: Workflow cepat, no bottleneck

**2. Author/Penulis**
- Peran: Staff investigasi, kontributor
- Goals: Publish hasil investigasi, berita
- Tech Savvy: Medium
- Pain Points: Simple interface, direct publish

**3. Jurnalis/Media**
- Peran: Peliput, editor media
- Goals: Akses press release, kutip data resmi, download assets
- Tech Savvy: High
- Pain Points: Cari arsip cepat, format unduhan

**4. Masyarakat Umum**
- Peran: Warga, peneliti, mahasiswa
- Goals: Baca berita investigasi, cari informasi lembaga
- Tech Savvy: Varied
- Pain Points: Navigasi jelas, bahasa mudah dipahami

### 5. Core Features

**Phase 1 (MVP):**
1. **Content Management System**
   - Berita/Artikel (investigasi, kegiatan, kebijakan)
   - Press Release resmi
   - Hasil Investigasi/Laporan
   - Kategori: Investigasi, Kegiatan, Kebijakan, Press Release, Umum
   - Tags untuk topik spesifik
   - Featured image & gallery
   - WYSIWYG editor
   - **Direct Publish (No Approval Workflow)**

2. **User Management**
   - Role: Admin, Editor, Author
   - Simple permissions: Admin (all access), Editor/Author (create & publish)
   - Audit logging untuk tracking

3. **Frontend Public Portal**
   - Homepage: Breaking news, featured, latest posts
   - Kategori & Arsip berita
   - Halaman detail berita dengan related posts
   - Search & filter advance
   - Download press release (PDF)
   - Media gallery (foto/video kegiatan)

4. **Static Pages**
   - Profil Lembaga (Sejarah, Visi Misi, Struktur Organisasi)
   - Tugas & Fungsi
   - Kontak & Lokasi
   - FAQ
   - Unduhan Formulir/Regulasi

**Phase 2 (Future):**
- Newsletter subscription
- RSS Feed
- Social media auto-posting
- Live streaming kegiatan
- Public complaint/feedback form
- Analytics dashboard
- Multi-language (EN)
- Mobile app

### 6. Technical Requirements
**Stack:**
- Backend: Laravel 13 (PHP 8.3+)
- Frontend: Blade + Tailwind CSS + Alpine.js
- Database: MySQL/PostgreSQL
- Cache: Redis (optional)
- Storage: S3-compatible (local/cloud)

**Performance:**
- Page load < 3s (Core Web Vitals)
- Image optimization (WebP, responsive)
- CDN-ready
- HTTP/2, Gzip/Brotli

**Security:**
- HTTPS enforced
- CSRF, XSS, SQL Injection protection
- Rate limiting
- Audit logging
- Backup otomatis harian

**Accessibility:**
- WCAG 2.1 AA
- Semantic HTML
- Keyboard navigation
- Screen reader support

### 7. Non-Functional Requirements
- **Availability**: 99.9% uptime (SLA)
- **Scalability**: 10k+ articles, 100k+ views/bulan
- **Maintainability**: Clean architecture, documented
- **Deployability**: CI/CD ready, zero-downtime deploy
- **Monitoring**: Logging, error tracking, uptime monitoring

### 8. Constraints
- Budget: APBN/APBD constraints
- Compliance: UU ITE, UU Kominfo, standar pemerintah
- Branding: Mengikuti brand guideline LINTANG
- Hosting: Instansi pemerintah/cloud nasional

### 9. Dependencies
- PHP 8.3+, Composer, Node.js 20+
- MySQL 8.0+/PostgreSQL 15+
- Web server: Nginx/Apache
- SSL Certificate

### 10. Assumptions & Risks
**Assumptions:**
- Tim humas tersedia untuk training CMS
- Konten siap saat launch
- Infrastructure disediakan
- No approval bottleneck needed (direct publish)

**Risks:**
- Konten sensitif (mitigasi: audit trail & role permissions)
- Serangan siber (DDoS, defacement)
- Compliance regulatory changes
- Staff turnover (knowledge transfer)

### 11. Timeline & Milestones
**Week 1-2: Foundation**
- Project setup, auth, RBAC
- Database migration & seeding
- Basic CRUD berita & kategori

**Week 3: CMS & Media**
- Direct publish workflow
- Media manager
- WYSIWYG editor integration

**Week 4: Frontend Public**
- Homepage, archive, single post
- Search, filter, pagination
- Static pages
- Responsive & accessibility

**Week 5: Polish & Deploy**
- SEO optimization
- Performance tuning
- Security hardening
- UAT & training
- Production deployment

### 12. Success Criteria
- Semua fitur MVP berfungsi
- Direct publish workflow lancar (no approval delay)
- Public portal accessible & fast
- Security audit passed
- Staff terlatih mengelola konten
- Documentation complete

### Key Change: No Approval Workflow
- Authors/Editors dapat langsung publish tanpa waiting approval
- Faster news publication (real-time)
- Simplified editorial process
- Trust-based content management
- Audit trail untuk accountability
