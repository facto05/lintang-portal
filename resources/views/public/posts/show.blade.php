@extends('layouts.public')

@section('title', $post->title)
@section('meta_description', $post->meta_description ?? $post->excerpt)

@section('og_title', $post->meta_title ?: $post->title)
@section('og_description', \Illuminate\Support\Str::limit(strip_tags($post->content), 160))

@section('content')
<div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <article class="lg:col-span-2">
                <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <a href="{{ route('home') }}" class="hover:text-red-700">Beranda</a>
                    <span>/</span>
                    <a href="{{ route('categories.show', $post->category->slug) }}" class="hover:text-red-700">{{ $post->category->name }}</a>
                    <span>/</span>
                    <span class="text-gray-900">{{ \Illuminate\Support\Str::limit($post->title, 50) }}</span>
                </nav>

                <span class="inline-block px-4 py-2 bg-red-100 text-red-700 text-xs font-medium rounded mb-4">
                    {{ $post->category->name }}
                </span>
                
                <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">{{ $post->title }}</h1>
                
                <div class="flex items-center text-sm text-gray-500 mb-6 pb-6 border-b">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {{ substr($post->author->name, 0, 1) }}
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">{{ $post->author->name }}</div>
                            <div class="text-xs">
                                {{ $post->published_at?->format('d F Y, H:i') }} WIB
                                <span class="mx-2">•</span>
                                {{ $post->views }} views
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto flex space-x-2">
                        <button class="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </button>
                        <button class="w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded flex items-center justify-center transition">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </button>
                        <button class="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center transition">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </button>
                    </div>
                </div>

                @if($post->featured_image)
                <figure class="mb-8">
                    <img src="{{ asset($post->featured_image) }}" alt="{{ $post->title }}" class="w-full rounded-lg">
                </figure>
                @endif

                <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {!! $post->content !!}
                </div>

                @if($post->tags->isNotEmpty())
                <div class="mt-8 pt-8 border-t">
                    <h4 class="text-sm font-semibold text-gray-900 mb-3">Tag:</h4>
                    <div class="flex flex-wrap gap-2">
                        @foreach($post->tags as $tag)
                        <span class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-red-100 hover:text-red-700 transition cursor-pointer">
                            #{{ $tag->name }}
                        </span>
                        @endforeach
                    </div>
                </div>
                @endif

                @if($post->pdf_download)
                <div class="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <svg class="w-10 h-10 text-red-600 mr-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                            <div>
                                <div class="font-semibold text-gray-900">Unduh Press Release</div>
                                <div class="text-sm text-gray-600">Format PDF</div>
                            </div>
                        </div>
                        <a href="{{ Storage::url($post->pdfMedia->path ?? '') }}" class="inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            Download
                        </a>
                    </div>
                </div>
                @endif

                @if($relatedPosts->isNotEmpty())
                <div class="mt-12 pt-8 border-t">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Berita Terkait</h3>
                    <div class="grid md:grid-cols-3 gap-6">
                        @foreach($relatedPosts as $related)
                        <a href="{{ route('posts.show', $related->slug) }}" class="block group">
                            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                                @if($related->featured_image)
                                <img src="{{ asset($related->featured_image) }}" alt="{{ $related->title }}" class="w-full h-40 object-cover group-hover:opacity-80 transition">
                                @else
                                <div class="w-full h-40 bg-gradient-to-br from-red-500 to-red-700"></div>
                                @endif
                                <div class="p-4">
                                    <h4 class="font-bold text-gray-900 line-clamp-2 group-hover:text-red-700 transition">{{ $related->title }}</h4>
                                    <p class="mt-2 text-xs text-gray-500">{{ $related->published_at?->format('d M Y') }}</p>
                                </div>
                            </div>
                        </a>
                        @endforeach
                    </div>
                </div>
                @endif
            </article>

            <!-- Sidebar -->
            <aside class="lg:col-span-1">
                <div class="sticky top-24 space-y-6">
                    <!-- Popular Posts -->
                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-700">Berita Populer</h3>
                        <div class="space-y-4">
                            @foreach(\App\Models\Post::where('status', 'published')->where('id', '!=', $post->id)->orderBy('views', 'desc')->limit(5)->get() as $popular)
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
                </div>
            </aside>
        </div>
    </div>
</div>
@endsection
