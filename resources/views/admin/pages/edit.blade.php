@extends('layouts.admin')

@section('title', isset($page) ? 'Edit Page' : 'Create Page')

@section('content')
<div class="max-w-3xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ isset($page) ? 'Edit Page' : 'Create Page' }}</h1>

    <form method="POST" action="{{ isset($page) ? route('admin.pages.update', $page) : route('admin.pages.store') }}" class="space-y-6 bg-white shadow rounded-lg p-6">
        @csrf
        @if(isset($page)) @method('PUT') @endif

        <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value="{{ old('title', $page->title ?? '') }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            @error('title')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Slug</label>
            <input type="text" name="slug" value="{{ old('slug', $page->slug ?? '') }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            @error('slug')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" rows="15" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">{{ old('content', $page->content ?? '') }}</textarea>
            @error('content')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Page Type</label>
            <select name="page_type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="about" {{ old('page_type', $page->page_type ?? '') == 'about' ? 'selected' : '' }}>About</option>
                <option value="contact" {{ old('page_type', $page->page_type ?? '') == 'contact' ? 'selected' : '' }}>Contact</option>
                <option value="faq" {{ old('page_type', $page->page_type ?? '') == 'faq' ? 'selected' : '' }}>FAQ</option>
                <option value="download" {{ old('page_type', $page->page_type ?? '') == 'download' ? 'selected' : '' }}>Download</option>
                <option value="other" {{ old('page_type', $page->page_type ?? '') == 'other' ? 'selected' : '' }}>Other</option>
            </select>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Meta Title</label>
            <input type="text" name="meta_title" value="{{ old('meta_title', $page->meta_title ?? '') }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Meta Description</label>
            <textarea name="meta_description" rows="2" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">{{ old('meta_description', $page->meta_description ?? '') }}</textarea>
        </div>

        <div class="flex items-center">
            <input type="checkbox" name="is_active" id="is_active" value="1" 
                {{ old('is_active', $page->is_active ?? 1) ? 'checked' : '' }}
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
            <label for="is_active" class="ml-2 block text-sm text-gray-900">Active</label>
        </div>

        <div class="flex gap-4">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
            <a href="{{ route('admin.pages.index') }}" class="bg-white text-gray-700 px-6 py-2 rounded border hover:bg-gray-50">Cancel</a>
        </div>
    </form>
</div>
@endsection
