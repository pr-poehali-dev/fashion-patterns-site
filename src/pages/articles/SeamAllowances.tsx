import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const BANNER_1 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const BANNER_2 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const SeamAllowances = () => {
  const { t } = useApp();
  return (
    <Layout>
      <article className="container max-w-3xl py-12 md:py-20">
        <Link to="/articles" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('Все статьи', 'All articles')}
        </Link>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{t('Основы', 'Basics')}</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('Что такое припуски на швы', 'What are seam allowances')}</h1>
        <div className="rounded-xl overflow-hidden mb-10 aspect-[16/7]">
          <img src={BANNER_1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-8 text-[17px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-3xl mb-3">{t('Что такое припуск', 'What is a seam allowance')}</h2>
            <p>{t('Припуск на шов — это дополнительная полоска ткани между линией шва и краем детали выкройки. Он нужен для того, чтобы при сшивании деталей вместе итоговое изделие получилось нужного размера. Наши лекала уже включают припуски, если это указано в описании.', 'A seam allowance is the extra strip of fabric between the stitch line and the edge of the pattern piece. It is needed so that when pieces are sewn together, the finished garment is the correct size. Our patterns already include seam allowances where noted.')}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Стандартные размеры припусков', 'Standard seam allowance sizes')}</h2>
            <div className="space-y-3">
              {[
                { size: '1 см', where: t('Горловина, проймы, сложные кривые', 'Necklines, armholes, complex curves') },
                { size: '1.5 см', where: t('Боковые швы, плечевые швы', 'Side seams, shoulder seams') },
                { size: '2–3 см', where: t('Низ изделия, подрубка', 'Hem, hemline') },
                { size: '3–4 см', where: t('Низ рукавов, широкая подрубка', 'Sleeve hem, wide turn-up') },
              ].map((row) => (
                <div key={row.size} className="flex gap-6 p-4 bg-beige-soft rounded-lg">
                  <span className="font-display text-2xl shrink-0 w-16">{row.size}</span>
                  <span className="text-sm pt-1">{row.where}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl overflow-hidden my-10 aspect-[16/7]">
            <img src={BANNER_2} alt="" className="w-full h-full object-cover" />
          </div>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Как правильно добавить припуск', 'How to add a seam allowance correctly')}</h2>
            <ol className="space-y-3">
              {[
                t('Положите лекало на ткань и обведите по контуру — это линия шва.', 'Place the pattern on fabric and trace the outline — this is the seam line.'),
                t('Отступите от контура на нужное расстояние и проведите вторую линию — это линия разреза.', 'Step back from the outline by the required distance and draw a second line — this is the cut line.'),
                t('Режьте по внешней линии, шейте по внутренней.', 'Cut along the outer line, sew along the inner line.'),
                t('На кривых участках надрезайте припуск — это даст ткани ровно лечь.', 'On curved areas, clip the allowance — this lets the fabric lie flat.'),
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm">{i + 1}</span>
                  <p className="pt-0.5">{tip}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="p-6 bg-beige flex gap-3 text-sm rounded-xl">
            <Icon name="AlertCircle" size={20} className="shrink-0" />
            <p>{t('Важно: наши выкройки всегда сопровождаются инструкцией — включены ли припуски. Внимательно читайте описание перед раскроем!', 'Important: our patterns always come with a note on whether seam allowances are included. Read the description carefully before cutting!')}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default SeamAllowances;
