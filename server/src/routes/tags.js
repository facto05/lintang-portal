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
      SELECT t.*, (SELECT COUNT(*) FROM post_tag pt WHERE pt.tag_id = t.id) as posts_count
      FROM tags t ORDER BY t.name
    `);
    const tags = rows[0]?.values.map(row => ({
      id: row[0], name: row[1], slug: row[2], tag_type: row[3], created_at: row[4], posts_count: row[5]
    })) || [];
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware(['admin']), (req, res) => {
  try {
    const { name, slug, tag_type } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const db = getDb();
    db.run('INSERT INTO tags (name, slug, tag_type) VALUES (?, ?, ?)',
      [name, slug || slugify(name), tag_type || 'topic']);
    const idResult = db.exec("SELECT last_insert_rowid()");
    const id = idResult[0]?.values[0][0];
    saveDb();
    res.status(201).json({ message: 'Tag created', id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const { name, slug, tag_type } = req.body;
    const db = getDb();
    db.run('UPDATE tags SET name = COALESCE(?, name), slug = COALESCE(?, slug), tag_type = COALESCE(?, tag_type) WHERE id = ?',
      [name || null, slug || null, tag_type || null, req.params.id]);
    saveDb();
    res.json({ message: 'Tag updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authMiddleware(['admin']), (req, res) => {
  try {
    const db = getDb();
    db.run('DELETE FROM tags WHERE id = ?', [req.params.id]);
    saveDb();
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
