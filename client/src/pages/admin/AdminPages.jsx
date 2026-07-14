import { useState, useEffect } from 'react';
import api from '../../api';

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', page_type: 'other', meta_title: '', meta_description: '', is_active: true });
  const [errors, setErrors] = useState({});

  useEffect(() => { load(); }, []);

  function load() {
    api.get('/pages/admin').then(res => setPages(res.data));
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', slug: '', content: '', page_type: 'other', meta_title: '', meta_description: '', is_active: true });
    setErrors({});
    setShowForm(true);
  }

  function openEdit(page) {
    setEditing(page);
    setForm({
      title: page.title, slug: page.slug, content: page.content || '',
      page_type: page.page_type, meta_title: page.meta_title || '',
      meta_description: page.meta_description || '', is_active: page.is_active
    });
    setErrors({});
    setShowForm(true);
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Judul wajib diisi';
    else if (form.title.trim().length > 200) e.title = 'Judul maksimal 200 karakter';
    if (form.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug)) e.slug = 'Slug hanya boleh huruf kecil, angka, dan strip';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const promise = editing
      ? api.put(`/pages/${editing.id}`, form)
      : api.post('/pages', form);
    promise.then(() => { setShowForm(false); load(); });
  }

  function handleDelete(id) {
    if (!confirm('Hapus halaman ini?')) return;
    api.delete(`/pages/${id}`).then(() => load());
  }

  function typeBadge(type) {
    const labels = { about: 'Tentang', contact: 'Kontak', faq: 'FAQ', other: 'Lainnya' };
    return <span className="px-2 py-1 text-xs rounded bg-gray-100">{labels[type] || type}</span>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Halaman</h1>
        <button onClick={openCreate} className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">Tambah Halaman</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{editing ? 'Edit Halaman' : 'Tambah Halaman'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
                <input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" value={form.slug} onChange={e => handleChange('slug', e.target.value)}
                  className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.slug ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                  <select value={form.page_type} onChange={e => handleChange('page_type', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="about">Tentang</option>
                    <option value="contact">Kontak</option>
                    <option value="faq">FAQ</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.is_active ? '1' : '0'} onChange={e => handleChange('is_active', e.target.value === '1')}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="1">Aktif</option>
                    <option value="0">Nonaktif</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konten (HTML)</label>
                <textarea value={form.content} onChange={e => handleChange('content', e.target.value)} rows={12}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:ring-gray-500 focus:border-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input type="text" value={form.meta_title} onChange={e => handleChange('meta_title', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea value={form.meta_description} onChange={e => handleChange('meta_description', e.target.value)} rows={2}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500" />
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
              <th className="text-left px-4 py-3 font-medium text-gray-600">Judul</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Tipe</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{page.title}</td>
                <td className="px-4 py-3 text-gray-500">{page.slug}</td>
                <td className="px-4 py-3">{typeBadge(page.page_type)}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded ${page.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {page.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(page)} className="text-gray-600 hover:text-black">Edit</button>
                  <button onClick={() => handleDelete(page.id)} className="text-red-600 hover:text-red-800">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length === 0 && <p className="text-center py-8 text-gray-500">Belum ada halaman</p>}
      </div>
    </div>
  );
}
