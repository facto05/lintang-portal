import { Router } from 'express';
import { getDb, saveDb } from '../utils/database.js';
import { authMiddleware } from '../utils/middleware.js';

const router = Router();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/', (req, res) => {
  try {
    const rows = getDb().exec('SELECT * FROM pages WHERE is_active = 1');
    const pages = rows[0]?.values.map(row => ({
      id: row[0], title: row[1], slug: row[2], content: row[3],
      page_type: row[4], meta_title: row[5], meta_description: row[6], is_active: !!row[7]
    })) || [];
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin', authMiddleware(['admin']), (req, res) => {
  try {
    const rows = getDb().exec('SELECT * FROM pages ORDER BY id DESC');
    const pages = rows[0]?.values.map(row => ({
      id: row[0], title: row[1], slug: row[2], content: row[3],
      page_type: row[4], meta_title: row[5], meta_description: row[6],
      is_active: !!row[7], created_at: row[8], updated_at: row[9]
    })) || [];
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:slug', (req, res) => {
  try {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM pages WHERE slug = ? AND is_active = 1');
    stmt.bind([req.params.slug]);
    if (!stmt.step()) { stmt.free(); return res.status(404).json({ message: 'Page not found' }); }
    res.json(stmt.getAsObject());
    stmt.free();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware(['admin']), (req, res) => {
  try {
    const { title, slug, content, page_type, meta_title, meta_description, is_active } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const db = getDb();
    const pageSlug = slug || slugify(title);
    db.run(`INSERT INTO pages (title, slug, content, page_type, meta_title, meta_description, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, pageSlug, content || null, page_type || 'other',
       meta_title || null, meta_description || null, is_active !== undefined ? (is_active ? 1 : 0) : 1]);
    saveDb();
    res.status(201).json({ message: 'Page created', slug: pageSlug });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const { title, slug, content, page_type, meta_title, meta_description, is_active } = req.body;
    const db = getDb();
    const pageSlug = slug || slugify(title || '');
    db.run(`UPDATE pages SET
      title = COALESCE(?, title), slug = COALESCE(?, slug),
      content = COALESCE(?, content), page_type = COALESCE(?, page_type),
      meta_title = COALESCE(?, meta_title), meta_description = COALESCE(?, meta_description),
      is_active = COALESCE(?, is_active), updated_at = datetime('now')
      WHERE id = ?`,
      [title || null, pageSlug || null, content || null, page_type || null,
       meta_title || null, meta_description || null,
       is_active !== undefined ? (is_active ? 1 : 0) : null, req.params.id]);
    saveDb();
    res.json({ message: 'Page updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    getDb().run('DELETE FROM pages WHERE id = ?', [parseInt(req.params.id)]);
    saveDb();
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
