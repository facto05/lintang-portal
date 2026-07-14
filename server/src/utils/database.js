import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../../data/lintang.db');
const DATA_DIR = path.dirname(DB_PATH);

let db;

export async function initDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const { default: SQL } = await import('sql.js');
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

export function setDb(newDb) {
  db = newDb;
}

export function saveDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export function setupDatabase(d) {
  const dbRef = d || db;

  dbRef.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT DEFAULT 'author', department TEXT, avatar TEXT, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))");
  dbRef.run("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, type TEXT DEFAULT 'general', description TEXT, is_featured INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')))");
  dbRef.run("CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, tag_type TEXT DEFAULT 'topic', created_at TEXT DEFAULT (datetime('now')))");
  dbRef.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT, content TEXT, featured_image TEXT, author_id INTEGER, category_id INTEGER, status TEXT DEFAULT 'draft', priority TEXT DEFAULT 'normal', views INTEGER DEFAULT 0, published_at TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')), FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL)");
  dbRef.run("CREATE TABLE IF NOT EXISTS post_tag (post_id INTEGER NOT NULL, tag_id INTEGER NOT NULL, PRIMARY KEY (post_id, tag_id), FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE)");
  dbRef.run("CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT NOT NULL, original_name TEXT NOT NULL, mime_type TEXT, size INTEGER, path TEXT, alt_text TEXT, created_at TEXT DEFAULT (datetime('now')))");
  dbRef.run("CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, content TEXT, page_type TEXT DEFAULT 'other', meta_title TEXT, meta_description TEXT, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))");

  if (!d) saveDb();
  console.log('Database tables ready');
}
