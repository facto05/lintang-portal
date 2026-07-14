import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/posts', label: 'Posts', icon: '📰' },
  { path: '/admin/categories', label: 'Kategori', icon: '📁' },
  { path: '/admin/tags', label: 'Tags', icon: '🏷️' },
  { path: '/admin/pages', label: 'Halaman', icon: '📄' },
  { path: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-700 rounded flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-bold">LINTANG Admin</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition ${
                location.pathname.startsWith(item.path) ? 'bg-red-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <span className="text-sm text-gray-500">Selamat datang, {user?.name}</span>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-700">Logout</button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
