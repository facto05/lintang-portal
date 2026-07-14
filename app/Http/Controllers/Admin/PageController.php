<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::paginate(20);
        return view('admin.pages.index', compact('pages'));
    }

    public function create()
    {
        return view('admin.pages.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages',
            'content' => 'required|string',
            'page_type' => 'required|in:about,contact,faq,download,other',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $page = Page::create($validated);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'create',
            'model_type' => 'Page',
            'model_id' => $page->id,
            'new_values' => json_encode($page->toArray()),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    public function edit(Page $page)
    {
        return view('admin.pages.edit', compact('page'));
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug,' . $page->id,
            'content' => 'required|string',
            'page_type' => 'required|in:about,contact,faq,download,other',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $oldValues = $page->toArray();
        $page->update($validated);

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'update',
            'model_type' => 'Page',
            'model_id' => $page->id,
            'old_values' => json_encode($oldValues),
            'new_values' => json_encode($page->fresh()->toArray()),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        $oldValues = $page->toArray();
        $page->delete();

        Log::create([
            'user_id' => auth()->id(),
            'action' => 'delete',
            'model_type' => 'Page',
            'model_id' => $page->id,
            'old_values' => json_encode($oldValues),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }
}
