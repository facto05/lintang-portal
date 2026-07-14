import { Router } from 'express';
import { getDb, saveDb } from '../utils/database.js';
import { authMiddleware } from '../utils/middleware.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = Router();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Public: published posts (paginated, filterable)
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const sort = req.query.sort || 'date';

    let where = "WHERE p.status = 'published'";
    let params = [];

    if (req.query.category) {
      where += ' AND p.category_id = ?';
      params.push(req.query.category);
    }
    if (search) {
      where += " AND (p.title LIKE ? OR p.excerpt LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    const countResult = db.exec(`SELECT COUNT(*) as total FROM posts p ${where}`);
    const total = countResult[0]?.values[0][0] || 0;

    let orderBy = 'p.published_at DESC';
    if (sort === 'views') orderBy = 'p.views DESC';

    const query = `
      SELECT p.*, u.name as author_name, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      ${where}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const stmt = db.prepare(query);
    stmt.bind([...params, limit, offset]);
    const posts = [];
    while (stmt.step()) posts.push(stmt.getAsObject());
    stmt.free();

    res.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: all posts (all statuses)
router.get('/admin', authMiddleware(['admin', 'editor', 'author']), (req, res) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';

    let where = 'WHERE 1=1';
    let params = [];

    if (status) {
      where += ' AND p.status = ?';
      params.push(status);
    }
    if (search) {
      where += " AND (p.title LIKE ? OR p.excerpt LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    const countResult = db.exec(`SELECT COUNT(*) FROM posts p ${where}`);
    const total = countResult[0]?.values[0][0] || 0;

    const query = `
      SELECT p.*, u.name as author_name, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      ${where}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const stmt = db.prepare(query);
    stmt.bind([...params, limit, offset]);
    const posts = [];
    while (stmt.step()) posts.push(stmt.getAsObject());
    stmt.free();

    res.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: single post by id (any status)
router.get('/admin/:id', authMiddleware(['admin', 'editor', 'author']), (req, res) => {
  try {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT p.*, u.name as author_name, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `);
    stmt.bind([parseInt(req.params.id)]);

    if (!stmt.step()) {
      stmt.free();
      return res.status(404).json({ message: 'Post not found' });
    }
    const post = stmt.getAsObject();
    stmt.free();

    const tagStmt = db.prepare(`
      SELECT t.* FROM tags t
      JOIN post_tag pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `);
    tagStmt.bind([post.id]);
    post.tags = [];
    while (tagStmt.step()) post.tags.push(tagStmt.getAsObject());
    tagStmt.free();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Public: single published post by slug
router.get('/:slug', (req, res) => {
  try {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT p.*, u.name as author_name, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.status = 'published'
    `);
    stmt.bind([req.params.slug]);

    if (!stmt.step()) {
      stmt.free();
      return res.status(404).json({ message: 'Post not found' });
    }
    const post = stmt.getAsObject();
    stmt.free();

    const tagStmt = db.prepare(`
      SELECT t.* FROM tags t
      JOIN post_tag pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `);
    tagStmt.bind([post.id]);
    post.tags = [];
    while (tagStmt.step()) post.tags.push(tagStmt.getAsObject());
    tagStmt.free();

    const relatedStmt = db.prepare(`
      SELECT p.id, p.title, p.slug, p.featured_image, p.published_at
      FROM posts p
      WHERE p.category_id = ? AND p.id != ? AND p.status = 'published'
      ORDER BY p.published_at DESC LIMIT 3
    `);
    relatedStmt.bind([post.category_id, post.id]);
    post.relatedPosts = [];
    while (relatedStmt.step()) post.relatedPosts.push(relatedStmt.getAsObject());
    relatedStmt.free();

    db.run('UPDATE posts SET views = views + 1 WHERE id = ?', [post.id]);

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create post
router.post('/', authMiddleware(['admin', 'editor', 'author']), (req, res) => {
  try {
    const { title, slug, excerpt, content, featured_image, category_id, status, tags } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const db = getDb();
    const postSlug = slug || slugify(title);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const postStatus = status || 'draft';

    db.run(`INSERT INTO posts (title, slug, excerpt, content, featured_image, author_id, category_id, status, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, postSlug, excerpt || null, content || null, featured_image || null,
       req.user.id, category_id || null, postStatus,
       postStatus === 'published' ? now : null, now, now]);
    const idResult = db.exec("SELECT last_insert_rowid()");
    const postId = idResult[0]?.values[0][0];
    saveDb();

    if (tags && tags.length > 0) {
      const insert = db.prepare('INSERT OR IGNORE INTO post_tag (post_id, tag_id) VALUES (?, ?)');
      for (const tagId of tags) {
        insert.bind([postId, tagId]);
        insert.step();
      }
      insert.free();
    }

    res.status(201).json({ message: 'Post created', id: postId, slug: postSlug });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update post
router.put('/:id', authMiddleware(['admin', 'editor', 'author']), (req, res) => {
  try {
    const { title, slug, excerpt, content, featured_image, category_id, status, tags } = req.body;
    const db = getDb();

    const postId = parseInt(req.params.id);
    const existing = db.exec(`SELECT * FROM posts WHERE id = ${postId}`);
    if (!existing[0]?.values.length) return res.status(404).json({ message: 'Post not found' });

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const postSlug = slug || slugify(title || '');

    db.run(`UPDATE posts SET
      title = COALESCE(?, title), slug = COALESCE(?, slug),
      excerpt = COALESCE(?, excerpt), content = COALESCE(?, content),
      featured_image = COALESCE(?, featured_image),
      category_id = COALESCE(?, category_id),
      status = COALESCE(?, status),
      published_at = CASE WHEN ? = 'published' AND status != 'published' THEN ? ELSE published_at END,
      updated_at = ?
      WHERE id = ?`,
      [title || null, postSlug || null, excerpt || null, content || null,
       featured_image || null, category_id || null, status || null,
       status, status === 'published' ? now : null, now, req.params.id]);
    saveDb();

    if (tags !== undefined) {
      db.run('DELETE FROM post_tag WHERE post_id = ?', [req.params.id]);
      const insert = db.prepare('INSERT OR IGNORE INTO post_tag (post_id, tag_id) VALUES (?, ?)');
      for (const tagId of tags) {
        insert.bind([req.params.id, tagId]);
        insert.step();
      }
      insert.free();
    }

    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: stats
router.get('/stats', authMiddleware(['admin', 'editor', 'author']), (req, res) => {
  try {
    const db = getDb();
    const total = db.exec("SELECT COUNT(*) FROM posts")[0]?.values[0][0] || 0;
    const published = db.exec("SELECT COUNT(*) FROM posts WHERE status='published'")[0]?.values[0][0] || 0;
    const drafts = db.exec("SELECT COUNT(*) FROM posts WHERE status='draft'")[0]?.values[0][0] || 0;
    const archived = db.exec("SELECT COUNT(*) FROM posts WHERE status='archived'")[0]?.values[0][0] || 0;
    const views = db.exec("SELECT COALESCE(SUM(views),0) FROM posts")[0]?.values[0][0] || 0;
    res.json({ total, published, drafts, archived, views });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete post
router.delete('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const db = getDb();
    const postId = parseInt(req.params.id);
    const existing = db.exec(`SELECT featured_image FROM posts WHERE id = ${postId}`);
    const featuredImage = existing[0]?.values[0][0];
    if (featuredImage) {
      const filePath = path.join(__dirname, '../../uploads', path.basename(featuredImage));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    db.run('DELETE FROM posts WHERE id = ?', [postId]);
    saveDb();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
