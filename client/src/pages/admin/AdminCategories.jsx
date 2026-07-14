import { useState, useEffect } from 'react';
import api from '../../api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', type: 'general', description: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => { load(); }, []);

  function load() {
    api.get('/categories').then(res => setCategories(res.data));
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: '', slug: '', type: 'general', description: '' });
    setErrors({});
    setShowForm(true);
  }

  function openEdit(cat) {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, type: cat.type, description: cat.description || '' });
    setErrors({});
    setShowForm(true);
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    else if (form.name.trim().length > 100) e.name = 'Nama maksimal 100 karakter';
    if (form.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug)) e.slug = 'Slug hanya boleh huruf kecil, angka, dan strip';
    if (form.description && form.description.length > 500) e.description = 'Deskripsi maksimal 500 karakter';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const promise = editing
      ? api.put(`/categories/${editing.id}`, form)
      : api.post('/categories', form);
    promise.then(() => { setShowForm(false); load(); });
  }

  function handleDelete(id) {
    if (!confirm('Hapus kategori ini?')) return;
    api.delete(`/categories/${id}`).then(() => load());
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kategori</h1>
        <button onClick={openCreate} className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">Tambah Kategori</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{editing ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} required />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" value={form.slug} onChange={e => handleChange('slug', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.slug ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                <select value={form.type} onChange={e => handleChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="general">Umum</option>
                  <option value="investigation">Investigasi</option>
                  <option value="activity">Kegiatan</option>
                  <option value="policy">Kebijakan</option>
                  <option value="press_release">Press Release</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea value={form.description} onChange={e => handleChange('description', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} rows={3} />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Nama</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tipe</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Post</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                <td className="px-4 py-3">{cat.type}</td>
                <td className="px-4 py-3 text-center">{cat.posts_count}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(cat)} className="text-gray-600 hover:text-black">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p className="text-center py-8 text-gray-500">Belum ada kategori</p>}
      </div>
    </div>
  );
}
