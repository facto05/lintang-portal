@extends('layouts.admin')

@section('title', 'Edit Category')

@section('content')
<div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Category</h1>

    <form method="POST" action="{{ route('admin.categories.update', $category) }}" class="space-y-6 bg-white shadow rounded-lg p-6">
        @csrf
        @method('PUT')

        <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value="{{ old('name', $category->name) }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('name')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="investigation" {{ old('type', $category->type) == 'investigation' ? 'selected' : '' }}>Investigation</option>
                <option value="activity" {{ old('type', $category->type) == 'activity' ? 'selected' : '' }}>Activity</option>
                <option value="policy" {{ old('type', $category->type) == 'policy' ? 'selected' : '' }}>Policy</option>
                <option value="press_release" {{ old('type', $category->type) == 'press_release' ? 'selected' : '' }}>Press Release</option>
                <option value="general" {{ old('type', $category->type) == 'general' ? 'selected' : '' }}>General</option>
            </select>
            @error('type')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">{{ old('description', $category->description) }}</textarea>
            @error('description')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Featured</label>
            <select name="is_featured" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="0" {{ old('is_featured', $category->is_featured) == '0' ? 'selected' : '' }}>No</option>
                <option value="1" {{ old('is_featured', $category->is_featured) == '1' ? 'selected' : '' }}>Yes</option>
            </select>
            @error('is_featured')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div class="flex gap-4">
            <button type="submit" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Update Category</button>
            <a href="{{ route('admin.categories.index') }}" class="bg-white text-gray-700 px-6 py-2 rounded border hover:bg-gray-50">Cancel</a>
        </div>
    </form>
</div>
@endsection
