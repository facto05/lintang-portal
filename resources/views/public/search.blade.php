@extends('layouts.public')

@section('title', 'Pencarian')

@section('content')
<div class="bg-gray-50">
    <div class="bg-red-700 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <div class="flex items-center space-x-2 text-sm text-red-200">
                    <a href="{{ route('home') }}" class="hover:text-white">Beranda</a>
                    <span>/</span>
                    <span>Pencarian</span>
                </div>
            </nav>
            <h1 class="text-3xl font-bold">Pencarian</h1>
            <p class="mt-2 text-red-100">Temukan berita yang Anda cari</p>
        </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form method="GET" action="{{ route('search') }}" class="bg-white rounded-lg shadow p-6 mb-8">
            <div class="flex gap-4">
                <input type="text" name="q" value="{{ request('q') }}" placeholder="Masukkan kata kunci..." class="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-red-500 focus:border-red-500">
                <button type="submit" class="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition font-medium">Cari</button>
            </div>
        </form>

        @if(request('q'))
            @if($posts->isNotEmpty())
            <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-900">Hasil Pencarian untuk "{{ request('q') }}"</h2>
                <p class="text-sm text-gray-500">Ditemukan {{ $posts->total() }} berita</p>
            </div>

            <div class="space-y-6">
                @foreach($posts as $post)
                <article class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    <a href="{{ route('posts.show', $post->slug) }}" class="flex flex-col md:flex-row">
                        <div class="md:w-64 flex-shrink-0">
                            @if($post->featured_image)
                            <img src="{{ asset($post->featured_image) }}" alt="{{ $post->title }}" class="w-full h-48 md:h-full object-cover">
                            @else
                            <div class="w-full h-48 md:h-full bg-gradient-to-br from-red-500 to-red-700"></div>
                            @endif
                        </div>
                        <div class="flex-1 p-6">
                            <div class="flex items-center text-sm text-gray-500 mb-2">
                                <span class="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">{{ $post->category->name }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $post->published_at?->format('d M Y') }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $post->views }} views</span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-700 transition">{{ $post->title }}</h3>
                            <p class="text-gray-600 line-clamp-2">{{ $post->excerpt }}</p>
                            <div class="mt-4">
                                <span class="text-red-700 text-sm font-medium">Baca Selengkapnya →</span>
                            </div>
                        </div>
                    </a>
                </article>
                @endforeach
            </div>

            <div class="mt-8">
                {{ $posts->appends(['q' => request('q')])->links() }}
            </div>
            @else
            <div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-gray-600 text-lg">Tidak ditemukan hasil untuk "{{ request('q') }}"</p>
                <p class="text-gray-500 text-sm mt-2">Coba dengan kata kunci yang berbeda</p>
            </div>
            @endif
        @else
        <div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <p class="text-gray-600 text-lg">Masukkan kata kunci untuk mulai mencari</p>
        </div>
        @endif
    </div>
</div>
@endsection
