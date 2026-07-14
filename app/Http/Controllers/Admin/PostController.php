<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Log;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['author', 'category']);

        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        $posts = $query->orderBy('created_at', 'desc')->paginate(10);
        $categories = Category::all();

        return view('admin.posts.index', compact('posts', 'categories'));
    }

    public function create()
    {
        $categories = Category::all();
        return view('admin.posts.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:1000',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'featured_image' => 'nullable|file|image|max:5120',
            'priority' => 'required|in:low,normal,high,urgent',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'status' => 'required|in:draft,published',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);
        $validated['author_id'] = auth()->id();
        $validated['published_at'] = $validated['status'] === 'published' ? now() : null;

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $filename = time() . '_' . \Illuminate\Support\Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('posts', $filename, 'public');
            $validated['featured_image'] = 'storage/' . $path;
        }

        unset($validated['status']);

        $post = Post::create(array_merge($validated, [
            'status' => $request->input('status'),
        ]));

        if ($request->has('tags')) {
            $post->tags()->sync($request->input('tags'));
        }

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'create',
            'model_type' => 'Post',
            'model_id' => $post->id,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        $categories = Category::all();

        return view('admin.posts.edit', compact('post', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:1000',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'featured_image' => 'nullable|file|image|max:5120',
            'priority' => 'required|in:low,normal,high,urgent',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'status' => 'required|in:draft,published',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);
        if ($validated['status'] === 'published' && $post->status !== 'published') {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('featured_image')) {
            if ($post->featured_image && str_starts_with($post->featured_image, 'storage/')) {
                $oldPath = str_replace('storage/', '', $post->featured_image);
                if (\Storage::disk('public')->exists($oldPath)) {
                    \Storage::disk('public')->delete($oldPath);
                }
            }
            $file = $request->file('featured_image');
            $filename = time() . '_' . \Illuminate\Support\Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('posts', $filename, 'public');
            $validated['featured_image'] = 'storage/' . $path;
        }

        unset($validated['status']);

        $post->update(array_merge($validated, [
            'status' => $request->input('status'),
        ]));

        if ($request->has('tags')) {
            $post->tags()->sync($request->input('tags'));
        }

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'update',
            'model_type' => 'Post',
            'model_id' => $post->id,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->featured_image && str_starts_with($post->featured_image, 'storage/')) {
            $path = str_replace('storage/', '', $post->featured_image);
            if (\Storage::disk('public')->exists($path)) {
                \Storage::disk('public')->delete($path);
            }
        }

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'delete',
            'model_type' => 'Post',
            'model_id' => $post->id,
            'ip_address' => request()->ip(),
        ]);

        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }

    public function toggleStatus($id)
    {
        $post = Post::findOrFail($id);

        $post->update([
            'status' => $post->status === 'published' ? 'draft' : 'published',
            'published_at' => $post->status === 'draft' ? now() : null,
        ]);

        return back()->with('success', 'Post status updated successfully.');
    }
}
