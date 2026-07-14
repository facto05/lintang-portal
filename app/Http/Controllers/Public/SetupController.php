<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SetupController extends Controller
{
    public function run()
    {
        if (app()->environment('local') && request()->input('key') !== 'password') {
            return 'Akses ditolak.';
        }

        $output = [];

        try {
            $output[] = 'Starting migration...';
            Artisan::call('migrate', ['--force' => true]);
            $output[] = Artisan::output();

            $output[] = 'Seeding LintangSeeder...';
            Artisan::call('db:seed', ['--class' => 'LintangSeeder', '--force' => true]);
            $output[] = Artisan::output();

            $output[] = 'Seeding SamplePostsSeeder...';
            Artisan::call('db:seed', ['--class' => 'SamplePostsSeeder', '--force' => true]);
            $output[] = Artisan::output();

            $output[] = 'Storage link...';
            Artisan::call('storage:link');
            $output[] = Artisan::output();

            $output[] = 'Key generate...';
            Artisan::call('key:generate', ['--force' => true]);
            $output[] = Artisan::output();

            $output[] = 'Config cache...';
            Artisan::call('config:cache');
            $output[] = Artisan::output();

            $output[] = 'Route cache...';
            Artisan::call('route:cache');
            $output[] = Artisan::output();

            $output[] = 'View cache...';
            Artisan::call('view:cache');
            $output[] = Artisan::output();

            $output[] = 'SETUP COMPLETE!';
            $output[] = 'Login: admin@lintang.tangerangkota.go.id / password';
        } catch (\Exception $e) {
            $output[] = 'Error: ' . $e->getMessage();
        }

        return nl2br(implode("\n", $output));
    }
}
