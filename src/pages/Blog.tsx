import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';
import { useSiteTexts } from '@/hooks/useSiteTexts';
import { CONTENT_URL, BlogPost } from '@/lib/adminApi';

const Blog = () => {
  const { t, lang } = useApp();
  const { tx } = useSiteTexts();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`${CONTENT_URL}?resource=posts`)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHero
        title={t('Блог', 'Blog')}
        subtitle={tx('blog_subtitle', 'О моде, мероприятиях, конкурсах и показах — всё самое интересное из мира одежды.',
                    'About fashion, events, contests and runway shows — the best from the world of clothing.', lang)}
      />
      <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((p) => (
          <article key={p.id} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-lg bg-beige flex items-center justify-center mb-4 overflow-hidden">
              <Icon name="Newspaper" size={40} className="opacity-30 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="bg-beige-soft px-2 py-0.5 rounded-full">{t(p.tag, p.tagEn)}</span>
              <span>{p.date.slice(0, 10)}</span>
            </div>
            <h3 className="font-display text-2xl leading-tight group-hover:opacity-60 transition-opacity">{t(p.title, p.titleEn)}</h3>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Blog;
