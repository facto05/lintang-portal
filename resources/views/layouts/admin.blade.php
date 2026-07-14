<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') - LINTANG</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">
    <div class="min-h-screen">
        <div class="bg-red-700 text-white text-xs py-1">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">Admin Panel - LINTANG Kota Tangerang</div>
        </div>
        <nav class="bg-white border-b shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <a href="{{ route('admin.dashboard') }}" class="flex items-center space-x-2">
                                <img src="/images/logo-lintang-icon.svg" alt="LINTANG" class="w-8 h-8">
                                <span class="text-lg font-bold text-red-700">LINTANG Admin</span>
                            </a>
                        </div>
                        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a href="{{ route('admin.dashboard') }}" class="border-transparent text-gray-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</a>
                            <a href="{{ route('admin.posts.index') }}" class="border-transparent text-gray-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Posts</a>
                            <a href="{{ route('admin.categories.index') }}" class="border-transparent text-gray-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Categories</a>
                            <a href="{{ route('admin.tags.index') }}" class="border-transparent text-gray-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Tags</a>
                            <a href="{{ route('admin.pages.index') }}" class="border-transparent text-gray-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Pages</a>
                            <a href="{{ route('admin.users.index') }}" class="border-transparent text-gray-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Users</a>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-700 mr-4">{{ auth()->user()->name }}</span>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="text-sm text-gray-500 hover:text-red-700">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>

        <main class="py-10">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                @if(session('success'))
                    <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {{ session('success') }}
                    </div>
                @endif
                @if(session('error'))
                    <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {{ session('error') }}
                    </div>
                @endif
                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>
