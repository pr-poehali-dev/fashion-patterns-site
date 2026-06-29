import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const Blog = () => {
  const { t } = useApp();

  const posts = [
    { tag_ru: 'Мода', tag_en: 'Fashion', ru: 'Тренды сезона: тихая роскошь', en: 'Season trends: quiet luxury', date: '24.06.2026' },
    { tag_ru: 'Показы', tag_en: 'Runway', ru: 'Неделя моды в Москве: главное', en: 'Moscow Fashion Week highlights', date: '18.06.2026' },
    { tag_ru: 'Конкурсы', tag_en: 'Contests', ru: 'Конкурс молодых дизайнеров 2026', en: 'Young designers contest 2026', date: '10.06.2026' },
    { tag_ru: 'Мероприятия', tag_en: 'Events', ru: 'Маркет хендмейда: расписание', en: 'Handmade market schedule', date: '02.06.2026' },
    { tag_ru: 'Мода', tag_en: 'Fashion', ru: 'Базовый гардероб своими руками', en: 'A capsule wardrobe by yourself', date: '28.05.2026' },
    { tag_ru: 'Показы', tag_en: 'Runway', ru: 'Как читать коллекции с подиума', en: 'How to read runway collections', date: '20.05.2026' },
  ];

  return (
    <Layout>
      <PageHero
        title={t('Блог', 'Blog')}
        subtitle={t('О моде, мероприятиях, конкурсах и показах — всё самое интересное из мира одежды.',
                    'About fashion, events, contests and runway shows — the best from the world of clothing.')}
      />
      <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <article key={i} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-lg bg-beige flex items-center justify-center mb-4 overflow-hidden">
              <Icon name="Newspaper" size={40} className="opacity-30 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="bg-beige-soft px-2 py-0.5 rounded-full">{t(p.tag_ru, p.tag_en)}</span>
              <span>{p.date}</span>
            </div>
            <h3 className="font-display text-2xl leading-tight group-hover:opacity-60 transition-opacity">{t(p.ru, p.en)}</h3>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Blog;
