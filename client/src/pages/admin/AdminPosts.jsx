import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { load(); }, [page, search, statusFilter]);

  function load() {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 10 });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    api.get(`/posts/admin?${params}`).then(res => {
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    });
  }

  function handleDelete(id) {
    if (!confirm('Hapus post ini?')) return;
    setDeletingId(id);
    api.delete(`/posts/${id}`).then(() => {
      setPosts(posts.filter(p => p.id !== id));
      setDeletingId(null);
    });
  }

  function statusBadge(status) {
    const colors = { published: 'bg-green-100 text-green-700', draft: 'bg-gray-100 text-gray-700', archived: 'bg-red-100 text-red-700' };
    return <span className={`px-2 py-1 text-xs rounded ${colors[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <Link to="/admin/posts/new" className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">Tulis Post Baru</Link>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <input type="text" placeholder="Cari judul..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500" />
        </div>
        <div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-12">#</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Judul</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Kategori</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Penulis</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-32">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post, i) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{(page - 1) * 10 + i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-gray-400">{post.slug}</div>
                </td>
                <td className="px-4 py-3">{post.category_name || '-'}</td>
                <td className="px-4 py-3 text-center">{statusBadge(post.status)}</td>
                <td className="px-4 py-3">{post.author_name || '-'}</td>
                <td className="px-4 py-3">{post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID') : '-'}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link to={`/admin/posts/${post.id}`} className="text-gray-600 hover:text-black">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} disabled={deletingId === post.id}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50">{deletingId === post.id ? '...' : 'Hapus'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="text-center py-8 text-gray-500">Belum ada post</p>}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-2 border rounded text-sm disabled:opacity-50">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`px-4 py-2 rounded text-sm ${page === p ? 'bg-black text-white' : 'border text-gray-700 hover:bg-gray-50'}`}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-3 py-2 border rounded text-sm disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}