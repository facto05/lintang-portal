@extends('layouts.admin')

@section('title', 'Edit Tag')

@section('content')
<div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Tag</h1>

    <form method="POST" action="{{ route('admin.tags.update', $tag) }}" class="space-y-6 bg-white shadow rounded-lg p-6">
        @csrf
        @method('PUT')

        <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value="{{ old('name', $tag->name) }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('name')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select name="tag_type" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="topic" {{ old('tag_type', $tag->tag_type) == 'topic' ? 'selected' : '' }}>Topic</option>
                <option value="location" {{ old('tag_type', $tag->tag_type) == 'location' ? 'selected' : '' }}>Location</option>
                <option value="person" {{ old('tag_type', $tag->tag_type) == 'person' ? 'selected' : '' }}>Person</option>
                <option value="organization" {{ old('tag_type', $tag->tag_type) == 'organization' ? 'selected' : '' }}>Organization</option>
                <option value="event" {{ old('tag_type', $tag->tag_type) == 'event' ? 'selected' : '' }}>Event</option>
            </select>
            @error('tag_type')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div class="flex gap-4">
            <button type="submit" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Update Tag</button>
            <a href="{{ route('admin.tags.index') }}" class="bg-white text-gray-700 px-6 py-2 rounded border hover:bg-gray-50">Cancel</a>
        </div>
    </form>
</div>
@endsection
