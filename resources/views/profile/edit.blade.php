@extends('layouts.admin')

@section('title', 'My Profile')

@section('content')
<div class="max-w-2xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
    
    <!-- Info -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
        <div class="space-y-3 text-sm">
            <div><span class="text-gray-500">Name:</span> <span class="font-medium">{{ auth()->user()->name }}</span></div>
            <div><span class="text-gray-500">Email:</span> <span class="font-medium">{{ auth()->user()->email }}</span></div>
            <div><span class="text-gray-500">Role:</span> <span class="font-medium uppercase">{{ auth()->user()->role }}</span></div>
            <div><span class="text-gray-500">Department:</span> <span class="font-medium">{{ auth()->user()->department ?: '-' }}</span></div>
        </div>
    </div>

    <!-- Update Name -->
    <form method="POST" action="{{ route('profile.update') }}" class="bg-white shadow rounded-lg p-6 mb-6">
        @csrf
        @method('PATCH')
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Update Profile</h2>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value="{{ old('name', auth()->user()->name) }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                @error('name')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value="{{ old('email', auth()->user()->email) }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                @error('email')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
            </div>
            <button type="submit" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Save Changes</button>
        </div>
    </form>

    <!-- Change Password -->
    <form method="POST" action="{{ route('password.update') }}" class="bg-white shadow rounded-lg p-6">
        @csrf
        @method('PUT')
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" name="current_password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                @error('current_password')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" name="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                @error('password')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="password_confirmation" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            </div>
            <button type="submit" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Update Password</button>
        </div>
    </form>
</div>
@endsection
