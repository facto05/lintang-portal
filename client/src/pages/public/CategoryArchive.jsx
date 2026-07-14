import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';

export default function CategoryArchive() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/categories/${slug}`).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-16 text-gray-500">Loading...</div>;
  if (!data) return <div className="text-center py-16 text-gray-500">Kategori tidak ditemukan</div>;

  return (
    <div>
      <div className="bg-red-700 text-white py-8">
        <nav className="max-w-7xl mx-auto px-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-red-200">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <span>/</span>
            <span>{data.category.name}</span>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{data.category.name}</h1>
          {data.category.description && <p className="mt-2 text-red-100">{data.category.description}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border">
            <p className="text-gray-500">Belum ada berita di kategori ini.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.posts.map(post => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                <Link to={`/posts/${post.slug}`} className="flex flex-col md:flex-row">
                  <div className="md:w-72 flex-shrink-0">
                    {post.featured_image ? (
                      <img src={post.featured_image} alt={post.title} className="w-full h-48 md:h-full object-cover" />
                    ) : (
                      <div className="w-full h-48 md:h-full bg-gradient-to-br from-red-500 to-red-700" />
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{post.author_name}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.published_at).toLocaleDateString('id-ID')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-700 transition">{post.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4">
                      <span className="text-red-700 text-sm font-medium hover:underline">Baca Selengkapnya →</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
