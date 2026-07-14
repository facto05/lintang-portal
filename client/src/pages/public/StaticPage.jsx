import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

const pageTitles = {
  'profil': 'Profil LINTANG',
  'struktur-organisasi': 'Struktur Organisasi',
  'kontak': 'Kontak',
  'faq': 'FAQ',
  'pengaduan': 'Pengaduan',
};

export default function StaticPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/pages/${slug}`).then(res => {
      setPage(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-16 text-gray-500">Loading...</div>;
  if (!page) return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-500">Halaman tidak ditemukan</p>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{page.title}</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </div>
  );
}
