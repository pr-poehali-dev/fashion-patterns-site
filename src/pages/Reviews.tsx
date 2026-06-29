import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const Reviews = () => {
  const { t } = useApp();

  const reviews = [
    { name: 'Анна К.', stars: 5, ru: 'Выкройка села идеально, инструкция очень подробная. Сшила платье за вечер!', en: 'The pattern fit perfectly, very detailed instructions. Made a dress in one evening!' },
    { name: 'Мария Л.', stars: 5, ru: 'Заказываю уже третий раз. Качество лекал на высоте, всё понятно даже новичку.', en: 'Ordering for the third time. Great pattern quality, clear even for a beginner.' },
    { name: 'Ольга В.', stars: 5, ru: 'Курсы — отдельная любовь. Наконец-то поняла, как втачивать рукав без складок.', en: 'The courses are a separate love. Finally learned to set a sleeve without folds.' },
    { name: 'Екатерина С.', stars: 4, ru: 'Отличный магазин, большой выбор. Хотелось бы ещё больше моделей пальто.', en: 'Great shop, big selection. Would love even more coat models.' },
    { name: 'Дарья М.', stars: 5, ru: 'Шью на заказ, эти лекала — основа моей работы. Спасибо за качество!', en: 'I sew to order, these patterns are the base of my work. Thanks for the quality!' },
    { name: 'Ирина П.', stars: 5, ru: 'Быстрая доставка файлов, всё печатается без проблем. Рекомендую!', en: 'Fast file delivery, prints without issues. Recommend!' },
  ];

  return (
    <Layout>
      <PageHero
        title={t('Отзывы', 'Reviews')}
        subtitle={t('Что говорят те, кто уже шьёт по нашим лекалам.', 'What those who already sew with our patterns say.')}
      />
      <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="border border-border rounded-lg p-6 bg-card">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Icon key={s} name="Star" size={16} className={s < r.stars ? 'fill-foreground' : 'opacity-20'} />
              ))}
            </div>
            <p className="text-sm mb-6">{t(r.ru, r.en)}</p>
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
