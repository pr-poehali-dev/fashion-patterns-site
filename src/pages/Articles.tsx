import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const Articles = () => {
  const { t } = useApp();

  const articles = [
    { ru: 'Как выбрать ткань для платья', en: 'How to choose fabric for a dress', path: '/articles/fabric-for-dress', tag_ru: 'Материалы', tag_en: 'Materials' },
    { ru: 'Гид по швейным машинам для новичков', en: 'Sewing machines guide for beginners', path: '/articles/sewing-machines', tag_ru: 'Оборудование', tag_en: 'Equipment' },
    { ru: 'Уход за готовыми изделиями', en: 'Caring for finished garments', path: '/articles/garment-care', tag_ru: 'Уход', tag_en: 'Care' },
    { ru: 'Что такое припуски на швы', en: 'What are seam allowances', path: '/articles/seam-allowances', tag_ru: 'Основы', tag_en: 'Basics' },
    { ru: 'Печать выкроек дома: пошагово', en: 'Printing patterns at home: step by step', path: '/articles/printing-patterns', tag_ru: 'Инструкция', tag_en: 'How-to' },
    { ru: 'Подбор размера по таблице мерок', en: 'Choosing a size by measurements', path: '/articles/choosing-size', tag_ru: 'Размеры', tag_en: 'Sizing' },
  ];

  return (
    <Layout>
      <PageHero
        title={t('Статьи', 'Articles')}
        subtitle={t('Полезные материалы для тех, кто шьёт.', 'Useful materials for those who sew.')}
      />
      <section className="container py-16 max-w-2xl divide-y divide-border">
        {articles.map((a) => (
          <Link key={a.path} to={a.path} className="flex items-center justify-between py-5 group">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">
                {t(a.tag_ru, a.tag_en)}
              </span>
              <span className="font-display text-2xl group-hover:opacity-60 transition-opacity">
                {t(a.ru, a.en)}
              </span>
            </div>
            <Icon name="ArrowUpRight" size={20} className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0 ml-4" />
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default Articles;
