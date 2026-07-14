import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, archived: 0, categories: 0, tags: 0, views: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/posts/stats'),
      api.get('/categories'),
      api.get('/tags'),
    ]).then(([statsRes, cats, tags]) => {
      const s = statsRes.data;
      setStats({
        total: s.total,
        published: s.published,
        drafts: s.drafts,
        archived: s.archived,
        categories: cats.data.length,
        tags: tags.data.length,
        views: s.views,
      });
    }).finally(() => setLoading(false));

    api.get('/posts/admin?limit=5').then(res => setRecent(res.data.posts));
  }, []);

  const cards = [
    { label: 'Total Post', value: stats.total, color: 'text-black' },
    { label: 'Published', value: stats.published, color: 'text-green-600' },
    { label: 'Draft', value: stats.drafts, color: 'text-gray-600' },
    { label: 'Archived', value: stats.archived, color: 'text-red-600' },
    { label: 'Kategori', value: stats.categories, color: 'text-black' },
    { label: 'Tags', value: stats.tags, color: 'text-black' },
    { label: 'Total Views', value: stats.views, color: 'text-blue-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {cards.map(c => (
              <div key={c.label} className="bg-white rounded-lg shadow p-4">
                <div className={`text-3xl font-bold mb-1 ${c.color}`}>{c.value}</div>
                <div className="text-xs text-gray-500 uppercase">{c.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Post Terbaru</h2>
                <Link to="/admin/posts" className="text-sm text-gray-500 hover:text-black">Lihat semua</Link>
              </div>
              <div className="divide-y">
                {recent.map(post => (
                  <div key={post.id} className="py-3 flex items-center justify-between">
                    <div>
                      <Link to={`/admin/posts/${post.id}`} className="font-medium hover:text-black">{post.title}</Link>
                      <div className="text-xs text-gray-500">{post.category_name || '-'} · {post.status}</div>
                    </div>
                    <span className="text-xs text-gray-400">{post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID') : ''}</span>
                  </div>
                ))}
                {recent.length === 0 && <p className="text-sm text-gray-500 py-3">Belum ada post</p>}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to="/admin/posts/new" className="block bg-black text-white text-center px-4 py-2 rounded-lg text-sm hover:bg-gray-800">Tulis Post Baru</Link>
                <Link to="/admin/categories" className="block border px-4 py-2 rounded-lg text-sm text-center hover:bg-gray-50">Kelola Kategori</Link>
                <Link to="/admin/tags" className="block border px-4 py-2 rounded-lg text-sm text-center hover:bg-gray-50">Kelola Tags</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}