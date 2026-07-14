import { Router } from 'express';
import { getDb } from '../utils/database.js';
const router = Router();

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

export default router;
