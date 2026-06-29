import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const Articles = () => {
  const { t } = useApp();

  const articles = [
    { ru: 'Как выбрать ткань для платья', en: 'How to choose fabric for a dress' },
    { ru: 'Гид по швейным машинам для новичков', en: 'Sewing machines guide for beginners' },
    { ru: 'Уход за готовыми изделиями', en: 'Caring for finished garments' },
    { ru: 'Что такое припуски на швы', en: 'What are seam allowances' },
    { ru: 'Печать выкроек дома: пошагово', en: 'Printing patterns at home: step by step' },
    { ru: 'Подбор размера по таблице мерок', en: 'Choosing a size by measurements' },
  ];

  return (
    <Layout>
      <PageHero
        title={t('Статьи', 'Articles')}
        subtitle={t('Полезные материалы для тех, кто шьёт.', 'Useful materials for those who sew.')}
      />
      <section className="container py-16 max-w-2xl divide-y divide-border">
        {articles.map((a, i) => (
          <a key={i} href="#" className="flex items-center justify-between py-5 group">
            <span className="font-display text-2xl group-hover:opacity-60 transition-opacity">{t(a.ru, a.en)}</span>
            <Icon name="ArrowUpRight" size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </section>
    </Layout>
  );
};

export default Articles;
