import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const BANNER_1 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const BANNER_2 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const FabricForDress = () => {
  const { t } = useApp();
  return (
    <Layout>
      <article className="container max-w-3xl py-12 md:py-20">
        <Link to="/articles" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('Все статьи', 'All articles')}
        </Link>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{t('Материалы', 'Materials')}</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('Как выбрать ткань для платья', 'How to choose fabric for a dress')}</h1>
        <div className="rounded-xl overflow-hidden mb-10 aspect-[16/7]">
          <img src={BANNER_1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="prose-custom space-y-8 text-[17px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-3xl mb-3">{t('Тип силуэта — первое, что учитываем', 'Silhouette type — the first thing to consider')}</h2>
            <p>{t('Прежде чем выбирать ткань, определитесь с кроем платья. Приталенные модели требуют эластичных или плотных тканей с хорошей памятью формы. Свободные силуэты — платья-трапеции, оверсайз — выглядят красиво в натуральных тканях: льне, хлопке, вискозе.', 'Before choosing fabric, define the cut of the dress. Fitted models need elastic or dense fabrics with good shape memory. Loose silhouettes — trapeze, oversize — look great in natural fabrics: linen, cotton, viscose.')}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Натуральные ткани', 'Natural fabrics')}</h2>
            <ul className="space-y-2 list-none pl-0">
              {[
                { name: t('Хлопок', 'Cotton'), desc: t('Универсальный выбор. Дышащий, гипоаллергенный, легко кроится. Подходит для летних платьев и повседневных моделей.', 'Universal choice. Breathable, hypoallergenic, easy to cut. Ideal for summer and casual dresses.') },
                { name: t('Лён', 'Linen'), desc: t('Создаёт текстурный объём. Идеален для свободных платьев в стиле бохо. Мнётся, но это часть его характера.', 'Creates textured volume. Perfect for loose boho dresses. Wrinkles, but that\'s part of its character.') },
                { name: t('Вискоза', 'Viscose'), desc: t('Мягко драпируется, приятна к телу. Отлично подходит для комбинаций и летящих силуэтов.', 'Drapes softly, pleasant to wear. Excellent for slip dresses and flowing silhouettes.') },
                { name: t('Шёлк', 'Silk'), desc: t('Роскошный, но капризный материал. Требует опыта работы — специальных ножниц и иглы.', 'Luxurious but finicky material. Requires experience — special scissors and needles.') },
              ].map((item) => (
                <li key={item.name} className="flex gap-3 p-4 rounded-lg bg-beige-soft">
                  <Icon name="Leaf" size={18} className="mt-0.5 shrink-0" />
                  <div><b>{item.name}</b> — {item.desc}</div>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-xl overflow-hidden my-10 aspect-[16/7]">
            <img src={BANNER_2} alt="" className="w-full h-full object-cover" />
          </div>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Синтетические и смесовые ткани', 'Synthetic and blended fabrics')}</h2>
            <p>{t('Полиэстер, нейлон и трикотаж — незаменимы для спортивных и вечерних платьев. Трикотаж растягивается по фигуре, поэтому он идеален для облегающих моделей. Смесовые ткани (хлопок + лайкра) дают форму и удобство одновременно.', 'Polyester, nylon and knit are essential for sportswear and evening dresses. Knit stretches to fit the body, making it ideal for fitted styles. Blended fabrics (cotton + lycra) provide shape and comfort at the same time.')}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Практические советы', 'Practical tips')}</h2>
            <ol className="space-y-3">
              {[
                t('Покупайте ткань с запасом 10–15 см по длине — на усадку и ошибки при раскрое.', 'Buy fabric with 10–15 cm extra length — for shrinkage and cutting errors.'),
                t('Перед раскроем всегда стирайте и гладьте ткань — она может сесть на 5–10%.', 'Always wash and iron fabric before cutting — it can shrink 5–10%.'),
                t('Проверяйте направление нити основы: кладите лекало строго по долевой.', 'Check the grain direction: place the pattern strictly along the grain line.'),
                t('Для тонких тканей используйте острые ножницы и тонкие иглы (размер 70–80).', 'For delicate fabrics, use sharp scissors and thin needles (size 70–80).'),
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm">{i + 1}</span>
                  <p className="pt-0.5">{tip}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </Layout>
  );
};

export default FabricForDress;
