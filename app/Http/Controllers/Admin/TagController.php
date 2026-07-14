<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Models\Log;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $query = Tag::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $tags = $query->withCount('posts')->orderBy('created_at', 'desc')->paginate(10);
        return view('admin.tags.index', compact('tags'));
    }

    public function create()
    {
        return view('admin.tags.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'tag_type' => 'required|in:topic,location,person,organization,event',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        $tag = Tag::create($validated);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'create',
            'model_type' => 'Tag',
            'model_id' => $tag->id,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('admin.tags.index')->with('success', 'Tag created successfully.');
    }

    public function edit($id)
    {
        $tag = Tag::findOrFail($id);
        return view('admin.tags.edit', compact('tag'));
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'tag_type' => 'required|in:topic,location,person,organization,event',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        $tag->update($validated);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'update',
            'model_type' => 'Tag',
            'model_id' => $tag->id,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('admin.tags.index')->with('success', 'Tag updated successfully.');
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'delete',
            'model_type' => 'Tag',
            'model_id' => $tag->id,
            'ip_address' => request()->ip(),
        ]);

        $tag->delete();

        return redirect()->route('admin.tags.index')->with('success', 'Tag deleted successfully.');
    }
}
