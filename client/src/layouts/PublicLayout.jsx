import { Link, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function PublicLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/profil', label: 'Profil' },
    { path: '/struktur-organisasi', label: 'Struktur Organisasi' },
    { path: '/kontak', label: 'Kontak' },
    { path: '/faq', label: 'FAQ' },
    { path: '/pengaduan', label: 'Pengaduan' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black text-white py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <span>Lembaga Investigasi Negara Kota Tangerang</span>
          <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <div className="text-xl font-bold text-black">LINTANG</div>
                <div className="text-xs text-gray-600">Kota Tangerang</div>
              </div>
            </Link>
            <form action="/search" method="GET" className="hidden lg:block">
              <input type="text" name="q" placeholder="Cari berita..." className="border border-gray-300 rounded px-4 py-2 text-sm w-64" />
            </form>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          <nav className="border-t hidden lg:block">
            <div className="flex items-center space-x-8 text-sm">
              {navItems.map(item => (
                <Link key={item.path} to={item.path}
                  className={`py-4 border-b-2 transition ${
                    isActive(item.path)
                      ? 'border-black text-black font-medium'
                      : 'border-transparent hover:border-black hover:text-black text-gray-700'
                  }`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
          {menuOpen && (
            <div className="lg:hidden border-t py-4 space-y-2">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 rounded text-sm ${
                    isActive(item.path) ? 'bg-gray-50 text-black font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="min-h-screen"><Outlet /></main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <div className="text-xl font-bold">LINTANG</div>
                  <div className="text-sm text-gray-400">Kota Tangerang</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lembaga Investigasi Negara Kota Tangerang. Portal berita resmi untuk transparansi dan akuntabilitas informasi publik.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Halaman</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {navItems.filter(i => i.path !== '/').map(item => (
                  <li key={item.path}><Link to={item.path} className="hover:text-gray-500">{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Kontak</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Kantor LINTANG</li>
                <li>Kota Tangerang, Banten</li>
                <li>Email: info@lintang.go.id</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Lembaga Investigasi Negara Kota Tangerang
          </div>
        </div>
      </footer>
    </div>
  );
}
