import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const BANNER_1 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const BANNER_2 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const GarmentCare = () => {
  const { t } = useApp();
  return (
    <Layout>
      <article className="container max-w-3xl py-12 md:py-20">
        <Link to="/articles" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('Все статьи', 'All articles')}
        </Link>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{t('Уход', 'Care')}</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('Уход за готовыми изделиями', 'Caring for finished garments')}</h1>
        <div className="rounded-xl overflow-hidden mb-10 aspect-[16/7]">
          <img src={BANNER_1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-8 text-[17px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-3xl mb-3">{t('Стирка по типу ткани', 'Washing by fabric type')}</h2>
            <div className="space-y-3">
              {[
                { fabric: t('Хлопок и лён', 'Cotton and linen'), temp: '30–40°C', note: t('Можно в машине, выворачивать наизнанку.', 'Machine washable, turn inside out.') },
                { fabric: t('Вискоза', 'Viscose'), temp: '30°C', note: t('Деликатный режим или вручную. Не выкручивать.', 'Delicate cycle or hand wash. Do not wring.') },
                { fabric: t('Шёлк', 'Silk'), temp: t('Вручную', 'By hand'), note: t('Специальное средство для шёлка, без отжима.', 'Special silk detergent, no spinning.') },
                { fabric: t('Трикотаж', 'Knit'), temp: '30°C', note: t('Только деликатный режим, сушить на горизонтальной поверхности.', 'Delicate only, dry flat.') },
                { fabric: t('Шерсть', 'Wool'), temp: '30°C', note: t('Специальное средство для шерсти, в мешке для стирки.', 'Special wool detergent, in a laundry bag.') },
              ].map((row) => (
                <div key={row.fabric} className="grid grid-cols-3 gap-4 p-4 bg-beige-soft rounded-lg text-sm">
                  <span className="font-medium">{row.fabric}</span>
                  <span className="text-muted-foreground text-center">{row.temp}</span>
                  <span>{row.note}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl overflow-hidden my-10 aspect-[16/7]">
            <img src={BANNER_2} alt="" className="w-full h-full object-cover" />
          </div>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Глажка и хранение', 'Ironing and storage')}</h2>
            <ol className="space-y-3">
              {[
                t('Гладьте изделие с изнанки или через влажную марлю — особенно тёмные ткани.', 'Iron inside out or through a damp cloth — especially dark fabrics.'),
                t('Температура утюга зависит от ткани: хлопок — высокая, шёлк — минимальная.', 'Iron temperature depends on fabric: cotton — high, silk — minimum.'),
                t('Трикотаж лучше не гладить, а отпаривать на весу.', 'Knit is better steamed, not ironed flat.'),
                t('Храните вещи в тёмном месте, вдали от прямых солнечных лучей.', 'Store garments in a dark place, away from direct sunlight.'),
                t('Деликатные вещи — только на широких плечиках, чтобы не деформировать форму.', 'Delicate items only on wide hangers to preserve their shape.'),
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

export default GarmentCare;
