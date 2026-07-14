import { Router } from 'express';
import { getDb } from '../utils/database.js';
const router = Router();

router.get('/', (req, res) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

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

    const query = `
      SELECT p.*, u.name as author_name, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      ${where}
      ORDER BY p.published_at DESC
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

export default router;
