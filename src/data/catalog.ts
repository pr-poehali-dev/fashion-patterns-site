export interface Pattern {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  price: number;
  difficulty: string;
  difficultyEn: string;
  image?: string;
}

export const categories = [
  { ru: 'Платья', en: 'Dresses' },
  { ru: 'Футболки', en: 'T-shirts' },
  { ru: 'Брюки', en: 'Trousers' },
  { ru: 'Юбки', en: 'Skirts' },
  { ru: 'Блузки', en: 'Blouses' },
  { ru: 'Пальто', en: 'Coats' },
  { ru: 'Жакеты', en: 'Jackets' },
  { ru: 'Аксессуары', en: 'Accessories' },
];

export const patterns: Pattern[] = [
  { id: 1, name: 'Платье «Мадлен»', nameEn: 'Madeleine Dress', category: 'Платья', categoryEn: 'Dresses', price: 690, difficulty: 'Средне', difficultyEn: 'Medium', image: 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/d84e5379-1364-46af-91ee-50f310e79626.png' },
  { id: 2, name: 'Платье-комбинация', nameEn: 'Slip Dress', category: 'Платья', categoryEn: 'Dresses', price: 590, difficulty: 'Легко', difficultyEn: 'Easy', image: 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/79443bcd-ecbd-4c56-aacd-9555770e9bf9.png' },
  { id: 3, name: 'Платье-рубашка', nameEn: 'Shirt Dress', category: 'Платья', categoryEn: 'Dresses', price: 740, difficulty: 'Сложно', difficultyEn: 'Hard', image: 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/beca03ca-606a-4f05-873e-1f6509ae0097.png' },
  { id: 4, name: 'Летнее платье «Луара»', nameEn: 'Loire Summer Dress', category: 'Платья', categoryEn: 'Dresses', price: 650, difficulty: 'Средне', difficultyEn: 'Medium', image: 'https://cdn.poehali.dev/projects/e17c8537-264f-4315-8738-65354769b9de/bucket/39b84d6c-99b3-4d52-8fc0-d59f6b50a257.png' },
  { id: 5, name: 'Базовая футболка', nameEn: 'Basic Tee', category: 'Футболки', categoryEn: 'T-shirts', price: 390, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 6, name: 'Футболка оверсайз', nameEn: 'Oversize Tee', category: 'Футболки', categoryEn: 'T-shirts', price: 420, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 7, name: 'Футболка с рукавом ¾', nameEn: 'Tee 3/4 Sleeve', category: 'Футболки', categoryEn: 'T-shirts', price: 450, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 8, name: 'Топ-кроп', nameEn: 'Crop Top', category: 'Футболки', categoryEn: 'T-shirts', price: 380, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 9, name: 'Брюки палаццо', nameEn: 'Palazzo Trousers', category: 'Брюки', categoryEn: 'Trousers', price: 690, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 10, name: 'Брюки-сигареты', nameEn: 'Cigarette Trousers', category: 'Брюки', categoryEn: 'Trousers', price: 720, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 11, name: 'Широкие джинсы', nameEn: 'Wide Jeans', category: 'Брюки', categoryEn: 'Trousers', price: 790, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 12, name: 'Льняные брюки', nameEn: 'Linen Trousers', category: 'Брюки', categoryEn: 'Trousers', price: 640, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 13, name: 'Юбка-миди плиссе', nameEn: 'Pleated Midi Skirt', category: 'Юбки', categoryEn: 'Skirts', price: 540, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 14, name: 'Юбка-карандаш', nameEn: 'Pencil Skirt', category: 'Юбки', categoryEn: 'Skirts', price: 490, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 15, name: 'Юбка А-силуэт', nameEn: 'A-line Skirt', category: 'Юбки', categoryEn: 'Skirts', price: 460, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 16, name: 'Юбка на запах', nameEn: 'Wrap Skirt', category: 'Юбки', categoryEn: 'Skirts', price: 470, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 17, name: 'Блузка с бантом', nameEn: 'Bow Blouse', category: 'Блузки', categoryEn: 'Blouses', price: 560, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 18, name: 'Блузка-рубашка', nameEn: 'Shirt Blouse', category: 'Блузки', categoryEn: 'Blouses', price: 590, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 19, name: 'Блузка с воланами', nameEn: 'Ruffle Blouse', category: 'Блузки', categoryEn: 'Blouses', price: 610, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 20, name: 'Блузка-топ', nameEn: 'Top Blouse', category: 'Блузки', categoryEn: 'Blouses', price: 510, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 21, name: 'Пальто-кокон', nameEn: 'Cocoon Coat', category: 'Пальто', categoryEn: 'Coats', price: 1190, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 22, name: 'Пальто-халат', nameEn: 'Robe Coat', category: 'Пальто', categoryEn: 'Coats', price: 1090, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 23, name: 'Тренч классический', nameEn: 'Classic Trench', category: 'Пальто', categoryEn: 'Coats', price: 1290, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 24, name: 'Пальто оверсайз', nameEn: 'Oversize Coat', category: 'Пальто', categoryEn: 'Coats', price: 1150, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 25, name: 'Жакет приталенный', nameEn: 'Fitted Jacket', category: 'Жакеты', categoryEn: 'Jackets', price: 890, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 26, name: 'Жакет-кимоно', nameEn: 'Kimono Jacket', category: 'Жакеты', categoryEn: 'Jackets', price: 760, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 27, name: 'Блейзер оверсайз', nameEn: 'Oversize Blazer', category: 'Жакеты', categoryEn: 'Jackets', price: 940, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 28, name: 'Жакет без застёжки', nameEn: 'Open Jacket', category: 'Жакеты', categoryEn: 'Jackets', price: 720, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 29, name: 'Шопер из ткани', nameEn: 'Fabric Tote', category: 'Аксессуары', categoryEn: 'Accessories', price: 290, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 30, name: 'Бандана', nameEn: 'Bandana', category: 'Аксессуары', categoryEn: 'Accessories', price: 190, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 31, name: 'Косметичка', nameEn: 'Cosmetic Bag', category: 'Аксессуары', categoryEn: 'Accessories', price: 250, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 32, name: 'Панама', nameEn: 'Bucket Hat', category: 'Аксессуары', categoryEn: 'Accessories', price: 320, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 33, name: 'Платье макси', nameEn: 'Maxi Dress', category: 'Платья', categoryEn: 'Dresses', price: 790, difficulty: 'Сложно', difficultyEn: 'Hard' },
  { id: 34, name: 'Сарафан', nameEn: 'Sundress', category: 'Платья', categoryEn: 'Dresses', price: 620, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 35, name: 'Футболка с принтом', nameEn: 'Printed Tee', category: 'Футболки', categoryEn: 'T-shirts', price: 430, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 36, name: 'Лонгслив', nameEn: 'Longsleeve', category: 'Футболки', categoryEn: 'T-shirts', price: 470, difficulty: 'Легко', difficultyEn: 'Easy' },
  { id: 37, name: 'Юбка-солнце', nameEn: 'Circle Skirt', category: 'Юбки', categoryEn: 'Skirts', price: 520, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 38, name: 'Брюки клёш', nameEn: 'Flared Trousers', category: 'Брюки', categoryEn: 'Trousers', price: 680, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 39, name: 'Блузка с открытыми плечами', nameEn: 'Off-shoulder Blouse', category: 'Блузки', categoryEn: 'Blouses', price: 580, difficulty: 'Средне', difficultyEn: 'Medium' },
  { id: 40, name: 'Жилет', nameEn: 'Vest', category: 'Жакеты', categoryEn: 'Jackets', price: 540, difficulty: 'Средне', difficultyEn: 'Medium' },
];