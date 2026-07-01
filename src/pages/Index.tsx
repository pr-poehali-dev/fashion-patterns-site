import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { patterns, categories } from '@/data/catalog';

const HERO_IMG = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const CARD_IMG = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const Index = () => {
  const { t, lang, addToCart, user } = useApp();
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = active ? patterns.filter((p) => p.category === active) : patterns;
  const shown = expanded ? filtered : filtered.slice(0, 8);

  return (
    <Layout>
      {/* Hero */}
      <section className="container grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t('Лекала · Выкройки · Курсы', 'Patterns · Templates · Courses')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
            {t('Создавай одежду своей мечты', 'Sew the clothes of your dreams')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-8">
            {t('Профессиональные выкройки с подробными инструкциями. От футболки до пальто.',
               'Professional patterns with detailed instructions. From a tee to a coat.')}
          </p>
          <Button size="lg" asChild>
            <a href="#catalog">{t('Смотреть каталог', 'Browse catalog')}</a>
          </Button>
        </div>
        <div className="aspect-square rounded-lg overflow-hidden bg-beige-soft animate-fade-in">
          <img src={HERO_IMG} alt="Miroviriastudio" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Каталог */}
      <section id="catalog" className="container scroll-mt-32 py-12">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="font-display text-4xl md:text-5xl">{t('Каталог выкроек', 'Pattern catalog')}</h2>
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
                <img src={CARD_IMG} alt={t(p.name, p.nameEn)} className="w-full h-full object-cover hover-scale" />
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
    </Layout>
  );
};

export default Index;