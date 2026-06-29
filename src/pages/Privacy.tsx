import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useApp } from '@/context/AppContext';

const Privacy = () => {
  const { t } = useApp();

  const blocks = [
    { h_ru: '1. Общие положения', h_en: '1. General', ru: 'Настоящая Политика описывает, как Miroviriastudio собирает, использует и защищает персональные данные пользователей сайта.', en: 'This Policy describes how Miroviriastudio collects, uses and protects users\u2019 personal data.' },
    { h_ru: '2. Какие данные мы собираем', h_en: '2. Data we collect', ru: 'Имя, адрес электронной почты, номер телефона и историю заказов — только то, что необходимо для оформления и доставки выкроек.', en: 'Name, email, phone and order history — only what is needed to process and deliver patterns.' },
    { h_ru: '3. Использование данных', h_en: '3. Use of data', ru: 'Данные используются для обработки заказов, поддержки и информирования о новинках (с вашего согласия).', en: 'Data is used to process orders, provide support and inform about news (with your consent).' },
    { h_ru: '4. Защита данных', h_en: '4. Data protection', ru: 'Мы применяем технические и организационные меры для защиты ваших данных от несанкционированного доступа.', en: 'We apply technical and organizational measures to protect your data from unauthorized access.' },
  ];

  return (
    <Layout>
      <PageHero title={t('Политика конфиденциальности', 'Privacy Policy')} />
      <section className="container py-16 max-w-2xl space-y-8">
        {blocks.map((b, i) => (
          <div key={i}>
            <h3 className="font-display text-2xl mb-2">{t(b.h_ru, b.h_en)}</h3>
            <p className="text-muted-foreground">{t(b.ru, b.en)}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Privacy;
