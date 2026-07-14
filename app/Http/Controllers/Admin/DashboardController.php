<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Log;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPosts = Post::count();
        $publishedPosts = Post::where('status', 'published')->count();
        $draftPosts = Post::where('status', 'draft')->count();
        $totalViews = Post::sum('views') ?? 0;

        $recentLogs = Log::with('user')
            ->latest()
            ->limit(10)
            ->get();

        return view('admin.dashboard.index', [
            'totalPosts' => $totalPosts,
            'publishedPosts' => $publishedPosts,
            'draftPosts' => $draftPosts,
            'totalViews' => $totalViews,
            'recentLogs' => $recentLogs,
        ]);
    }
}
