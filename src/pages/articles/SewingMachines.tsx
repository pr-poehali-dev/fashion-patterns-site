import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const BANNER_1 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const BANNER_2 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const SewingMachines = () => {
  const { t } = useApp();
  return (
    <Layout>
      <article className="container max-w-3xl py-12 md:py-20">
        <Link to="/articles" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('Все статьи', 'All articles')}
        </Link>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{t('Оборудование', 'Equipment')}</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('Гид по швейным машинам для новичков', 'Sewing machines guide for beginners')}</h1>
        <div className="rounded-xl overflow-hidden mb-10 aspect-[16/7]">
          <img src={BANNER_1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-8 text-[17px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-3xl mb-3">{t('Какую машину выбрать в начале пути', 'Which machine to choose at the start')}</h2>
            <p>{t('Новичку не нужна профессиональная машина за 80 000 ₽. Базовая механическая или электронная машина за 8 000–20 000 ₽ отлично справится с 90% задач. Главное — надёжность и простота обслуживания.', 'A beginner doesn\'t need a professional machine worth 80 000 ₽. A basic mechanical or electronic machine for 8 000–20 000 ₽ handles 90% of tasks. The key is reliability and ease of maintenance.')}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Типы машин', 'Types of machines')}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: 'Settings', title: t('Механические', 'Mechanical'), desc: t('Простые, надёжные, ремонтопригодные. Лучший выбор для обучения.', 'Simple, reliable, repairable. Best choice for learning.') },
                { icon: 'Cpu', title: t('Электронные', 'Electronic'), desc: t('Автоматический натяжение нити, много строчек, удобно шить.', 'Automatic thread tension, many stitches, comfortable sewing.') },
                { icon: 'Zap', title: t('Оверлоки', 'Overlockers'), desc: t('Обрабатывают края ткани. Нужны в дополнение к основной машине.', 'Finish fabric edges. Used alongside the main machine.') },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-beige-soft rounded-xl">
                  <Icon name={item.icon} size={24} className="mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl overflow-hidden my-10 aspect-[16/7]">
            <img src={BANNER_2} alt="" className="w-full h-full object-cover" />
          </div>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('На что смотреть при покупке', 'What to look for when buying')}</h2>
            <ol className="space-y-3">
              {[
                t('Количество строчек: 15–25 вполне достаточно для начала.', 'Number of stitches: 15–25 is plenty for a beginner.'),
                t('Горизонтальный челнок — проще заправлять шпульку.', 'Horizontal bobbin — easier to insert the bobbin.'),
                t('Регулировка натяжения нити — вручную или автоматически.', 'Thread tension adjustment — manual or automatic.'),
                t('Наличие сервисных центров в вашем городе.', 'Availability of service centers in your city.'),
                t('Комплект лапок: для молний, пуговиц, потайного шва.', 'Set of presser feet: for zippers, buttons, blind stitch.'),
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm">{i + 1}</span>
                  <p className="pt-0.5">{tip}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="p-6 bg-beige-soft rounded-xl flex gap-3 text-sm">
            <Icon name="Info" size={20} className="shrink-0" />
            <p>{t('Совет: перед покупкой зайдите в магазин и пошейте на машине сами. Посмотрите, как удобно заправлять нитку, насколько тихо она работает.', 'Tip: before buying, go to the store and sew on the machine yourself. See how easy it is to thread and how quiet it runs.')}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default SewingMachines;
