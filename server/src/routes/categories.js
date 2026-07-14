import { Router } from 'express';
import { getDb, saveDb } from '../utils/database.js';
import { authMiddleware } from '../utils/middleware.js';

const router = Router();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

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

    const countResult = db.prepare(`SELECT COUNT(*) as cnt FROM posts WHERE category_id = ? AND status = 'published'`);
    countResult.bind([category.id]);
    countResult.step();
    const total = countResult.getAsObject().cnt || 0;
    countResult.free();

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

router.post('/', authMiddleware(['admin']), (req, res) => {
  try {
    const { name, slug, type, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const db = getDb();
    db.run('INSERT INTO categories (name, slug, type, description) VALUES (?, ?, ?, ?)',
      [name, slug || slugify(name), type || 'general', description || null]);
    const idResult = db.exec("SELECT last_insert_rowid()");
    const id = idResult[0]?.values[0][0];
    saveDb();
    res.status(201).json({ message: 'Category created', id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const { name, slug, type, description } = req.body;
    const db = getDb();
    db.run('UPDATE categories SET name = COALESCE(?, name), slug = COALESCE(?, slug), type = COALESCE(?, type), description = COALESCE(?, description) WHERE id = ?',
      [name || null, slug || null, type || null, description || null, req.params.id]);
    saveDb();
    res.json({ message: 'Category updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const db = getDb();
    db.run('DELETE FROM categories WHERE id = ?', [req.params.id]);
    saveDb();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
