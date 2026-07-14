import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${slug}`).then(res => {
      setPost(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-16 text-gray-500">Loading...</div>;
  if (!post) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-500">Halaman tidak ditemukan</p>
      <Link to="/" className="text-black hover:underline mt-4 block">Kembali ke Beranda</Link>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-black">Beranda</Link>
              {post.category_slug && (
                <>
                  <span className="mx-2">/</span>
                  <Link to={`/categories/${post.category_slug}`} className="hover:text-black">{post.category_name}</Link>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-gray-900">{post.title?.substring(0, 50)}</span>
            </nav>

            {post.category_name && (
              <span className="inline-block px-4 py-2 bg-gray-100 text-black text-xs font-medium rounded mb-4">{post.category_name}</span>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-6 pb-6 border-b">
              <span className="font-medium text-gray-900">{post.author_name}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.published_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="mx-2">•</span>
              <span>{post.views} views</span>
            </div>

            {post.featured_image && (
              <figure className="mb-8">
                <img src={post.featured_image} alt={post.title} className="w-full rounded-lg" />
              </figure>
            )}

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

            {post.tags?.length > 0 && (
              <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag.id} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">#{tag.name}</span>
                ))}
              </div>
            )}
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              {post.relatedPosts?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-black">Berita Terkait</h3>
                  <div className="space-y-4">
                    {post.relatedPosts.map(related => (
                      <Link key={related.id} to={`/posts/${related.slug}`} className="block group">
                        <div className="flex gap-3">
                          {related.featured_image ? (
                            <img src={related.featured_image} alt={related.title} className="w-20 h-20 object-cover rounded" />
                          ) : (
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-black rounded flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-black line-clamp-2">{related.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{new Date(related.published_at).toLocaleDateString('id-ID')}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
