import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const Footer = () => {
  const { t } = useApp();

  const links = [
    { ru: 'Выкройки', en: 'Patterns', path: '/#catalog' },
    { ru: 'Курсы', en: 'Courses', path: '/courses' },
    { ru: 'Блог', en: 'Blog', path: '/blog' },
    { ru: 'Отзывы', en: 'Reviews', path: '/reviews' },
    { ru: 'О нас', en: 'About', path: '/about' },
    { ru: 'Статьи', en: 'Articles', path: '/articles' },
    { ru: 'Как оплатить иностранной картой', en: 'Pay with foreign card', path: '/payment' },
    { ru: 'Политика конфиденциальности', en: 'Privacy Policy', path: '/privacy' },
    { ru: 'Соглашение об использовании cookie', en: 'Cookie Agreement', path: '/cookies' },
  ];

  const socials = [
    { name: 'ВКонтакте', icon: 'Share2', url: '#' },
    { name: 'Telegram', icon: 'Send', url: '#' },
    { name: 'MAX', icon: 'MessageCircle', url: '#' },
  ];

  return (
    <footer className="bg-beige-soft mt-24 border-t border-border">
      <div className="container py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-semibold tracking-tight">Miroviria</span>
            <span className="text-xs font-medium tracking-tight">studio</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            {t('Лекала и выкройки одежды для домашнего и профессионального шитья.',
               'Clothing patterns for home and professional sewing.')}
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a key={s.name} href={s.url} aria-label={s.name}
                 className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-beige transition-colors">
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {links.map((l) => (
            <Link key={l.en} to={l.path} className="hover:opacity-60 transition-opacity">
              {t(l.ru, l.en)}
            </Link>
          ))}
        </div>

        <div className="text-sm space-y-3">
          <h4 className="font-display text-xl mb-2">{t('Контакты', 'Contacts')}</h4>
          <a href="mailto:hello@miroviriastudio.ru" className="flex items-center gap-2 hover:opacity-60">
            <Icon name="Mail" size={16} /> hello@miroviriastudio.ru
          </a>
          <a href="tel:+74950000000" className="flex items-center gap-2 hover:opacity-60">
            <Icon name="Phone" size={16} /> +7 (495) 000-00-00
          </a>
        </div>
      </div>
      <div className="container pb-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Miroviriastudio. {t('Все права защищены.', 'All rights reserved.')}
      </div>
    </footer>
  );
};

export default Footer;
