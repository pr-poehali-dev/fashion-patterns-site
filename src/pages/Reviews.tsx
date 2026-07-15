import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';
import { useSiteTexts } from '@/hooks/useSiteTexts';
import { CONTENT_URL, Review } from '@/lib/adminApi';

const Reviews = () => {
  const { t, lang } = useApp();
  const { tx } = useSiteTexts();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`${CONTENT_URL}?resource=reviews`)
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHero
        title={t('Отзывы', 'Reviews')}
        subtitle={tx('reviews_subtitle', 'Что говорят те, кто уже шьёт по нашим лекалам.', 'What those who already sew with our patterns say.', lang)}
      />
      <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="border border-border rounded-lg p-6 bg-card">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Icon key={s} name="Star" size={16} className={s < r.stars ? 'fill-foreground' : 'opacity-20'} />
              ))}
            </div>
            <p className="text-sm mb-6">{t(r.textRu, r.textEn)}</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-beige flex items-center justify-center text-sm font-medium">
                {r.name[0]}
              </div>
              <span className="text-sm font-medium">{r.name}</span>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Reviews;
