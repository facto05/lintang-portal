import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import categoryRoutes from './routes/categories.js';
import tagRoutes from './routes/tags.js';
import mediaRoutes from './routes/media.js';
import pageRoutes from './routes/pages.js';
import userRoutes from './routes/users.js';
import { setupDatabase, initDb, getDb, setDb } from './utils/database.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/lintang.db');

// Initialize database
initSqlJs().then(SQL => {
  let db;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  setupDatabase(db);
  setDb(db);

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/users', userRoutes);

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});