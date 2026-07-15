import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useApp } from '@/context/AppContext';
import { useSiteTexts } from '@/hooks/useSiteTexts';

const About = () => {
  const { t, lang } = useApp();
  const { tx } = useSiteTexts();

  const stats = [
    { num: tx('about_stat1_num', '40+', '40+', lang), text: tx('about_stat1_text', 'моделей в каталоге', 'models in catalog', lang) },
    { num: tx('about_stat2_num', '12 000', '12 000', lang), text: tx('about_stat2_text', 'довольных швей', 'happy makers', lang) },
    { num: tx('about_stat3_num', '8', '8', lang), text: tx('about_stat3_text', 'лет с вами', 'years with you', lang) },
    { num: tx('about_stat4_num', '4.9', '4.9', lang), text: tx('about_stat4_text', 'средний рейтинг', 'average rating', lang) },
  ];

  return (
    <Layout>
      <PageHero title={t('О нас', 'About us')} />
      <section className="container py-16 max-w-3xl space-y-6 text-lg leading-relaxed">
        <p>{tx('about_intro_1',
              'Miroviriastudio — это студия лекал и выкроек, созданная швеями для швей. Мы верим, что красивую одежду можно сшить дома, если под рукой есть точная выкройка и понятная инструкция.',
              'Miroviriastudio is a pattern studio created by makers for makers. We believe beautiful clothes can be sewn at home with an accurate pattern and clear instructions.', lang)}</p>
        <p>{tx('about_intro_2',
              'Каждое лекало мы отшиваем сами, проверяем посадку на разных размерах и только потом выкладываем в каталог. Наши курсы помогают освоить шитьё с нуля.',
              'We sew every pattern ourselves, test the fit across sizes, and only then add it to the catalog. Our courses help you learn sewing from scratch.', lang)}</p>
      </section>
      <section className="container pb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center p-6 bg-beige-soft rounded-lg">
            <div className="font-display text-4xl mb-1">{s.num}</div>
            <div className="text-sm text-muted-foreground">{s.text}</div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default About;
