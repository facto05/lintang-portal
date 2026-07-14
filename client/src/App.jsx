import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/public/Login';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/public/Home';
import PostDetail from './pages/public/PostDetail';
import CategoryArchive from './pages/public/CategoryArchive';
import Search from './pages/public/Search';
import StaticPage from './pages/public/StaticPage';

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <AdminLayout>{children}</AdminLayout>;
}

function Dashboard() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-500">Selamat datang di panel admin LINTANG.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/posts" element={<AdminRoute><div className="bg-white p-6 rounded-lg shadow"><h1 className="text-2xl font-bold">Posts</h1><p className="text-gray-500 mt-2">Coming soon</p></div></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><div className="bg-white p-6 rounded-lg shadow"><h1 className="text-2xl font-bold">Categories</h1><p className="text-gray-500 mt-2">Coming soon</p></div></AdminRoute>} />
        <Route path="/admin/tags" element={<AdminRoute><div className="bg-white p-6 rounded-lg shadow"><h1 className="text-2xl font-bold">Tags</h1><p className="text-gray-500 mt-2">Coming soon</p></div></AdminRoute>} />
        <Route path="/admin/pages" element={<AdminRoute><div className="bg-white p-6 rounded-lg shadow"><h1 className="text-2xl font-bold">Pages</h1><p className="text-gray-500 mt-2">Coming soon</p></div></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><div className="bg-white p-6 rounded-lg shadow"><h1 className="text-2xl font-bold">Users</h1><p className="text-gray-500 mt-2">Coming soon</p></div></AdminRoute>} />

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/categories/:slug" element={<CategoryArchive />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:slug" element={<StaticPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
