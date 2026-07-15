import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useSiteTexts } from '@/hooks/useSiteTexts';
import { categories } from '@/data/catalog';
import { CATALOG_URL, Pattern } from '@/lib/adminApi';

const HERO_IMG = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const CARD_IMG = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const IMG_COURSES  = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/4edd3012-ef60-47d5-8272-232f12db03a9.jpg';
const IMG_BLOG     = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/87c6cced-97b0-4768-bba3-21f35c8738b2.jpg';
const IMG_REVIEWS  = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/10c07459-7fee-40c8-87c0-e4069002285a.jpg';
const IMG_ABOUT    = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/c81b28f6-3f58-4893-be15-71b8509459f4.jpg';
const IMG_ARTICLES = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/eafd0f0f-b3ad-4233-b7f0-1762fcd63da0.jpg';

const Index = () => {
  const { t, lang, addToCart, user } = useApp();
  const { tx } = useSiteTexts();
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    fetch(CATALOG_URL)
      .then((r) => r.json())
      .then((data) => setPatterns(data.patterns || []))
      .catch(() => {});
  }, []);

  const filtered = active ? patterns.filter((p) => p.category === active) : patterns;
  const shown = expanded ? filtered : filtered.slice(0, 8);

  const promos = [
    {
      title_ru: 'Курсы', title_en: 'Courses',
      sub_ru: tx('promo_courses_sub', 'Видеоуроки по пошиву одежды на основе наших лекал — от первого стежка до готового изделия.', 'Video lessons on sewing clothes from our patterns — from the first stitch to a finished garment.', 'ru'),
      sub_en: tx('promo_courses_sub', 'Видеоуроки по пошиву одежды на основе наших лекал — от первого стежка до готового изделия.', 'Video lessons on sewing clothes from our patterns — from the first stitch to a finished garment.', 'en'),
      btn_ru: tx('promo_courses_btn', 'Смотреть курсы', 'View courses', 'ru'),
      btn_en: tx('promo_courses_btn', 'Смотреть курсы', 'View courses', 'en'),
      path: '/courses', img: IMG_COURSES, reverse: false,
    },
    {
      title_ru: 'Блог', title_en: 'Blog',
      sub_ru: tx('promo_blog_sub', 'О моде, мероприятиях, конкурсах и показах — всё самое интересное из мира одежды.', 'About fashion, events, contests and runway shows — the best from the world of clothing.', 'ru'),
      sub_en: tx('promo_blog_sub', 'О моде, мероприятиях, конкурсах и показах — всё самое интересное из мира одежды.', 'About fashion, events, contests and runway shows — the best from the world of clothing.', 'en'),
      btn_ru: tx('promo_blog_btn', 'Читать блог', 'Read blog', 'ru'),
      btn_en: tx('promo_blog_btn', 'Читать блог', 'Read blog', 'en'),
      path: '/blog', img: IMG_BLOG, reverse: true,
    },
    {
      title_ru: 'Отзывы', title_en: 'Reviews',
      sub_ru: tx('promo_reviews_sub', 'Что говорят те, кто уже шьёт по нашим лекалам.', 'What those who already sew with our patterns say.', 'ru'),
      sub_en: tx('promo_reviews_sub', 'Что говорят те, кто уже шьёт по нашим лекалам.', 'What those who already sew with our patterns say.', 'en'),
      btn_ru: tx('promo_reviews_btn', 'Смотреть отзывы', 'See reviews', 'ru'),
      btn_en: tx('promo_reviews_btn', 'Смотреть отзывы', 'See reviews', 'en'),
      path: '/reviews', img: IMG_REVIEWS, reverse: false,
    },
    {
      title_ru: 'О нас', title_en: 'About us',
      sub_ru: tx('promo_about_sub', 'Miroviriastudio — студия лекал, созданная швеями для швей. 8 лет с вами, 12 000 довольных клиентов.', 'Miroviriastudio — a pattern studio created by makers for makers. 8 years with you, 12 000 happy clients.', 'ru'),
      sub_en: tx('promo_about_sub', 'Miroviriastudio — студия лекал, созданная швеями для швей. 8 лет с вами, 12 000 довольных клиентов.', 'Miroviriastudio — a pattern studio created by makers for makers. 8 years with you, 12 000 happy clients.', 'en'),
      btn_ru: tx('promo_about_btn', 'Узнать больше', 'Learn more', 'ru'),
      btn_en: tx('promo_about_btn', 'Узнать больше', 'Learn more', 'en'),
      path: '/about', img: IMG_ABOUT, reverse: true,
    },
    {
      title_ru: 'Статьи', title_en: 'Articles',
      sub_ru: tx('promo_articles_sub', 'Полезные материалы для тех, кто шьёт: выбор ткани, уход за изделиями, припуски и многое другое.', 'Useful materials for those who sew: fabric choice, garment care, seam allowances and more.', 'ru'),
      sub_en: tx('promo_articles_sub', 'Полезные материалы для тех, кто шьёт: выбор ткани, уход за изделиями, припуски и многое другое.', 'Useful materials for those who sew: fabric choice, garment care, seam allowances and more.', 'en'),
      btn_ru: tx('promo_articles_btn', 'Все статьи', 'All articles', 'ru'),
      btn_en: tx('promo_articles_btn', 'Все статьи', 'All articles', 'en'),
      path: '/articles', img: IMG_ARTICLES, reverse: false,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="container grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {tx('index_hero_tag', 'Лекала · Выкройки · Курсы', 'Patterns · Templates · Courses', lang)}
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
            {tx('index_hero_title', 'Создавай одежду своей мечты', 'Sew the clothes of your dreams', lang)}
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-8">
            {tx('index_hero_desc', 'Профессиональные выкройки с подробными инструкциями. От футболки до пальто.', 'Professional patterns with detailed instructions. From a tee to a coat.', lang)}
          </p>
          <Button size="lg" asChild>
            <a href="#catalog">{tx('index_hero_button', 'Смотреть каталог', 'Browse catalog', lang)}</a>
          </Button>
        </div>
        <div className="aspect-square rounded-lg overflow-hidden bg-beige-soft animate-fade-in">
          <img src={HERO_IMG} alt="Miroviriastudio" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Каталог */}
      <section id="catalog" className="container scroll-mt-32 py-12">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="font-display text-4xl md:text-5xl">{tx('index_catalog_title', 'Каталог выкроек', 'Pattern catalog', lang)}</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} {t('моделей', 'models')}</span>
        </div>

        {/* Фильтр по категориям */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => { setActive(null); setExpanded(false); }}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${!active ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-beige-soft'}`}>
            {t('Все', 'All')}
          </button>
          {categories.map((c) => (
            <button
              key={c.en}
              onClick={() => { setActive(c.ru); setExpanded(false); }}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${active === c.ru ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-beige-soft'}`}>
              {lang === 'ru' ? c.ru : c.en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {shown.map((p) => (
            <div key={p.id} className="group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-beige-soft mb-3 relative">
                <img src={p.image ?? CARD_IMG} alt={t(p.name, p.nameEn)} className="w-full h-full object-cover hover-scale" />
                <Button
                  size="sm"
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  onClick={() => {
                    if (!user) { navigate('/auth?redirect=/'); return; }
                    addToCart({ id: p.id, name: t(p.name, p.nameEn), price: p.price });
                  }}>
                  <Icon name="Plus" size={16} className="mr-1" /> {t('В корзину', 'Add')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{lang === 'ru' ? p.category : p.categoryEn}</p>
              <h3 className="font-medium leading-tight mt-1">{t(p.name, p.nameEn)}</h3>
              <div className="flex justify-between items-center mt-1 text-sm">
                <span>{p.price} ₽</span>
                <span className="text-muted-foreground">{t(p.difficulty, p.difficultyEn)}</span>
              </div>
            </div>
          ))}
        </div>

        {!expanded && filtered.length > 8 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setExpanded(true)} className="group">
              {t('Ещё', 'More')}
              <Icon name="ChevronDown" size={18} className="ml-1 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </div>
        )}
      </section>

      {/* Промо-секции */}
      {promos.map((s) => (
        <section key={s.path} className="container py-16 md:py-20">
          <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${s.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-beige-soft">
              <img src={s.img} alt={t(s.title_ru, s.title_en)} className="w-full h-full object-cover hover-scale" />
            </div>
            <div>
              <h2 className="font-display text-5xl md:text-6xl mb-4">{t(s.title_ru, s.title_en)}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t(s.sub_ru, s.sub_en)}</p>
              <Button asChild size="lg">
                <Link to={s.path}>
                  {t(s.btn_ru, s.btn_en)}
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Index;
