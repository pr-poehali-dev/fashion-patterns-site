import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useApp } from '@/context/AppContext';

const Cookies = () => {
  const { t } = useApp();

  const blocks = [
    { h_ru: '1. Что такое cookie', h_en: '1. What are cookies', ru: 'Cookie — небольшие файлы, которые сайт сохраняет в вашем браузере, чтобы запоминать настройки и корзину.', en: 'Cookies are small files a website stores in your browser to remember settings and your cart.' },
    { h_ru: '2. Зачем мы их используем', h_en: '2. Why we use them', ru: 'Для работы корзины, сохранения языка интерфейса и анализа посещаемости сайта.', en: 'To run the cart, remember the interface language and analyze site traffic.' },
    { h_ru: '3. Управление cookie', h_en: '3. Managing cookies', ru: 'Вы можете отключить cookie в настройках браузера, однако часть функций сайта может работать некорректно.', en: 'You can disable cookies in your browser settings, but some site features may not work properly.' },
    { h_ru: '4. Согласие', h_en: '4. Consent', ru: 'Продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie в соответствии с настоящим соглашением.', en: 'By continuing to use the site, you agree to the use of cookies under this agreement.' },
  ];

  return (
    <Layout>
      <PageHero title={t('Соглашение об использовании cookie', 'Cookie Agreement')} />
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

export default Cookies;
