CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.patterns (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    category TEXT NOT NULL,
    category_en TEXT NOT NULL,
    price INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    difficulty_en TEXT NOT NULL,
    image TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.reviews (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    stars INTEGER NOT NULL DEFAULT 5,
    text_ru TEXT NOT NULL,
    text_en TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.site_texts (
    key VARCHAR(100) PRIMARY KEY,
    value_ru TEXT,
    value_en TEXT,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.admin_sessions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL
);

INSERT INTO t_p83034167_fashion_patterns_sit.patterns (id, name, name_en, category, category_en, price, difficulty, difficulty_en, image, sort_order) VALUES
(1, 'Платье «Мадлен»', 'Madeleine Dress', 'Платья', 'Dresses', 690, 'Средне', 'Medium', 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/d84e5379-1364-46af-91ee-50f310e79626.png', 1),
(2, 'Платье-комбинация', 'Slip Dress', 'Платья', 'Dresses', 590, 'Легко', 'Easy', 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/79443bcd-ecbd-4c56-aacd-9555770e9bf9.png', 2),
(3, 'Платье-рубашка', 'Shirt Dress', 'Платья', 'Dresses', 740, 'Сложно', 'Hard', 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/beca03ca-606a-4f05-873e-1f6509ae0097.png', 3),
(4, 'Летнее платье «Луара»', 'Loire Summer Dress', 'Платья', 'Dresses', 650, 'Средне', 'Medium', 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/39b84d6c-99b3-4d52-8fc0-d59f6b50a257.png', 4),
(5, 'Базовая футболка', 'Basic Tee', 'Футболки', 'T-shirts', 390, 'Легко', 'Easy', 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/cab06d8f-3439-49e7-9874-102fe43e6de7.png', 5),
(6, 'Футболка оверсайз', 'Oversize Tee', 'Футболки', 'T-shirts', 420, 'Легко', 'Easy', 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/eac98eab-c860-4c10-8479-10146ca2075e.jpg', 6),
(7, 'Футболка с рукавом ¾', 'Tee 3/4 Sleeve', 'Футболки', 'T-shirts', 450, 'Легко', 'Easy', NULL, 7),
(8, 'Топ-кроп', 'Crop Top', 'Футболки', 'T-shirts', 380, 'Легко', 'Easy', NULL, 8),
(9, 'Брюки палаццо', 'Palazzo Trousers', 'Брюки', 'Trousers', 690, 'Средне', 'Medium', NULL, 9),
(10, 'Брюки-сигареты', 'Cigarette Trousers', 'Брюки', 'Trousers', 720, 'Сложно', 'Hard', NULL, 10),
(11, 'Широкие джинсы', 'Wide Jeans', 'Брюки', 'Trousers', 790, 'Сложно', 'Hard', NULL, 11),
(12, 'Льняные брюки', 'Linen Trousers', 'Брюки', 'Trousers', 640, 'Средне', 'Medium', NULL, 12),
(13, 'Юбка-миди плиссе', 'Pleated Midi Skirt', 'Юбки', 'Skirts', 540, 'Средне', 'Medium', NULL, 13),
(14, 'Юбка-карандаш', 'Pencil Skirt', 'Юбки', 'Skirts', 490, 'Средне', 'Medium', NULL, 14),
(15, 'Юбка А-силуэт', 'A-line Skirt', 'Юбки', 'Skirts', 460, 'Легко', 'Easy', NULL, 15),
(16, 'Юбка на запах', 'Wrap Skirt', 'Юбки', 'Skirts', 470, 'Легко', 'Easy', NULL, 16),
(17, 'Блузка с бантом', 'Bow Blouse', 'Блузки', 'Blouses', 560, 'Средне', 'Medium', NULL, 17),
(18, 'Блузка-рубашка', 'Shirt Blouse', 'Блузки', 'Blouses', 590, 'Средне', 'Medium', NULL, 18),
(19, 'Блузка с воланами', 'Ruffle Blouse', 'Блузки', 'Blouses', 610, 'Сложно', 'Hard', NULL, 19),
(20, 'Блузка-топ', 'Top Blouse', 'Блузки', 'Blouses', 510, 'Легко', 'Easy', NULL, 20),
(21, 'Пальто-кокон', 'Cocoon Coat', 'Пальто', 'Coats', 1190, 'Сложно', 'Hard', NULL, 21),
(22, 'Пальто-халат', 'Robe Coat', 'Пальто', 'Coats', 1090, 'Сложно', 'Hard', NULL, 22),
(23, 'Тренч классический', 'Classic Trench', 'Пальто', 'Coats', 1290, 'Сложно', 'Hard', NULL, 23),
(24, 'Пальто оверсайз', 'Oversize Coat', 'Пальто', 'Coats', 1150, 'Средне', 'Medium', NULL, 24),
(25, 'Жакет приталенный', 'Fitted Jacket', 'Жакеты', 'Jackets', 890, 'Сложно', 'Hard', NULL, 25),
(26, 'Жакет-кимоно', 'Kimono Jacket', 'Жакеты', 'Jackets', 760, 'Средне', 'Medium', NULL, 26),
(27, 'Блейзер оверсайз', 'Oversize Blazer', 'Жакеты', 'Jackets', 940, 'Сложно', 'Hard', NULL, 27),
(28, 'Жакет без застёжки', 'Open Jacket', 'Жакеты', 'Jackets', 720, 'Средне', 'Medium', NULL, 28),
(29, 'Шопер из ткани', 'Fabric Tote', 'Аксессуары', 'Accessories', 290, 'Легко', 'Easy', NULL, 29),
(30, 'Бандана', 'Bandana', 'Аксессуары', 'Accessories', 190, 'Легко', 'Easy', NULL, 30),
(31, 'Косметичка', 'Cosmetic Bag', 'Аксессуары', 'Accessories', 250, 'Легко', 'Easy', NULL, 31),
(32, 'Панама', 'Bucket Hat', 'Аксессуары', 'Accessories', 320, 'Средне', 'Medium', NULL, 32),
(33, 'Платье макси', 'Maxi Dress', 'Платья', 'Dresses', 790, 'Сложно', 'Hard', NULL, 33),
(34, 'Сарафан', 'Sundress', 'Платья', 'Dresses', 620, 'Средне', 'Medium', NULL, 34),
(35, 'Футболка с принтом', 'Printed Tee', 'Футболки', 'T-shirts', 430, 'Легко', 'Easy', NULL, 35),
(36, 'Лонгслив', 'Longsleeve', 'Футболки', 'T-shirts', 470, 'Легко', 'Easy', NULL, 36),
(37, 'Юбка-солнце', 'Circle Skirt', 'Юбки', 'Skirts', 520, 'Средне', 'Medium', NULL, 37),
(38, 'Брюки клёш', 'Flared Trousers', 'Брюки', 'Trousers', 680, 'Средне', 'Medium', NULL, 38),
(39, 'Блузка с открытыми плечами', 'Off-shoulder Blouse', 'Блузки', 'Blouses', 580, 'Средне', 'Medium', NULL, 39),
(40, 'Жилет', 'Vest', 'Жакеты', 'Jackets', 540, 'Средне', 'Medium', NULL, 40);

SELECT setval('t_p83034167_fashion_patterns_sit.patterns_id_seq', 40);

INSERT INTO t_p83034167_fashion_patterns_sit.reviews (name, stars, text_ru, text_en, sort_order) VALUES
('Анна К.', 5, 'Выкройка села идеально, инструкция очень подробная. Сшила платье за вечер!', 'The pattern fit perfectly, very detailed instructions. Made a dress in one evening!', 1),
('Мария Л.', 5, 'Заказываю уже третий раз. Качество лекал на высоте, всё понятно даже новичку.', 'Ordering for the third time. Great pattern quality, clear even for a beginner.', 2),
('Ольга В.', 5, 'Курсы — отдельная любовь. Наконец-то поняла, как втачивать рукав без складок.', 'The courses are a separate love. Finally learned to set a sleeve without folds.', 3),
('Екатерина С.', 4, 'Отличный магазин, большой выбор. Хотелось бы ещё больше моделей пальто.', 'Great shop, big selection. Would love even more coat models.', 4),
('Дарья М.', 5, 'Шью на заказ, эти лекала — основа моей работы. Спасибо за качество!', 'I sew to order, these patterns are the base of my work. Thanks for the quality!', 5),
('Ирина П.', 5, 'Быстрая доставка файлов, всё печатается без проблем. Рекомендую!', 'Fast file delivery, prints without issues. Recommend!', 6);

INSERT INTO t_p83034167_fashion_patterns_sit.site_texts (key, value_ru, value_en) VALUES
('index_hero_tag', 'Лекала · Выкройки · Курсы', 'Patterns · Templates · Courses'),
('index_hero_title', 'Создавай одежду своей мечты', 'Sew the clothes of your dreams'),
('index_hero_desc', 'Профессиональные выкройки с подробными инструкциями. От футболки до пальто.', 'Professional patterns with detailed instructions. From a tee to a coat.'),
('index_hero_button', 'Смотреть каталог', 'Browse catalog'),
('index_catalog_title', 'Каталог выкроек', 'Pattern catalog'),
('promo_courses_title', 'Курсы', 'Courses'),
('promo_courses_sub', 'Видеоуроки по пошиву одежды на основе наших лекал — от первого стежка до готового изделия.', 'Video lessons on sewing clothes from our patterns — from the first stitch to a finished garment.'),
('promo_courses_btn', 'Смотреть курсы', 'View courses'),
('promo_blog_title', 'Блог', 'Blog'),
('promo_blog_sub', 'О моде, мероприятиях, конкурсах и показах — всё самое интересное из мира одежды.', 'About fashion, events, contests and runway shows — the best from the world of clothing.'),
('promo_blog_btn', 'Читать блог', 'Read blog'),
('promo_reviews_title', 'Отзывы', 'Reviews'),
('promo_reviews_sub', 'Что говорят те, кто уже шьёт по нашим лекалам.', 'What those who already sew with our patterns say.'),
('promo_reviews_btn', 'Смотреть отзывы', 'See reviews'),
('promo_about_title', 'О нас', 'About us'),
('promo_about_sub', 'Miroviriastudio — студия лекал, созданная швеями для швей. 8 лет с вами, 12 000 довольных клиентов.', 'Miroviriastudio — a pattern studio created by makers for makers. 8 years with you, 12 000 happy clients.'),
('promo_about_btn', 'Узнать больше', 'Learn more'),
('promo_articles_title', 'Статьи', 'Articles'),
('promo_articles_sub', 'Полезные материалы для тех, кто шьёт: выбор ткани, уход за изделиями, припуски и многое другое.', 'Useful materials for those who sew: fabric choice, garment care, seam allowances and more.'),
('promo_articles_btn', 'Все статьи', 'All articles'),
('about_intro_1', 'Miroviriastudio — это студия лекал и выкроек, созданная швеями для швей. Мы верим, что красивую одежду можно сшить дома, если под рукой есть точная выкройка и понятная инструкция.', 'Miroviriastudio is a pattern studio created by makers for makers. We believe beautiful clothes can be sewn at home with an accurate pattern and clear instructions.'),
('about_intro_2', 'Каждое лекало мы отшиваем сами, проверяем посадку на разных размерах и только потом выкладываем в каталог. Наши курсы помогают освоить шитьё с нуля.', 'We sew every pattern ourselves, test the fit across sizes, and only then add it to the catalog. Our courses help you learn sewing from scratch.'),
('about_stat1_num', '40+', '40+'),
('about_stat1_text', 'моделей в каталоге', 'models in catalog'),
('about_stat2_num', '12 000', '12 000'),
('about_stat2_text', 'довольных швей', 'happy makers'),
('about_stat3_num', '8', '8'),
('about_stat3_text', 'лет с вами', 'years with you'),
('about_stat4_num', '4.9', '4.9'),
('about_stat4_text', 'средний рейтинг', 'average rating'),
('reviews_subtitle', 'Что говорят те, кто уже шьёт по нашим лекалам.', 'What those who already sew with our patterns say.'),
('courses_subtitle', 'Видеоуроки по пошиву одежды на основе наших лекал — от первого стежка до готового изделия.', 'Video lessons on sewing clothes from our patterns — from the first stitch to a finished garment.'),
('blog_subtitle', 'О моде, мероприятиях, конкурсах и показах — всё самое интересное из мира одежды.', 'About fashion, events, contests and runway shows — the best from the world of clothing.'),
('payment_subtitle', 'Принимаем карты, выпущенные за пределами России. Это просто и безопасно.', 'We accept cards issued outside Russia. It is simple and secure.');
