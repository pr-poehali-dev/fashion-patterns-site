import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const BANNER_1 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/550ca72b-9ea7-4988-8f97-c095433cb581.jpg';
const BANNER_2 = 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/files/386737f5-0484-442b-a2b3-28b464fa956c.jpg';

const PrintingPatterns = () => {
  const { t } = useApp();
  return (
    <Layout>
      <article className="container max-w-3xl py-12 md:py-20">
        <Link to="/articles" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('Все статьи', 'All articles')}
        </Link>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{t('Инструкция', 'How-to')}</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('Печать выкроек дома: пошагово', 'Printing patterns at home: step by step')}</h1>
        <div className="rounded-xl overflow-hidden mb-10 aspect-[16/7]">
          <img src={BANNER_1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-8 text-[17px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-3xl mb-3">{t('Что вам понадобится', 'What you will need')}</h2>
            <ul className="space-y-2">
              {[
                t('Принтер (лазерный или струйный)', 'Printer (laser or inkjet)'),
                t('Бумага А4 или А3', 'A4 or A3 paper'),
                t('Скотч или клей-карандаш', 'Tape or glue stick'),
                t('Ножницы для бумаги', 'Paper scissors'),
                t('Линейка для проверки масштаба', 'Ruler to check scale'),
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-beige-soft rounded-lg text-sm">
                  <Icon name="Check" size={16} className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl mb-3">{t('Шаг за шагом', 'Step by step')}</h2>
            <ol className="space-y-4">
              {[
                { title: t('Откройте PDF в Adobe Acrobat Reader', 'Open PDF in Adobe Acrobat Reader'), desc: t('Не используйте браузерный просмотрщик — он может изменить масштаб.', 'Do not use browser viewer — it may change the scale.') },
                { title: t('Установите масштаб 100%', 'Set scale to 100%'), desc: t('В настройках печати выберите «Реальный размер» или «100%». НЕ «Вписать на страницу».', 'In print settings choose "Actual size" or "100%". NOT "Fit to page".') },
                { title: t('Распечатайте тестовый лист', 'Print the test sheet'), desc: t('На первом листе выкройки есть квадрат 10×10 см. Измерьте его линейкой — должно быть ровно 10 см.', 'The first sheet of the pattern has a 10×10 cm square. Measure it — it must be exactly 10 cm.') },
                { title: t('Распечатайте все листы', 'Print all sheets'), desc: t('Листы пронумерованы. Складывайте их в порядке нумерации.', 'Sheets are numbered. Assemble them in order.') },
                { title: t('Склейте листы по меткам', 'Assemble sheets using marks'), desc: t('На каждом листе есть стрелки или символы для совмещения. Обрежьте поля и склейте внахлёст.', 'Each sheet has arrows or symbols for alignment. Trim margins and tape overlapping.') },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="rounded-xl overflow-hidden my-10 aspect-[16/7]">
            <img src={BANNER_2} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="p-6 bg-beige-soft rounded-xl flex gap-3 text-sm">
            <Icon name="Printer" size={20} className="shrink-0" />
            <p>{t('Если нет домашнего принтера — файл можно распечатать в любом копи-центре. Попросите сотрудников распечатать в «реальном масштабе» (100%).', 'If you don\'t have a home printer, print the file at any copy center. Ask staff to print at "actual size" (100%).')}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default PrintingPatterns;
