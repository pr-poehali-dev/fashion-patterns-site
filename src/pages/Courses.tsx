import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const Courses = () => {
  const { t } = useApp();

  const lessons = [
    { ru: 'Знакомство с лекалами', en: 'Intro to patterns', desc_ru: 'Как читать и подготовить выкройку к работе.', desc_en: 'How to read and prepare a pattern.', level: t('Новичок', 'Beginner'), time: '25 мин' },
    { ru: 'Снятие мерок', en: 'Taking measurements', desc_ru: 'Точные замеры для идеальной посадки.', desc_en: 'Accurate measurements for perfect fit.', level: t('Новичок', 'Beginner'), time: '30 мин' },
    { ru: 'Раскрой ткани', en: 'Cutting fabric', desc_ru: 'Экономный раскрой по нашим лекалам.', desc_en: 'Economical cutting with our patterns.', level: t('Новичок', 'Beginner'), time: '40 мин' },
    { ru: 'Шьём футболку', en: 'Sew a t-shirt', desc_ru: 'Базовый проект от А до Я.', desc_en: 'A basic project from A to Z.', level: t('Средний', 'Medium'), time: '1 ч' },
    { ru: 'Платье-комбинация', en: 'Slip dress', desc_ru: 'Работа с тонкими тканями и бейкой.', desc_en: 'Working with delicate fabrics.', level: t('Средний', 'Medium'), time: '1.5 ч' },
    { ru: 'Обработка горловины', en: 'Neckline finishing', desc_ru: 'Аккуратные срезы и обтачки.', desc_en: 'Neat edges and facings.', level: t('Средний', 'Medium'), time: '45 мин' },
    { ru: 'Втачиваем рукав', en: 'Setting a sleeve', desc_ru: 'Без складок и заломов.', desc_en: 'Without folds and creases.', level: t('Продвинутый', 'Advanced'), time: '1 ч' },
    { ru: 'Пошив пальто', en: 'Coat tailoring', desc_ru: 'Сложный проект с подкладом.', desc_en: 'Complex project with lining.', level: t('Продвинутый', 'Advanced'), time: '3 ч' },
  ];

  return (
    <Layout>
      <PageHero
        title={t('Курсы по шитью', 'Sewing courses')}
        subtitle={t('Видеоуроки по пошиву одежды на основе наших лекал — от первого стежка до готового изделия.',
                    'Video lessons on sewing clothes from our patterns — from the first stitch to a finished garment.')}
      />
      <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((l, i) => (
          <div key={i} className="border border-border rounded-lg p-6 hover:bg-beige-soft transition-colors flex flex-col">
            <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center mb-4">
              <Icon name="Play" size={20} />
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground mb-2">
              <span>{l.level}</span><span>·</span><span>{l.time}</span>
            </div>
            <h3 className="font-display text-2xl mb-2">{t(l.ru, l.en)}</h3>
            <p className="text-sm text-muted-foreground mb-5 flex-1">{t(l.desc_ru, l.desc_en)}</p>
            <Button variant="outline" className="w-full">{t('Смотреть урок', 'Watch lesson')}</Button>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Courses;
