import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const Payment = () => {
  const { t } = useApp();

  const steps = [
    { ru: 'Выберите выкройки и добавьте их в корзину.', en: 'Choose patterns and add them to the cart.' },
    { ru: 'На оформлении выберите способ «Оплата иностранной картой».', en: 'At checkout, select "Pay with a foreign card".' },
    { ru: 'Вы перейдёте к защищённому платёжному сервису-партнёру.', en: 'You will be redirected to a secure partner payment service.' },
    { ru: 'Введите данные карты Visa / Mastercard любой страны.', en: 'Enter Visa / Mastercard details from any country.' },
    { ru: 'Файлы выкроек придут на вашу почту сразу после оплаты.', en: 'Pattern files arrive in your email right after payment.' },
  ];

  return (
    <Layout>
      <PageHero
        title={t('Оплата иностранной картой', 'Pay with a foreign card')}
        subtitle={t('Принимаем карты, выпущенные за пределами России. Это просто и безопасно.',
                    'We accept cards issued outside Russia. It is simple and secure.')}
      />
      <section className="container py-16 max-w-2xl">
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm">{i + 1}</span>
              <p className="pt-1.5">{t(s.ru, s.en)}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 p-6 bg-beige-soft rounded-lg flex gap-3 text-sm">
          <Icon name="ShieldCheck" size={20} className="shrink-0" />
          <p>{t('Мы не храним данные вашей карты — все платежи проходят через сертифицированного партнёра.',
                'We do not store your card data — all payments go through a certified partner.')}</p>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
