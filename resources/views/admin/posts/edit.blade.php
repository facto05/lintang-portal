@extends('layouts.admin')

@section('title', 'Edit Post')

@section('content')
<div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>

    <form method="POST" action="{{ route('admin.posts.update', $post) }}" enctype="multipart/form-data" class="space-y-6 bg-white shadow rounded-lg p-6">
        @csrf
        @method('PUT')

        <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value="{{ old('title', $post->title) }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('title')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select name="category_id" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="">Select Category</option>
                @foreach($categories as $category)
                <option value="{{ $category->id }}" {{ old('category_id', $post->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                @endforeach
            </select>
            @error('category_id')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea name="excerpt" rows="3" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">{{ old('excerpt', $post->excerpt) }}</textarea>
            @error('excerpt')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" rows="15" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">{{ old('content', $post->content) }}</textarea>
            @error('content')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Featured Image</label>
            @if($post->featured_image)
            <div class="mt-2 mb-3">
                <img src="{{ asset($post->featured_image) }}" alt="Current image" class="w-48 h-32 object-cover rounded border">
                <p class="text-xs text-gray-500 mt-1">Gambar saat ini. Upload baru untuk mengganti.</p>
            </div>
            @endif
            <input type="file" name="featured_image" accept="image/*" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100">
            <p class="mt-1 text-xs text-gray-500">PNG, JPG, WEBP (max 5MB)</p>
            @error('featured_image')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Tags</label>
            <select name="tags[]" multiple class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" size="4">
                @foreach(\App\Models\Tag::all() as $tag)
                <option value="{{ $tag->id }}" {{ in_array($tag->id, $post->tags->pluck('id')->toArray()) ? 'selected' : '' }}>{{ $tag->name }} ({{ $tag->tag_type }})</option>
                @endforeach
            </select>
            <p class="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd untuk multiple select</p>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Priority</label>
            <select name="priority" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="low" {{ old('priority', $post->priority) == 'low' ? 'selected' : '' }}>Low</option>
                <option value="normal" {{ old('priority', $post->priority) == 'normal' ? 'selected' : '' }}>Normal</option>
                <option value="high" {{ old('priority', $post->priority) == 'high' ? 'selected' : '' }}>High</option>
                <option value="urgent" {{ old('priority', $post->priority) == 'urgent' ? 'selected' : '' }}>Urgent</option>
            </select>
        </div>

        <div class="flex gap-4">
            <button type="submit" name="status" value="draft" class="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">Save as Draft</button>
            <button type="submit" name="status" value="published" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Publish</button>
            <a href="{{ route('admin.posts.index') }}" class="bg-white text-gray-700 px-6 py-2 rounded border hover:bg-gray-50">Cancel</a>
        </div>
    </form>
</div>
@endsection
