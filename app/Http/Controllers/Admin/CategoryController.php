<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Log;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('created_at', 'desc')->paginate(10);
        return view('admin.categories.index', compact('categories'));
    }

    public function create()
    {
        return view('admin.categories.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:investigation,activity,policy,press_release,general',
            'description' => 'nullable|string',
            'is_featured' => 'required|in:0,1',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        $category = Category::create($validated);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'create',
            'model_type' => 'Category',
            'model_id' => $category->id,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return view('admin.categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:investigation,activity,policy,press_release,general',
            'description' => 'nullable|string',
            'is_featured' => 'required|in:0,1',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        $category->update($validated);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'update',
            'model_type' => 'Category',
            'model_id' => $category->id,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->posts()->count() > 0) {
            return back()->with('error', 'Cannot delete category with posts.');
        }

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'delete',
            'model_type' => 'Category',
            'model_id' => $category->id,
            'ip_address' => request()->ip(),
        ]);

        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }
}
