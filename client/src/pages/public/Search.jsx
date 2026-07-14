import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const q = searchParams.get('q') || '';

  useEffect(() => {
    if (q) {
      setLoading(true);
      api.get(`/posts?search=${encodeURIComponent(q)}`).then(res => {
        setResults(res.data.posts);
        setTotal(res.data.total);
        setLoading(false);
      });
    }
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchParams({ q: formData.get('q') });
  };

  return (
    <div>
      <div className="bg-red-700 text-white py-8">
        <nav className="max-w-7xl mx-auto px-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-red-200">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <span>/</span>
            <span>Pencarian</span>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Pencarian</h1>
          <p className="mt-2 text-red-100">Temukan berita yang Anda cari</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex gap-4">
            <input type="text" name="q" defaultValue={q} placeholder="Masukkan kata kunci..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-red-500 focus:border-red-500" />
            <button type="submit" className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition font-medium">Cari</button>
          </div>
        </form>

        {loading && <p className="text-center text-gray-500 py-8">Mencari...</p>}

        {!loading && q && results.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border">
            <p className="text-gray-600 text-lg">Tidak ditemukan hasil untuk "{q}"</p>
            <p className="text-gray-500 text-sm mt-2">Coba dengan kata kunci yang berbeda</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Ditemukan {total} hasil untuk "{q}"</p>
            </div>
            <div className="space-y-6">
              {results.map(post => (
                <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <Link to={`/posts/${post.slug}`} className="flex flex-col md:flex-row">
                    <div className="md:w-64 flex-shrink-0">
                      {post.featured_image ? (
                        <img src={post.featured_image} alt={post.title} className="w-full h-48 md:h-full object-cover" />
                      ) : (
                        <div className="w-full h-48 md:h-full bg-gradient-to-br from-red-500 to-red-700" />
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">{post.category_name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.published_at).toLocaleDateString('id-ID')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-700 transition">{post.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && !q && (
          <div className="text-center py-16 bg-white rounded-lg border">
            <p className="text-gray-600 text-lg">Masukkan kata kunci untuk mulai mencari</p>
          </div>
        )}
      </div>
    </div>
  );
}
