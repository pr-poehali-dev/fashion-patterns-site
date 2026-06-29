import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useApp } from '@/context/AppContext';

const About = () => {
  const { t } = useApp();

  const stats = [
    { num: '40+', ru: 'моделей в каталоге', en: 'models in catalog' },
    { num: '12 000', ru: 'довольных швей', en: 'happy makers' },
    { num: '8', ru: 'лет с вами', en: 'years with you' },
    { num: '4.9', ru: 'средний рейтинг', en: 'average rating' },
  ];

  return (
    <Layout>
      <PageHero title={t('О нас', 'About us')} />
      <section className="container py-16 max-w-3xl space-y-6 text-lg leading-relaxed">
        <p>{t('Miroviriastudio — это студия лекал и выкроек, созданная швеями для швей. Мы верим, что красивую одежду можно сшить дома, если под рукой есть точная выкройка и понятная инструкция.',
              'Miroviriastudio is a pattern studio created by makers for makers. We believe beautiful clothes can be sewn at home with an accurate pattern and clear instructions.')}</p>
        <p>{t('Каждое лекало мы отшиваем сами, проверяем посадку на разных размерах и только потом выкладываем в каталог. Наши курсы помогают освоить шитьё с нуля.',
              'We sew every pattern ourselves, test the fit across sizes, and only then add it to the catalog. Our courses help you learn sewing from scratch.')}</p>
      </section>
      <section className="container pb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center p-6 bg-beige-soft rounded-lg">
            <div className="font-display text-4xl mb-1">{s.num}</div>
            <div className="text-sm text-muted-foreground">{t(s.ru, s.en)}</div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default About;
