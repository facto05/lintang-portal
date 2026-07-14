import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';
import fs from 'fs';
import bcrypt from 'bcryptjs';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import categoryRoutes from './routes/categories.js';
import tagRoutes from './routes/tags.js';
import pageRoutes from './routes/pages.js';
import userRoutes from './routes/users.js';
import mediaRoutes from './routes/media.js';
import { setupDatabase, getDb, setDb, saveDb } from './utils/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const isProd = process.env.NODE_ENV === 'production';
const dbPath = path.join(__dirname, '../data/lintang.db');
const uploadsDir = path.join(__dirname, '../uploads');

function autoSeed() {
  const db = getDb();
  const count = db.exec('SELECT COUNT(*) FROM users')[0]?.values[0][0] || 0;
  if (count > 0) return;

  const hash = bcrypt.hashSync('password', 10);
  db.run('INSERT INTO users (name, username, email, password, role, department) VALUES (?,?,?,?,?,?)',
    ['Admin LINTANG', 'admin', 'admin@lintang.tangerangkota.go.id', hash, 'admin', 'Humas']);
  db.run('INSERT INTO users (name, username, email, password, role, department) VALUES (?,?,?,?,?,?)',
    ['Editor LINTANG', 'editor', 'editor@lintang.tangerangkota.go.id', hash, 'editor', 'Investigasi']);

  const cats = [
    ['Press Release', 'press-release', 'press_release', 'Siaran pers resmi', 1],
    ['Hasil Investigasi', 'hasil-investigasi', 'investigation', 'Laporan hasil investigasi', 1],
    ['Kegiatan', 'kegiatan', 'activity', 'Kegiatan operasional', 0],
    ['Kebijakan', 'kebijakan', 'policy', 'Peraturan dan kebijakan', 0],
    ['Umum', 'umum', 'general', 'Informasi umum', 0],
  ];
  const insertCat = db.prepare('INSERT INTO categories (name, slug, type, description, is_featured) VALUES (?,?,?,?,?)');
  cats.forEach(c => insertCat.run(c));
  insertCat.free();

  const insertTag = db.prepare('INSERT INTO tags (name, slug, tag_type) VALUES (?,?,?)');
  insertTag.run(['Kota Tangerang', 'kota-tangerang', 'location']);
  insertTag.run(['Investigasi', 'investigasi', 'topic']);
  insertTag.run(['Laporan', 'laporan', 'topic']);
  insertTag.run(['Transparansi', 'transparansi', 'topic']);
  insertTag.free();

  const pages = [
    ['Profil LINTANG', 'profil', 'about', '<div><h2 class="text-2xl font-bold mb-4">Tentang LINTANG</h2><p>Lembaga Investigasi Negara Kota Tangerang.</p></div>'],
    ['Kontak', 'kontak', 'contact', '<div><h2 class="text-2xl font-bold mb-4">Hubungi Kami</h2><p>Kantor LINTANG Kota Tangerang</p></div>'],
    ['FAQ', 'faq', 'faq', '<div><h2 class="text-2xl font-bold mb-4">FAQ</h2></div>'],
  ];
  const insertPage = db.prepare('INSERT INTO pages (title, slug, page_type, content) VALUES (?,?,?,?)');
  pages.forEach(p => insertPage.run(p));
  insertPage.free();

  saveDb();
  console.log('Auto-seeded database with default data');
}

initSqlJs().then(SQL => {
  if (!fs.existsSync(path.dirname(dbPath))) fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  let db;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  setupDatabase(db);
  setDb(db);
  autoSeed();

  const app = express();
  app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  }));
  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/upload', mediaRoutes);

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  if (isProd) {
    const clientDist = path.join(__dirname, '../../client/dist');
    if (fs.existsSync(clientDist)) {
      app.use(express.static(clientDist));
      app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
    }
  }

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
