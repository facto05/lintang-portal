@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')
<div class="space-y-6">
    <div class="bg-red-700 rounded-lg p-6 text-white">
        <div class="flex items-center space-x-4">
            <img src="/images/logo-lintang-icon.svg" alt="LINTANG" class="w-12 h-12">
            <div>
                <h1 class="text-3xl font-bold">Dashboard</h1>
                <p class="text-red-100 mt-1">Selamat datang, {{ auth()->user()->name }}</p>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-700">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-1">
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                        <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ $totalPosts }}</dd>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-600">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-1">
                        <dt class="text-sm font-medium text-gray-500 truncate">Published</dt>
                        <dd class="mt-1 text-3xl font-semibold text-green-600">{{ $publishedPosts }}</dd>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-1">
                        <dt class="text-sm font-medium text-gray-500 truncate">Drafts</dt>
                        <dd class="mt-1 text-3xl font-semibold text-yellow-600">{{ $draftPosts }}</dd>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-600">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-1">
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                        <dd class="mt-1 text-3xl font-semibold text-blue-600">{{ $totalViews }}</dd>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-700">Recent Activity</h3>
            <div class="flow-root">
                <ul role="list" class="-mb-8">
                    @forelse($recentLogs as $log)
                    <li>
                        <div class="relative pb-8">
                            <div class="relative flex space-x-3">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm text-gray-500">
                                        <span class="font-medium text-gray-900">{{ $log->user->name ?? 'System' }}</span>
                                        {{ $log->action }} {{ $log->model_type }}
                                        <span class="text-gray-400">{{ $log->created_at->diffForHumans() }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                    @empty
                    <li class="text-center py-4 text-gray-500">No recent activity</li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection
