@extends('layouts.admin')

@section('title', 'Create Page')

@section('content')
<div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Create Page</h1>

    <form method="POST" action="{{ route('admin.pages.store') }}" class="space-y-6 bg-white shadow rounded-lg p-6">
        @csrf

        <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value="{{ old('title') }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('title')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Slug</label>
            <input type="text" name="slug" value="{{ old('slug') }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('slug')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" rows="15" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">{{ old('content') }}</textarea>
            @error('content')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Page Type</label>
            <select name="page_type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="about" {{ old('page_type') == 'about' ? 'selected' : '' }}>About</option>
                <option value="contact" {{ old('page_type') == 'contact' ? 'selected' : '' }}>Contact</option>
                <option value="faq" {{ old('page_type') == 'faq' ? 'selected' : '' }}>FAQ</option>
                <option value="download" {{ old('page_type') == 'download' ? 'selected' : '' }}>Download</option>
                <option value="other" {{ old('page_type') == 'other' ? 'selected' : '' }}>Other</option>
            </select>
            @error('page_type')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Meta Title</label>
            <input type="text" name="meta_title" value="{{ old('meta_title') }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Meta Description</label>
            <textarea name="meta_description" rows="2" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">{{ old('meta_description') }}</textarea>
        </div>

        <div>
            <label class="flex items-center">
                <input type="checkbox" name="is_active" value="1" {{ old('is_active', '1') == '1' ? 'checked' : '' }} class="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500">
                <span class="ml-2 block text-sm text-gray-900">Active</span>
            </label>
        </div>

        <div class="flex gap-4">
            <button type="submit" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Create Page</button>
            <a href="{{ route('admin.pages.index') }}" class="bg-white text-gray-700 px-6 py-2 rounded border hover:bg-gray-50">Cancel</a>
        </div>
    </form>
</div>
@endsection