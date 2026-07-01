import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const BANNER_1 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const BANNER_2 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const ChoosingSize = () => {
  const { t } = useApp();

  const sizes = [
    { size: 'XS (40)', bust: '80–83', waist: '60–63', hips: '86–89' },
    { size: 'S (42)', bust: '84–87', waist: '64–67', hips: '90–93' },
    { size: 'M (44)', bust: '88–91', waist: '68–71', hips: '94–97' },
    { size: 'L (46)', bust: '92–95', waist: '72–75', hips: '98–101' },
    { size: 'XL (48)', bust: '96–99', waist: '76–79', hips: '102–105' },
    { size: 'XXL (50)', bust: '100–103', waist: '80–83', hips: '106–109' },
  ];

  return (
    <Layout>
      <article className="container max-w-3xl py-12 md:py-20">
        <Link to="/articles" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('Все статьи', 'All articles')}
        </Link>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{t('Размеры', 'Sizing')}</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('Подбор размера по таблице мерок', 'Choosing a size by measurements')}</h1>
        <div className="rounded-xl overflow-hidden mb-10 aspect-[16/7]">
          <img src={BANNER_1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-8 text-[17px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-3xl mb-3">{t('Как снять мерки правильно', 'How to take measurements correctly')}</h2>
            <ol className="space-y-3">
              {[
                t('Встаньте прямо, ноги вместе, дышите спокойно.', 'Stand straight, feet together, breathe calmly.'),
                t('Сантиметровую ленту держите горизонтально, без натяжения.', 'Hold the tape measure horizontally, without tension.'),
                t('Обхват груди — самая выступающая точка груди.', 'Bust — the fullest point of the chest.'),
                t('Обхват талии — самое узкое место на животе.', 'Waist — the narrowest point of the torso.'),
                t('Обхват бёдер — на 18–20 см ниже талии, по выступающей точке ягодиц.', 'Hips — 18–20 cm below the waist, at the fullest point of the buttocks.'),
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm">{i + 1}</span>
                  <p className="pt-0.5">{tip}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="rounded-xl overflow-hidden my-10 aspect-[16/7]">
            <img src={BANNER_2} alt="" className="w-full h-full object-cover" />
          </div>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Таблица размеров', 'Size chart')} (см)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4">{t('Размер', 'Size')}</th>
                    <th className="text-left py-3 pr-4">{t('Грудь', 'Bust')}</th>
                    <th className="text-left py-3 pr-4">{t('Талия', 'Waist')}</th>
                    <th className="text-left py-3">{t('Бёдра', 'Hips')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((row) => (
                    <tr key={row.size} className="border-b border-border/50 hover:bg-beige-soft transition-colors">
                      <td className="py-3 pr-4 font-semibold">{row.size}</td>
                      <td className="py-3 pr-4">{row.bust}</td>
                      <td className="py-3 pr-4">{row.waist}</td>
                      <td className="py-3">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="p-6 bg-beige rounded-xl flex gap-3 text-sm">
            <Icon name="Ruler" size={20} className="shrink-0" />
            <p>{t('Если ваши мерки попадают между размерами — выбирайте больший и корректируйте посадку по боковым швам. Так проще, чем наращивать ткань.', 'If your measurements fall between sizes — choose the larger and adjust the fit at the side seams. It\'s easier than adding fabric.')}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ChoosingSize;
