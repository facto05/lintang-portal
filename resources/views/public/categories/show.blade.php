@extends('layouts.public')

@section('title', $category->name)

@section('content')
<div class="bg-gray-50">
    <div class="bg-red-700 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <div class="flex items-center space-x-2 text-sm text-red-200">
                    <a href="{{ route('home') }}" class="hover:text-white">Beranda</a>
                    <span>/</span>
                    <span>{{ $category->name }}</span>
                </div>
            </nav>
            <h1 class="text-3xl font-bold">{{ $category->name }}</h1>
            @if($category->description)
            <p class="mt-2 text-red-100">{{ $category->description }}</p>
            @endif
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        @if($posts->isEmpty())
        <div class="text-center py-16 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">Belum ada berita di kategori ini.</p>
        </div>
        @else
        <div class="space-y-6">
            @foreach($posts as $post)
            <article class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                <a href="{{ route('posts.show', $post->slug) }}" class="flex flex-col md:flex-row">
                    <div class="md:w-72 flex-shrink-0">
                        @if($post->featured_image)
                        <img src="{{ asset($post->featured_image) }}" alt="{{ $post->title }}" class="w-full h-48 md:h-full object-cover">
                        @else
                        <div class="w-full h-48 md:h-full bg-gradient-to-br from-red-500 to-red-700"></div>
                        @endif
                    </div>
                    <div class="flex-1 p-6">
                        <div class="flex items-center text-sm text-gray-500 mb-2">
                            <span>{{ $post->author->name }}</span>
                            <span class="mx-2">•</span>
                            <span>{{ $post->published_at?->format('d M Y') }}</span>
                            <span class="mx-2">•</span>
                            <span>{{ $post->views }} views</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-700 transition">{{ $post->title }}</h3>
                        <p class="text-gray-600 line-clamp-3">{{ $post->excerpt }}</p>
                        <div class="mt-4">
                            <span class="text-red-700 text-sm font-medium hover:underline">Baca Selengkapnya →</span>
                        </div>
                    </div>
                </a>
            </article>
            @endforeach
        </div>

        <div class="mt-8">
            {{ $posts->links() }}
        </div>
        @endif
    </div>
</div>
@endsection
