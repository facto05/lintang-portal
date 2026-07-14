import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [posts, setPosts] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get('/posts?limit=12').then(res => {
      if (res.data.posts.length > 0) {
        setFeatured(res.data.posts[0]);
        setPosts(res.data.posts.slice(1));
      }
      setTotalPages(res.data.totalPages);
    });
    api.get('/posts?limit=5&sort=views').then(res => setPopular(res.data.posts));
    api.get('/categories').then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (page > 1) {
      api.get(`/posts?page=${page}&limit=12`).then(res => setPosts(res.data.posts));
    }
  }, [page]);

  return (
    <div>
      {featured && (
        <div className="bg-gradient-to-r from-red-700 to-red-900">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-white mb-6">Berita Utama</h2>
            <Link to={`/posts/${featured.slug}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`h-96 rounded-xl overflow-hidden ${featured.featured_image ? '' : 'bg-gradient-to-br from-red-600 to-red-800'}`}>
                  {featured.featured_image && <img src={featured.featured_image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />}
                </div>
                <div className="text-white">
                  <span className="inline-block px-4 py-2 bg-white/20 text-sm font-medium rounded mb-4">{featured.category_name}</span>
                  <h3 className="text-4xl font-bold mb-4 group-hover:text-red-200 transition">{featured.title}</h3>
                  <p className="text-red-100 text-lg mb-4">{featured.excerpt}</p>
                  <div className="flex items-center text-sm text-red-200">
                    <span>{featured.author_name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(featured.published_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-700">Berita Terbaru</h3>
            <div className="space-y-6">
              {posts.map(post => (
                <article key={post.id} className="flex gap-4 pb-6 border-b border-gray-200 group">
                  <Link to={`/posts/${post.slug}`} className="flex-shrink-0">
                    {post.featured_image ? (
                      <img src={post.featured_image} alt={post.title} className="w-48 h-32 object-cover rounded group-hover:opacity-80 transition" />
                    ) : (
                      <div className="w-48 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded" />
                    )}
                  </Link>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded mb-2">{post.category_name}</span>
                    <Link to={`/posts/${post.slug}`}>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition line-clamp-2">{post.title}</h4>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{post.author_name}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.published_at).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded text-sm ${page === i + 1 ? 'bg-red-700 text-white' : 'bg-white border text-gray-700 hover:bg-red-50'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-700">Kategori</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/categories/${cat.slug}`}
                    className="flex justify-between items-center py-2 border-b border-gray-100 hover:text-red-700 transition">
                    <span className="text-sm font-medium">{cat.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{cat.posts_count}</span>
                  </Link>
                ))}
              </div>
            </div>
            {popular.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-red-700">Berita Populer</h3>
                <div className="space-y-4">
                  {popular.map(post => (
                    <Link key={post.id} to={`/posts/${post.slug}`} className="block group">
                      <div className="flex gap-3">
                        {post.featured_image ? (
                          <img src={post.featured_image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 line-clamp-2">{post.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{new Date(post.published_at).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
