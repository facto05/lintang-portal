@extends('layouts.admin')

@section('title', 'Edit User')

@section('content')
<div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit User</h1>

    <form method="POST" action="{{ route('admin.users.update', $user) }}" class="space-y-6 bg-white shadow rounded-lg p-6">
        @csrf
        @method('PUT')

        <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value="{{ old('name', $user->name) }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('name')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value="{{ old('email', $user->email) }}" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('email')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Password <span class="text-gray-400 font-normal">(leave empty to keep current)</span></label>
            <input type="password" name="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('password')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                <option value="admin" {{ old('role', $user->role) == 'admin' ? 'selected' : '' }}>Admin</option>
                <option value="editor" {{ old('role', $user->role) == 'editor' ? 'selected' : '' }}>Editor</option>
                <option value="author" {{ old('role', $user->role) == 'author' ? 'selected' : '' }}>Author</option>
            </select>
            @error('role')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <input type="text" name="department" value="{{ old('department', $user->department) }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
            @error('department')<p class="mt-1 text-sm text-red-600">{{ $message }}</p>@enderror
        </div>

        <div>
            <label class="flex items-center">
                <input type="checkbox" name="is_active" value="1" {{ old('is_active', $user->is_active) ? 'checked' : '' }} class="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500">
                <span class="ml-2 block text-sm text-gray-900">Active</span>
            </label>
        </div>

        <div class="flex gap-4">
            <button type="submit" class="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">Update User</button>
            <a href="{{ route('admin.users.index') }}" class="bg-white text-gray-700 px-6 py-2 rounded border hover:bg-gray-50">Cancel</a>
        </div>
    </form>
</div>
@endsection
