@extends('layouts.public')

@section('title', 'Beranda')

@section('content')
<div class="bg-white">
    @if($posts->isEmpty())
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p class="text-gray-500 text-lg">Belum ada berita yang dipublikasikan.</p>
        </div>
    @else
        @php $featured = $posts->first(); @endphp
        
        <!-- Hero/Featured News -->
        <div class="bg-gradient-to-r from-red-700 to-red-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 class="text-2xl font-bold text-white mb-6">Berita Utama</h2>
                <a href="{{ route('posts.show', $featured->slug) }}" class="block group">
                    <div class="grid md:grid-cols-2 gap-8 items-center">
                        <div class="relative rounded-xl overflow-hidden h-96 bg-black/20">
                            @if($featured->featured_image)
                            <img src="{{ asset($featured->featured_image) }}" alt="{{ $featured->title }}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                            @else
                            <div class="w-full h-full bg-gradient-to-br from-red-600 to-red-800"></div>
                            @endif
                        </div>
                        <div class="text-white">
                            <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded mb-4">
                                {{ $featured->category->name }}
                            </span>
                            <h3 class="text-4xl font-bold mb-4 group-hover:text-red-200 transition">{{ $featured->title }}</h3>
                            <p class="text-red-100 text-lg mb-4 leading-relaxed">{{ $featured->excerpt }}</p>
                            <div class="flex items-center text-sm text-red-200">
                                <span>{{ $featured->author->name }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $featured->published_at?->format('d M Y') }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $featured->views }} views</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>

        <!-- Latest News Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-700">Berita Terbaru</h3>
                    <div class="space-y-6">
                        @foreach($posts->slice(1) as $post)
                        <article class="flex gap-4 pb-6 border-b border-gray-200 last:border-0 group">
                            <a href="{{ route('posts.show', $post->slug) }}" class="flex-shrink-0">
                                @if($post->featured_image)
                                <img src="{{ asset($post->featured_image) }}" alt="{{ $post->title }}" class="w-48 h-32 object-cover rounded group-hover:opacity-80 transition">
                                @else
                                <div class="w-48 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded"></div>
                                @endif
                            </a>
                            <div class="flex-1">
                                <span class="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded mb-2">
                                    {{ $post->category->name }}
                                </span>
                                <a href="{{ route('posts.show', $post->slug) }}">
                                    <h4 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition line-clamp-2">{{ $post->title }}</h4>
                                </a>
                                <p class="text-gray-600 text-sm line-clamp-2 mb-3">{{ $post->excerpt }}</p>
                                <div class="flex items-center text-xs text-gray-500">
                                    <span>{{ $post->author->name }}</span>
                                    <span class="mx-2">•</span>
                                    <span>{{ $post->published_at?->format('d M Y') }}</span>
                                    <span class="mx-2">•</span>
                                    <span>{{ $post->views }} views</span>
                                </div>
                            </div>
                        </article>
                        @endforeach
                    </div>

                    <div class="mt-8">
                        {{ $posts->links() }}
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Popular Posts -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-700">Berita Populer</h3>
                        <div class="space-y-4">
                            @foreach(\App\Models\Post::where('status', 'published')->orderBy('views', 'desc')->limit(5)->get() as $popular)
                            <a href="{{ route('posts.show', $popular->slug) }}" class="block group">
                                <div class="flex gap-3">
                                    @if($popular->featured_image)
                                    <img src="{{ asset($popular->featured_image) }}" alt="{{ $popular->title }}" class="w-20 h-20 object-cover rounded">
                                    @else
                                    <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded flex-shrink-0"></div>
                                    @endif
                                    <div class="flex-1 min-w-0">
                                        <h4 class="text-sm font-semibold text-gray-900 group-hover:text-red-700 line-clamp-2">{{ $popular->title }}</h4>
                                        <p class="text-xs text-gray-500 mt-1">{{ $popular->published_at?->format('d M Y') }}</p>
                                    </div>
                                </div>
                            </a>
                            @endforeach
                        </div>
                    </div>

                    <!-- Categories -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-700">Kategori</h3>
                        <div class="space-y-2">
                            @foreach(\App\Models\Category::withCount('posts')->get() as $cat)
                            <a href="{{ route('categories.show', $cat->slug) }}" class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 hover:text-red-700 transition">
                                <span class="text-sm font-medium">{{ $cat->name }}</span>
                                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ $cat->posts_count }}</span>
                            </a>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>
@endsection
