import { Router } from 'express';
import { getDb } from '../utils/database.js';
const router = Router();

router.get('/', (req, res) => {
  try {
    const db = getDb();
    const rows = db.exec(`
      SELECT c.*, (SELECT COUNT(*) FROM posts p WHERE p.category_id = c.id AND p.status = 'published') as posts_count
      FROM categories c ORDER BY c.name
    `);
    const categories = rows[0]?.values.map(row => ({
      id: row[0], name: row[1], slug: row[2], type: row[3], description: row[4],
      is_featured: !!row[5], created_at: row[6], posts_count: row[7]
    })) || [];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:slug', (req, res) => {
  try {
    const db = getDb();
    const catStmt = db.prepare('SELECT * FROM categories WHERE slug = ?');
    catStmt.bind([req.params.slug]);
    if (!catStmt.step()) { catStmt.free(); return res.status(404).json({ message: 'Category not found' }); }
    const category = catStmt.getAsObject();
    catStmt.free();

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    const countResult = db.exec(`SELECT COUNT(*) FROM posts WHERE category_id = ${category.id} AND status = 'published'`);
    const total = countResult[0]?.values[0][0] || 0;

    const stmt = db.prepare(`
      SELECT p.*, u.name as author_name FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.category_id = ? AND p.status = 'published'
      ORDER BY p.published_at DESC LIMIT ? OFFSET ?
    `);
    stmt.bind([category.id, limit, offset]);
    const posts = [];
    while (stmt.step()) posts.push(stmt.getAsObject());
    stmt.free();

    res.json({ category, posts, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
