<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;

class CategoryController extends Controller
{
    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $posts = Post::where('status', 'published')
            ->where('category_id', $category->id)
            ->with(['author', 'category'])
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return view('public.categories.show', compact('category', 'posts'));
    }
}
