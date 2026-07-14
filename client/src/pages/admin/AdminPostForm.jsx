import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api';

export default function AdminPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', featured_image: '',
    category_id: '', status: 'draft', tags: []
  });
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data));
    api.get('/tags').then(res => setAllTags(res.data));
  }, []);

  useEffect(() => {
    if (isEdit) {
      api.get(`/posts/admin/${id}`).then(res => {
        setForm({
          title: res.data.title,
          slug: res.data.slug,
          excerpt: res.data.excerpt || '',
          content: res.data.content || '',
          featured_image: res.data.featured_image || '',
          category_id: res.data.category_id || '',
          status: res.data.status,
          tags: res.data.tags?.map(t => t.id) || []
        });
      }).catch(() => navigate('/admin/posts'));
    }
  }, [id, isEdit]);

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Judul wajib diisi';
    else if (form.title.trim().length < 3) e.title = 'Judul minimal 3 karakter';
    else if (form.title.trim().length > 200) e.title = 'Judul maksimal 200 karakter';
    if (form.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug)) e.slug = 'Slug hanya boleh huruf kecil, angka, dan strip';
    if (form.status === 'published' && !form.content.trim()) e.content = 'Konten wajib diisi untuk status published';
    if (form.status === 'published' && !form.category_id) e.category = 'Kategori wajib dipilih untuk status published';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = { ...form };
    if (!payload.slug) payload.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const promise = isEdit ? api.put(`/posts/${id}`, payload) : api.post('/posts', payload);
    promise.then(() => navigate('/admin/posts')).finally(() => setSaving(false));
  }

  function handleDelete() {
    if (!confirm('Yakin hapus post ini?')) return;
    api.delete(`/posts/${id}`).then(() => navigate('/admin/posts'));
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      handleChange('featured_image', res.data.url);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload gagal');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Post' : 'Tulis Post Baru'}</h1>
        <div className="flex gap-2">
          <Link to="/admin/posts" className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Batal</Link>
          {isEdit && <button onClick={handleDelete} className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-50">Hapus</button>}
          <button onClick={handleSubmit} disabled={saving} className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
              <input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)}
                className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} required />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={e => handleChange('slug', e.target.value)}
                className={`w-full border rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500 ${errors.slug ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
              {errors.slug ? <p className="text-red-500 text-xs mt-1">{errors.slug}</p> : <p className="text-xs text-gray-500 mt-1">Kosongkan untuk generate otomatis dari judul</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea value={form.excerpt} onChange={e => handleChange('excerpt', e.target.value)} rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konten (HTML)</label>
              <textarea value={form.content} onChange={e => handleChange('content', e.target.value)} rows={20}
                className={`w-full border rounded px-3 py-2 text-sm font-mono focus:ring-gray-500 focus:border-gray-500 ${errors.content ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
              {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            </div>
          </div>

          <div className="space-y-6 border-l pl-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
                <span className="text-sm text-gray-500">{uploading ? 'Mengupload...' : 'Klik untuk upload gambar'}</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
              {form.featured_image && (
                <div className="relative mt-2">
                  <img src={form.featured_image} alt="Preview" className="max-h-48 rounded" />
                  <button type="button" onClick={() => handleChange('featured_image', '')}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/80">&times;</button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select value={form.category_id} onChange={e => handleChange('category_id', e.target.value)}
                className={`w-full border rounded px-3 py-2 text-sm ${errors.category ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}>
                <option value="">- Pilih Kategori -</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => handleChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-2">
                {allTags.map(tag => (
                  <label key={tag.id} className="flex items-center space-x-1">
                    <input type="checkbox" value={tag.id}
                      checked={form.tags.includes(tag.id)}
                      onChange={e => handleChange('tags', e.target.checked
                        ? [...form.tags, tag.id] : form.tags.filter(t => t !== tag.id))} />
                    <span className="text-sm">{tag.name} <span className="text-gray-400">({tag.tag_type})</span></span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}