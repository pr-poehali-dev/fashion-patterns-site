import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { CONTENT_URL, adminHeaders, SiteText } from '@/lib/adminApi';

const GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'Главная страница',
    keys: ['index_hero_tag', 'index_hero_title', 'index_hero_desc', 'index_hero_button', 'index_catalog_title'],
  },
  {
    title: 'Промо-блоки на главной',
    keys: [
      'promo_courses_title', 'promo_courses_sub', 'promo_courses_btn',
      'promo_blog_title', 'promo_blog_sub', 'promo_blog_btn',
      'promo_reviews_title', 'promo_reviews_sub', 'promo_reviews_btn',
      'promo_about_title', 'promo_about_sub', 'promo_about_btn',
      'promo_articles_title', 'promo_articles_sub', 'promo_articles_btn',
    ],
  },
  {
    title: 'О нас',
    keys: [
      'about_intro_1', 'about_intro_2',
      'about_stat1_num', 'about_stat1_text', 'about_stat2_num', 'about_stat2_text',
      'about_stat3_num', 'about_stat3_text', 'about_stat4_num', 'about_stat4_text',
    ],
  },
  {
    title: 'Подзаголовки страниц',
    keys: ['reviews_subtitle', 'courses_subtitle', 'blog_subtitle', 'payment_subtitle'],
  },
];

const LABELS: Record<string, string> = {
  index_hero_tag: 'Надпись над заголовком',
  index_hero_title: 'Главный заголовок',
  index_hero_desc: 'Описание под заголовком',
  index_hero_button: 'Текст кнопки',
  index_catalog_title: 'Заголовок каталога',
  promo_courses_title: 'Курсы — заголовок',
  promo_courses_sub: 'Курсы — описание',
  promo_courses_btn: 'Курсы — кнопка',
  promo_blog_title: 'Блог — заголовок',
  promo_blog_sub: 'Блог — описание',
  promo_blog_btn: 'Блог — кнопка',
  promo_reviews_title: 'Отзывы — заголовок',
  promo_reviews_sub: 'Отзывы — описание',
  promo_reviews_btn: 'Отзывы — кнопка',
  promo_about_title: 'О нас — заголовок',
  promo_about_sub: 'О нас — описание',
  promo_about_btn: 'О нас — кнопка',
  promo_articles_title: 'Статьи — заголовок',
  promo_articles_sub: 'Статьи — описание',
  promo_articles_btn: 'Статьи — кнопка',
  about_intro_1: 'Первый абзац',
  about_intro_2: 'Второй абзац',
  about_stat1_num: 'Показатель 1 — число',
  about_stat1_text: 'Показатель 1 — подпись',
  about_stat2_num: 'Показатель 2 — число',
  about_stat2_text: 'Показатель 2 — подпись',
  about_stat3_num: 'Показатель 3 — число',
  about_stat3_text: 'Показатель 3 — подпись',
  about_stat4_num: 'Показатель 4 — число',
  about_stat4_text: 'Показатель 4 — подпись',
  reviews_subtitle: 'Подзаголовок «Отзывы»',
  courses_subtitle: 'Подзаголовок «Курсы»',
  blog_subtitle: 'Подзаголовок «Блог»',
  payment_subtitle: 'Подзаголовок «Оплата»',
};

const AdminTexts = () => {
  const [texts, setTexts] = useState<Record<string, SiteText>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch(`${CONTENT_URL}?resource=texts`)
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, SiteText> = {};
        (data.texts || []).forEach((t: SiteText) => { map[t.key] = t; });
        setTexts(map);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (key: string, field: 'valueRu' | 'valueEn', value: string) => {
    setTexts((prev) => ({
      ...prev,
      [key]: { key, valueRu: prev[key]?.valueRu ?? '', valueEn: prev[key]?.valueEn ?? '', [field]: value },
    }));
  };

  const handleSave = async (key: string) => {
    setSavingKey(key);
    try {
      const t = texts[key];
      const res = await fetch(`${CONTENT_URL}?resource=texts`, {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify({ key, valueRu: t?.valueRu || '', valueEn: t?.valueEn || '' }),
      });
      if (!res.ok) throw new Error();
    } catch {
      alert('Не удалось сохранить');
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <AdminLayout>
      <h2 className="font-display text-3xl mb-6">Тексты сайта</h2>

      {loading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : (
        <div className="space-y-10 max-w-3xl">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium text-lg mb-4">{group.title}</h3>
              <div className="space-y-6">
                {group.keys.map((key) => (
                  <div key={key} className="border border-border rounded-lg p-4">
                    <Label className="mb-2 block">{LABELS[key] || key}</Label>
                    <div className="grid gap-3 mb-3">
                      <div>
                        <span className="text-xs text-muted-foreground mb-1 block">Русский</span>
                        <Textarea
                          rows={2}
                          value={texts[key]?.valueRu ?? ''}
                          onChange={(e) => handleChange(key, 'valueRu', e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground mb-1 block">English</span>
                        <Textarea
                          rows={2}
                          value={texts[key]?.valueEn ?? ''}
                          onChange={(e) => handleChange(key, 'valueEn', e.target.value)}
                        />
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleSave(key)} disabled={savingKey === key}>
                      {savingKey === key ? <Icon name="Loader2" size={14} className="mr-2 animate-spin" /> : null}
                      Сохранить
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTexts;