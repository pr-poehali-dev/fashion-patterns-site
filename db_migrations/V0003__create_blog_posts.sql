CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    title_en TEXT NOT NULL,
    tag TEXT NOT NULL,
    tag_en TEXT NOT NULL,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO t_p83034167_fashion_patterns_sit.blog_posts (title, title_en, tag, tag_en, post_date, sort_order) VALUES
('Тренды сезона: тихая роскошь', 'Season trends: quiet luxury', 'Мода', 'Fashion', '2026-06-24', 1),
('Неделя моды в Москве: главное', 'Moscow Fashion Week highlights', 'Показы', 'Runway', '2026-06-18', 2),
('Конкурс молодых дизайнеров 2026', 'Young designers contest 2026', 'Конкурсы', 'Contests', '2026-06-10', 3),
('Маркет хендмейда: расписание', 'Handmade market schedule', 'Мероприятия', 'Events', '2026-06-02', 4),
('Базовый гардероб своими руками', 'A capsule wardrobe by yourself', 'Мода', 'Fashion', '2026-05-28', 5),
('Как читать коллекции с подиума', 'How to read runway collections', 'Показы', 'Runway', '2026-05-20', 6);
