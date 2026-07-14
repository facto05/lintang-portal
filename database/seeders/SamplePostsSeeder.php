<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class SamplePostsSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $categories = Category::all();

        $posts = [
            [
                'title' => 'Peluncuran Program Transparansi LINTANG 2026',
                'excerpt' => 'LINTANG meluncurkan program transparansi terbaru untuk meningkatkan akuntabilitas publik.',
                'content' => '<p>Kota Tangerang - Lembaga Investigasi Negara Kota Tangerang (LINTANG) resmi meluncurkan Program Transparansi 2026 yang bertujuan meningkatkan keterbukaan informasi publik.</p><p>Program ini mencakup publikasi hasil investigasi secara real-time dan sistem pelaporan yang lebih interaktif.</p>',
                'category_id' => $categories->where('slug', 'press-release')->first()->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Hasil Investigasi Dugaan Penyimpangan Anggaran',
                'excerpt' => 'LINTANG merilis hasil investigasi terkait dugaan penyimpangan anggaran di beberapa instansi.',
                'content' => '<p>Setelah melakukan investigasi selama 3 bulan, LINTANG menemukan indikasi penyimpangan pada pengelolaan anggaran beberapa program.</p><p>Temuan ini akan ditindaklanjuti sesuai prosedur hukum yang berlaku.</p>',
                'category_id' => $categories->where('slug', 'hasil-investigasi')->first()->id,
                'status' => 'published',
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => 'Workshop Peningkatan Kapasitas Investigator',
                'excerpt' => 'LINTANG mengadakan workshop untuk meningkatkan kemampuan investigator internal.',
                'content' => '<p>Workshop berlangsung selama 3 hari dengan menghadirkan narasumber ahli dari berbagai bidang.</p>',
                'category_id' => $categories->where('slug', 'kegiatan')->first()->id,
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Kebijakan Baru Pelaporan Gratifikasi',
                'excerpt' => 'Peraturan baru tentang mekanisme pelaporan gratifikasi mulai diberlakukan.',
                'content' => '<p>Kebijakan ini bertujuan mencegah praktik korupsi dan meningkatkan integritas aparatur.</p>',
                'category_id' => $categories->where('slug', 'kebijakan')->first()->id,
                'status' => 'published',
                'published_at' => now()->subDays(3),
            ],
        ];

        foreach ($posts as $postData) {
            Post::create(array_merge($postData, [
                'author_id' => $admin->id,
                'slug' => \Illuminate\Support\Str::slug($postData['title']),
                'priority' => 'normal',
            ]));
        }
    }
}
