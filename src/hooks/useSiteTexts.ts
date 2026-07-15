import { useEffect, useState } from 'react';
import { CONTENT_URL, SiteText } from '@/lib/adminApi';

export const useSiteTexts = () => {
  const [texts, setTexts] = useState<Record<string, SiteText>>({});

  useEffect(() => {
    fetch(`${CONTENT_URL}?resource=texts`)
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, SiteText> = {};
        (data.texts || []).forEach((t: SiteText) => { map[t.key] = t; });
        setTexts(map);
      })
      .catch(() => {});
  }, []);

  const tx = (key: string, fallbackRu: string, fallbackEn: string, lang: 'ru' | 'en') => {
    const t = texts[key];
    if (!t) return lang === 'ru' ? fallbackRu : fallbackEn;
    const val = lang === 'ru' ? t.valueRu : t.valueEn;
    return val || (lang === 'ru' ? fallbackRu : fallbackEn);
  };

  return { texts, tx };
};
