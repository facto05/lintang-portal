<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Page;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LintangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin LINTANG',
            'email' => 'admin@lintang.tangerangkota.go.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'Humas',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Editor LINTANG',
            'email' => 'editor@lintang.tangerangkota.go.id',
            'password' => Hash::make('password'),
            'role' => 'editor',
            'department' => 'Investigasi',
            'is_active' => true,
        ]);

        $categories = [
            ['name' => 'Press Release', 'slug' => 'press-release', 'type' => 'press_release', 'description' => 'Siaran pers resmi lembaga', 'is_featured' => true],
            ['name' => 'Hasil Investigasi', 'slug' => 'hasil-investigasi', 'type' => 'investigation', 'description' => 'Laporan hasil investigasi dan temuan', 'is_featured' => true],
            ['name' => 'Kegiatan', 'slug' => 'kegiatan', 'type' => 'activity', 'description' => 'Kegiatan operasional lembaga', 'is_featured' => false],
            ['name' => 'Kebijakan', 'slug' => 'kebijakan', 'type' => 'policy', 'description' => 'Peraturan dan kebijakan', 'is_featured' => false],
            ['name' => 'Umum', 'slug' => 'umum', 'type' => 'general', 'description' => 'Informasi umum', 'is_featured' => false],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $tags = [
            ['name' => 'Kota Tangerang', 'slug' => 'kota-tangerang', 'tag_type' => 'location'],
            ['name' => 'Investigasi', 'slug' => 'investigasi', 'tag_type' => 'topic'],
            ['name' => 'Laporan', 'slug' => 'laporan', 'tag_type' => 'topic'],
            ['name' => 'Transparansi', 'slug' => 'transparansi', 'tag_type' => 'topic'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }

        $pages = [
            [
                'title' => 'Profil LINTANG',
                'slug' => 'profil',
                'page_type' => 'about',
                'content' => '<div class="space-y-6"><h2 class="text-2xl font-bold">Tentang Lembaga Investigasi Negara Kota Tangerang</h2><p>Lembaga Investigasi Negara (LINTANG) Kota Tangerang adalah lembaga independen yang bertugas melakukan investigasi terhadap dugaan penyimpangan, pelanggaran, dan tindak pidana di lingkungan pemerintahan dan pelayanan publik Kota Tangerang.</p><h3 class="text-xl font-semibold mt-6">Visi</h3><p>Menjadi lembaga investigasi yang profesional, independen, dan terpercaya dalam mewujudkan tata kelola pemerintahan yang bersih dan transparan di Kota Tangerang.</p><h3 class="text-xl font-semibold mt-6">Misi</h3><ul class="list-disc list-inside space-y-2"><li>Melaksanakan investigasi secara profesional dan independen</li><li>Mendorong transparansi dan akuntabilitas penyelenggaraan pemerintahan</li><li>Memberikan rekomendasi perbaikan tata kelola</li><li>Meningkatkan kesadaran masyarakat akan pentingnya pengawasan partisipatif</li></ul></div>',
                'is_active' => true,
                'meta_title' => 'Profil LINTANG Kota Tangerang',
                'meta_description' => 'Profil Lembaga Investigasi Negara Kota Tangerang - Visi, Misi, Tugas dan Fungsi',
            ],
            [
                'title' => 'Kontak',
                'slug' => 'kontak',
                'page_type' => 'contact',
                'content' => '<div class="space-y-6"><h2 class="text-2xl font-bold">Hubungi Kami</h2><div class="grid md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-lg font-semibold">Alamat</h3><p>Kantor LINTANG Kota Tangerang<br>Jl. Satria - Sudirman No.1<br>Kota Tangerang, Banten 15111</p><h3 class="text-lg font-semibold">Telepon</h3><p>(021) 1234-5678</p><h3 class="text-lg font-semibold">Email</h3><p>info@lintang.tangerangkota.go.id</p></div><div class="space-y-4"><h3 class="text-lg font-semibold">Jam Kerja</h3><p>Senin - Jumat: 08.00 - 17.00 WIB<br>Sabtu - Minggu: Libur</p><h3 class="text-lg font-semibold">Pengaduan</h3><p>Untuk pengaduan masyarakat, silakan hubungi:<br>WhatsApp: 0811-1500-152<br>Email: pengaduan@lintang.tangerangkota.go.id</p></div></div></div>',
                'is_active' => true,
                'meta_title' => 'Kontak LINTANG Kota Tangerang',
                'meta_description' => 'Hubungi Lembaga Investigasi Negara Kota Tangerang',
            ],
            [
                'title' => 'FAQ',
                'slug' => 'faq',
                'page_type' => 'faq',
                'content' => '<div class="space-y-6"><h2 class="text-2xl font-bold">Pertanyaan yang Sering Diajukan</h2><div class="space-y-6"><div><h3 class="text-lg font-semibold">Apa itu LINTANG?</h3><p>LINTANG adalah Lembaga Investigasi Negara Kota Tangerang yang bertugas melakukan investigasi terhadap dugaan penyimpangan dan pelanggaran di lingkungan pemerintahan Kota Tangerang.</p></div><div><h3 class="text-lg font-semibold">Bagaimana cara melaporkan dugaan pelanggaran?</h3><p>Masyarakat dapat melaporkan dugaan pelanggaran melalui WhatsApp di 0811-1500-152, email ke pengaduan@lintang.tangerangkota.go.id, atau datang langsung ke kantor LINTANG.</p></div><div><h3 class="text-lg font-semibold">Apakah laporan dijamin kerahasiaannya?</h3><p>Ya, identitas pelapor dan isi laporan dijamin kerahasiaannya sesuai dengan peraturan perundang-undangan yang berlaku.</p></div><div><h3 class="text-lg font-semibold">Berapa lama proses investigasi?</h3><p>Waktu penyelesaian investigasi tergantung pada kompleksitas kasus. Namun kami berkomitmen untuk menyelesaikan setiap laporan dalam waktu yang wajar.</p></div><div><h3 class="text-lg font-semibold">Apakah ada biaya untuk melapor?</h3><p>Tidak ada biaya sama sekali. Seluruh layanan LINTANG gratis untuk masyarakat.</p></div></div></div>',
                'is_active' => true,
                'meta_title' => 'FAQ LINTANG Kota Tangerang',
                'meta_description' => 'Pertanyaan yang Sering Diajukan tentang LINTANG Kota Tangerang',
            ],
            [
                'title' => 'Struktur Organisasi',
                'slug' => 'struktur-organisasi',
                'page_type' => 'about',
                'content' => '<div class="space-y-6"><h2 class="text-2xl font-bold">Struktur Organisasi LINTANG Kota Tangerang</h2><p class="text-gray-600">Susunan organisasi Lembaga Investigasi Negara Kota Tangerang terdiri dari:</p><div class="bg-gray-50 border rounded-lg p-6 mt-6"><h3 class="text-xl font-semibold text-center mb-4">Ketua LINTANG</h3><p class="text-center text-gray-500">Memimpin dan mengkoordinasikan seluruh kegiatan lembaga</p></div><div class="grid md:grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 border rounded-lg p-4"><h4 class="font-semibold">Wakil Ketua</h4><p class="text-sm text-gray-500">Membantu tugas Ketua dan mengkoordinasikan bidang investigasi</p></div><div class="bg-gray-50 border rounded-lg p-4"><h4 class="font-semibold">Sekretaris</h4><p class="text-sm text-gray-500">Mengelola administrasi dan tata usaha lembaga</p></div></div><div class="mt-6"><h3 class="text-xl font-semibold mb-4">Bidang-Bidang:</h3><div class="grid md:grid-cols-3 gap-4"><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold text-red-700">Bidang Investigasi</h4><p class="text-sm text-gray-500 mt-1">Melaksanakan investigasi terhadap dugaan penyimpangan</p></div><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold text-red-700">Bidang Pengawasan</h4><p class="text-sm text-gray-500 mt-1">Melakukan pengawasan internal terhadap kinerja lembaga</p></div><div class="bg-white border rounded-lg p-4"><h4 class="font-semibold text-red-700">Bidang Humas</h4><p class="text-sm text-gray-500 mt-1">Mengelola hubungan masyarakat dan informasi publik</p></div></div></div></div>',
                'is_active' => true,
                'meta_title' => 'Struktur Organisasi LINTANG Kota Tangerang',
                'meta_description' => 'Susunan organisasi Lembaga Investigasi Negara Kota Tangerang',
            ],
            [
                'title' => 'Pengaduan Masyarakat',
                'slug' => 'pengaduan',
                'page_type' => 'contact',
                'content' => '<div class="space-y-6"><h2 class="text-2xl font-bold">Pengaduan Masyarakat</h2><p class="text-gray-600">LINTANG Kota Tangerang membuka saluran pengaduan masyarakat untuk melaporkan dugaan penyimpangan, penyelewengan, atau pelanggaran yang terjadi di lingkungan pemerintahan Kota Tangerang.</p><div class="bg-red-50 border border-red-200 rounded-lg p-6"><h3 class="text-lg font-semibold text-red-700 mb-3">Jalur Pengaduan</h3><div class="grid md:grid-cols-2 gap-4"><div><p class="font-medium">WhatsApp</p><p class="text-sm text-gray-600">0811-1500-152</p></div><div><p class="font-medium">Email</p><p class="text-sm text-gray-600">pengaduan@lintang.tangerangkota.go.id</p></div><div><p class="font-medium">Telepon</p><p class="text-sm text-gray-600">(021) 1234-5678</p></div><div><p class="font-medium">Datang Langsung</p><p class="text-sm text-gray-600">Kantor LINTANG Kota Tangerang</p></div></div></div><div class="bg-white border rounded-lg p-6"><h3 class="text-lg font-semibold mb-3">Syarat Pengaduan</h3><ul class="list-disc list-inside space-y-2 text-gray-600"><li>Identitas pelapor (nama, alamat, nomor kontak)</li><li>Uraian kronologis kejadian yang dilaporkan</li><li>Bukti pendukung (dokumen, foto, atau saksi)</li><li>Tanggal dan lokasi kejadian</li></ul></div><div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6"><h3 class="text-lg font-semibold text-yellow-700 mb-2">Kerahasiaan Pelapor</h3><p class="text-sm text-gray-600">Identitas pelapor dijamin kerahasiaannya sesuai dengan ketentuan peraturan perundang-undangan yang berlaku. LINTANG tidak akan memberikan identitas pelapor kepada pihak yang dilaporkan.</p></div></div>',
                'is_active' => true,
                'meta_title' => 'Pengaduan Masyarakat - LINTANG Kota Tangerang',
                'meta_description' => 'Sistem pengaduan masyarakat LINTANG Kota Tangerang',
            ],
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}
