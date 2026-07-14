@extends('layouts.public')

@section('title', '404 - Halaman Tidak Ditemukan')

@section('content')
<div class="bg-white min-h-[60vh] flex items-center justify-center">
    <div class="text-center px-4">
        <div class="text-9xl font-bold text-red-700 mb-4">404</div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
        <p class="text-gray-500 mb-8">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <div class="flex gap-4 justify-center">
            <a href="{{ route('home') }}" class="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition">Kembali ke Beranda</a>
            <a href="{{ route('search') }}" class="bg-white text-gray-700 px-6 py-3 rounded-lg border hover:bg-gray-50 transition">Cari Berita</a>
        </div>
    </div>
</div>
@endsection
