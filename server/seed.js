import bcrypt from 'bcryptjs';
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'data/lintang.db');

if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

initSqlJs().then(SQL => {
  let db;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT DEFAULT 'author', department TEXT, avatar TEXT, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`);
  db.run(`CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, type TEXT DEFAULT 'general', description TEXT, is_featured INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')))`);
  db.run(`CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, tag_type TEXT DEFAULT 'topic', created_at TEXT DEFAULT (datetime('now')))`);
  db.run(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT, content TEXT, featured_image TEXT, author_id INTEGER, category_id INTEGER, status TEXT DEFAULT 'draft', priority TEXT DEFAULT 'normal', views INTEGER DEFAULT 0, published_at TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')), FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL)`);
  db.run(`CREATE TABLE IF NOT EXISTS post_tag (post_id INTEGER NOT NULL, tag_id INTEGER NOT NULL, PRIMARY KEY (post_id, tag_id), FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE)`);
  db.run(`CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT NOT NULL, original_name TEXT NOT NULL, mime_type TEXT, size INTEGER, path TEXT, alt_text TEXT, created_at TEXT DEFAULT (datetime('now')))`);
  db.run(`CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, content TEXT, page_type TEXT DEFAULT 'other', meta_title TEXT, meta_description TEXT, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`);

  const hash = bcrypt.hashSync('password', 10);

  // Seed data
  db.run(`INSERT INTO users (name, email, password, role, department) VALUES (?,?,?,?,?)`, ['Admin LINTANG', 'admin@lintang.tangerangkota.go.id', hash, 'admin', 'Humas']);
  db.run(`INSERT INTO users (name, email, password, role, department) VALUES (?,?,?,?,?)`, ['Editor LINTANG', 'editor@lintang.tangerangkota.go.id', hash, 'editor', 'Investigasi']);

  const insertCat = db.prepare(`INSERT INTO categories (name, slug, type, description, is_featured) VALUES (?,?,?,?,?)`);
  insertCat.run(['Press Release','press-release','press_release','Siaran pers resmi',1]);
  insertCat.run(['Hasil Investigasi','hasil-investigasi','investigation','Laporan hasil investigasi',1]);
  insertCat.run(['Kegiatan','kegiatan','activity','Kegiatan operasional',0]);
  insertCat.run(['Kebijakan','kebijakan','policy','Peraturan dan kebijakan',0]);
  insertCat.run(['Umum','umum','general','Informasi umum',0]);

  const insertPage = db.prepare(`INSERT INTO pages (title, slug, page_type, content, is_active) VALUES (?,?,?,?,?)`);
  insertPage.run(['Profil LINTANG','profil','about','<h2>Tentang LINTANG</h2><p>Lembaga Investigasi Negara Kota Tangerang.</p>',1]);
  insertPage.run(['Kontak','kontak','contact','<h2>Hubungi Kami</h2><p>Kantor LINTANG Kota Tangerang</p>',1]);
  insertPage.run(['FAQ','faq','faq','<h2>FAQ</h2>',1]);
  insertPage.run(['Struktur Organisasi','struktur-organisasi','about','<h2>Struktur Organisasi</h2>',1]);
  insertPage.run(['Pengaduan','pengaduan','contact','<h2>Pengaduan</h2>',1]);

  // Save to file
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);

  console.log('Seed complete!');
  console.log('Login: admin@lintang.tangerangkota.go.id / password');
  console.log('Database:', dbPath);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
