import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../utils/database.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  let query = 'SELECT * FROM users WHERE ';
  let params = [];

  if (isEmail) {
    query += 'email = ?';
    params.push(email);
  } else {
    query += 'username = ?';
    params.push(email);
  }

  try {
    const db = getDb();
    const stmt = db.prepare(query);
    stmt.bind(params);
    if (!stmt.step()) {
      stmt.free();
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    const user = stmt.getAsObject();
    stmt.free();

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDb();
    const stmt = db.prepare('SELECT id, name, email, role, department FROM users WHERE id = ?');
    stmt.bind([decoded.id]);
    if (!stmt.step()) {
      stmt.free();
      return res.status(404).json({ message: 'User not found' });
    }
    const user = stmt.getAsObject();
    stmt.free();
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
