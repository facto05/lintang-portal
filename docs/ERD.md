# Entity Relationship Diagram (ERD)
## Web Portal Berita Lembaga Investigasi Negara Kota Tangerang (LINTANG)

### Database Schema Overview

**Users Table**
- id (PK)
- name, email (unique), password
- role: admin | editor | author
- phone, department, is_active
- avatar, created_at, updated_at

**Categories Table**
- id (PK)
- name, slug (unique), description
- type: investigation | activity | policy | press_release | general
- is_featured, created_at, updated_at

**Posts Table**
- id (PK)
- author_id (FK users)
- category_id (FK categories)
- title, slug (unique), excerpt, content
- featured_image, images (JSON), pdf_download (FK media)
- status: draft | published | archived
- published_at
- priority: low | normal | high | urgent
- views, downloads
- meta_title, meta_description, created_at, updated_at

**Tags Table**
- id (PK)
- name, slug (unique)
- tag_type: topic | location | person | organization | event
- created_at, updated_at

**Post_Tag Pivot Table**
- id (PK)
- post_id (FK posts), tag_id (FK tags)
- unique(post_id, tag_id)

**Media Table**
- id (PK)
- filename, original_name, mime_type, size, path
- storage: local | s3 | cloud
- width, height, thumbnail_path
- alt_text, category: featured_image | gallery | document
- created_at, updated_at

**Pages Table**
- id (PK)
- title, slug (unique), content
- page_type: about | contact | faq | download | other
- meta_title, meta_description
- is_active, created_at, updated_at

**Logs Table (Audit Trail)**
- id (PK)
- user_id (FK users nullable), action, model_type, model_id
- old_values, new_values, ip_address, user_agent
- created_at, updated_at

### Key Relationships

- users (1) → (N) posts (author)
- categories (1) → (N) posts
- posts (N) → (N) tags (via post_tag)
- posts (N) → (1) media (pdf_download)
- users (1) → (N) logs

### Critical Indexes

- posts(status, published_at)
- posts(category_id)
- posts(author_id, created_at)
- tags(slug)
- logs(model_type, model_id)

### Simplified Workflow (No Approval)

Draft → Published (langsung oleh author/editor)

- Author dapat langsung publish tanpa review
- Audit trail untuk tracking semua perubahan
- Status: draft (sedang dibuat) atau published (live)
