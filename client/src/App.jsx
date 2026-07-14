import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/public/Login';
import AdminLayout from './layouts/AdminLayout';

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
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}
