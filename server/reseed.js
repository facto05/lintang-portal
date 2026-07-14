import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'data/lintang.db');

initSqlJs().then(SQL => {
  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);

  // Clear existing sample data
  db.run('DELETE FROM post_tag');
  db.run('DELETE FROM posts');
  db.run('DELETE FROM tags');
  db.run('DELETE FROM categories');
  db.run('DELETE FROM users');
  db.run('DELETE FROM pages');

  // Users
  const hash = bcrypt.hashSync('password', 10);
  db.run('INSERT INTO users (name, email, password, role, department) VALUES (?,?,?,?,?)', ['Admin LINTANG', 'admin@lintang.tangerangkota.go.id', hash, 'admin', 'Humas']);
  db.run('INSERT INTO users (name, email, password, role, department) VALUES (?,?,?,?,?)', ['Editor LINTANG', 'editor@lintang.tangerangkota.go.id', hash, 'editor', 'Investigasi']);

  // Categories
  const insertCat = db.prepare('INSERT INTO categories (name, slug, type, description, is_featured) VALUES (?,?,?,?,?)');
  insertCat.run(['Press Release', 'press-release', 'press_release', 'Siaran pers resmi lembaga', 1]);
  insertCat.run(['Hasil Investigasi', 'hasil-investigasi', 'investigation', 'Laporan hasil investigasi dan temuan', 1]);
  insertCat.run(['Kegiatan', 'kegiatan', 'activity', 'Kegiatan operasional lembaga', 0]);
  insertCat.run(['Kebijakan', 'kebijakan', 'policy', 'Peraturan dan kebijakan', 0]);
  insertCat.run(['Umum', 'umum', 'general', 'Informasi umum', 0]);

  // Sample posts
  const insertPost = db.prepare('INSERT INTO posts (title, slug, excerpt, content, featured_image, author_id, category_id, status, priority, views, published_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');

  const posts = [
    { title: 'Peluncuran Program Transparansi LINTANG 2026', slug: 'peluncuran-program-transparansi-lintang-2026', category_slug: 'press-release', excerpt: 'LINTANG meluncurkan program transparansi terbaru untuk meningkatkan akuntabilitas publik.', content: '<p>Lembaga Investigasi Negara Kota Tangerang (LINTANG) resmi meluncurkan Program Transparansi 2026 yang bertujuan meningkatkan keterbukaan informasi publik.</p><p>Program ini mencakup publikasi hasil investigasi secara real-time dan sistem pelaporan yang lebih interaktif.</p>', views: 150 },
    { title: 'Hasil Investigasi Dugaan Penyimpangan Anggaran', slug: 'hasil-investigasi-dugaan-penyimpangan-anggaran', category_slug: 'hasil-investigasi', excerpt: 'LINTANG merilis hasil investigasi terkait dugaan penyimpangan anggaran di beberapa instansi.', content: '<p>Setelah melakukan investigasi selama 3 bulan, LINTANG menemukan indikasi penyimpangan pada pengelolaan anggaran beberapa program.</p><p>Temuan ini akan ditindaklanjuti sesuai prosedur hukum yang berlaku.</p>', views: 230 },
    { title: 'Workshop Peningkatan Kapasitas Investigator', slug: 'workshop-peningkatan-kapasitas-investigator', category_slug: 'kegiatan', excerpt: 'LINTANG mengadakan workshop untuk meningkatkan kemampuan investigator internal.', content: '<p>Workshop berlangsung selama 3 hari dengan menghadirkan narasumber ahli dari berbagai bidang.</p><p>Peserta mendapatkan pelatihan tentang teknik investigasi modern dan analisis data.</p>', views: 89 },
    { title: 'Kebijakan Baru Pelaporan Gratifikasi', slug: 'kebijakan-baru-pelaporan-gratifikasi', category_slug: 'kebijakan', excerpt: 'Peraturan baru tentang mekanisme pelaporan gratifikasi mulai diberlakukan.', content: '<p>Kebijakan ini bertujuan mencegah praktik korupsi dan meningkatkan integritas aparatur.</p><p>Seluruh pegawai wajib melaporkan gratifikasi dalam waktu 30 hari.</p>', views: 120 },
    { title: 'Rakor Evaluasi Kinerja Semester I 2026', slug: 'rakor-evaluasi-kinerja-semester-i-2026', category_slug: 'kegiatan', excerpt: 'Rapat koordinasi evaluasi kinerja semester pertama tahun 2026.', content: '<p>Rakor dihadiri oleh seluruh pimpinan dan staf LINTANG. Evaluasi mencakup capaian target dan rencana semester berikutnya.</p>', views: 67 },
  ];

  const now = new Date();
  posts.forEach((p, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const catStmt = db.prepare('SELECT id FROM categories WHERE slug = ?');
    catStmt.bind([p.category_slug]);
    catStmt.step();
    const cat = catStmt.getAsObject();
    catStmt.free();
    insertPost.run([p.title, p.slug, p.excerpt, p.content, null, 1, cat.id, 'published', 'normal', p.views, date.toISOString(), date.toISOString()]);
  });

  // Tags
  const insertTag = db.prepare('INSERT INTO tags (name, slug, tag_type) VALUES (?,?,?)');
  insertTag.run(['Kota Tangerang', 'kota-tangerang', 'location']);
  insertTag.run(['Investigasi', 'investigasi', 'topic']);
  insertTag.run(['Laporan', 'laporan', 'topic']);
  insertTag.run(['Transparansi', 'transparansi', 'topic']);

  // Pages
  const insertPage = db.prepare('INSERT INTO pages (title, slug, page_type, content, meta_title, meta_description, is_active) VALUES (?,?,?,?,?,?,?)');
  insertPage.run(['Profil LINTANG', 'profil', 'about', '<div><h2 class="text-2xl font-bold mb-4">Tentang LINTANG</h2><p>Lembaga Investigasi Negara (LINTANG) Kota Tangerang adalah lembaga independen yang bertugas melakukan investigasi terhadap dugaan penyimpangan, pelanggaran, dan tindak pidana di lingkungan pemerintahan dan pelayanan publik Kota Tangerang.</p><h3 class="text-xl font-semibold mt-6">Visi</h3><p>Menjadi lembaga investigasi yang profesional, independen, dan terpercaya.</p><h3 class="text-xl font-semibold mt-6">Misi</h3><ul><li>Melaksanakan investigasi secara profesional dan independen</li><li>Mendorong transparansi dan akuntabilitas</li></ul></div>', 'Profil LINTANG', 'Profil Lembaga Investigasi Negara Kota Tangerang', 1]);
  insertPage.run(['Kontak', 'kontak', 'contact', '<div><h2 class="text-2xl font-bold mb-4">Hubungi Kami</h2><div class="grid md:grid-cols-2 gap-6"><div><h3 class="text-lg font-semibold">Alamat</h3><p>Kantor LINTANG Kota Tangerang<br>Jl. Satria - Sudirman No.1<br>Kota Tangerang, Banten 15111</p></div><div><h3 class="text-lg font-semibold">Jam Kerja</h3><p>Senin - Jumat: 08.00 - 17.00 WIB</p><h3 class="text-lg font-semibold mt-4">Email</h3><p>info@lintang.tangerangkota.go.id</p></div></div></div>', 'Kontak LINTANG', 'Hubungi Lembaga Investigasi Negara Kota Tangerang', 1]);
  insertPage.run(['FAQ', 'faq', 'faq', '<div><h2 class="text-2xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2><div class="space-y-6"><div><h3 class="text-lg font-semibold">Apa itu LINTANG?</h3><p>LINTANG adalah Lembaga Investigasi Negara Kota Tangerang.</p></div><div><h3 class="text-lg font-semibold">Bagaimana cara melapor?</h3><p>Melalui WhatsApp 0811-1500-152 atau email pengaduan@lintang.tangerangkota.go.id</p></div><div><h3 class="text-lg font-semibold">Apakah laporan dijamin kerahasiaannya?</h3><p>Ya, identitas pelapor dijamin kerahasiaannya.</p></div></div></div>', 'FAQ LINTANG', 'Pertanyaan yang sering diajukan tentang LINTANG', 1]);
  insertPage.run(['Struktur Organisasi', 'struktur-organisasi', 'about', '<div><h2 class="text-2xl font-bold mb-4">Struktur Organisasi</h2><div class="bg-red-50 border rounded-lg p-6 text-center mb-4"><h3 class="text-xl font-semibold">Ketua LINTANG</h3></div><div class="grid md:grid-cols-2 gap-4"><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold">Wakil Ketua</h4></div><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold">Sekretaris</h4></div></div><div class="grid md:grid-cols-3 gap-4 mt-4"><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold text-red-700">Bidang Investigasi</h4></div><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold text-red-700">Bidang Pengawasan</h4></div><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold text-red-700">Bidang Humas</h4></div></div></div>', 'Struktur Organisasi LINTANG', 'Susunan organisasi LINTANG', 1]);
  insertPage.run(['Pengaduan Masyarakat', 'pengaduan', 'contact', '<div><h2 class="text-2xl font-bold mb-4">Pengaduan Masyarakat</h2><p>LINTANG membuka saluran pengaduan untuk melaporkan dugaan penyimpangan di lingkungan pemerintahan Kota Tangerang.</p><div class="bg-red-50 border border-red-200 rounded-lg p-6 mt-6"><h3 class="text-lg font-semibold text-red-700 mb-3">Jalur Pengaduan</h3><div class="grid md:grid-cols-2 gap-4"><div><p class="font-medium">WhatsApp</p><p class="text-sm text-gray-600">0811-1500-152</p></div><div><p class="font-medium">Email</p><p class="text-sm text-gray-600">pengaduan@lintang.tangerangkota.go.id</p></div><div><p class="font-medium">Telepon</p><p class="text-sm text-gray-600">(021) 1234-5678</p></div><div><p class="font-medium">Datang Langsung</p><p class="text-sm text-gray-600">Kantor LINTANG</p></div></div></div><div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6"><h3 class="text-lg font-semibold text-yellow-700">Kerahasiaan Pelapor</h3><p class="text-sm mt-2">Identitas pelapor dijamin kerahasiaannya.</p></div></div>', 'Pengaduan LINTANG', 'Pengaduan masyarakat LINTANG', 1]);

  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));

  console.log('Reseed complete with sample data!');
  console.log('5 posts with categories, 5 pages, 2 users');
  console.log('Login: admin@lintang.tangerangkota.go.id / password');
  process.exit();
}).catch(err => { console.error(err); process.exit(1); });
