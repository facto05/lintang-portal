@extends('layouts.admin')

@section('title', 'Tags')

@section('content')
<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Tags</h1>
        <a href="{{ route('admin.tags.create') }}" class="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition">Create Tag</a>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="p-4 border-b">
            <form method="GET" class="flex gap-2">
                <input type="text" name="search" placeholder="Search tags..." value="{{ request('search') }}" class="flex-1 border rounded px-3 py-2">
                <button type="submit" class="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Search</button>
            </form>
        </div>

        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post Count</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($tags as $tag)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ $tag->name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $tag->slug }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {{ ucfirst($tag->tag_type) }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $tag->posts_count }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="{{ route('admin.tags.edit', $tag) }}" class="text-red-700 hover:text-red-900 mr-3">Edit</a>
                        <form method="POST" action="{{ route('admin.tags.destroy', $tag) }}" class="inline" onsubmit="return confirm('Are you sure you want to delete this tag?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">No tags found</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-4">
        {{ $tags->links() }}
    </div>
</div>
@endsection
