import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { patterns } from '@/data/catalog';

const Header = () => {
  const { lang, toggleLang, t, cart, removeFromCart, user, logout, authLoading } = useApp();
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const results = search.trim()
    ? patterns.filter((p) =>
        (lang === 'ru' ? p.name : p.nameEn).toLowerCase().includes(search.toLowerCase()) ||
        (lang === 'ru' ? p.category : p.categoryEn).toLowerCase().includes(search.toLowerCase()))
    : [];

  const nav = [
    { ru: 'Выкройки', en: 'Patterns', path: '/#catalog' },
    { ru: 'Курсы', en: 'Courses', path: '/courses' },
    { ru: 'Блог', en: 'Blog', path: '/blog' },
    { ru: 'Отзывы', en: 'Reviews', path: '/reviews' },
    { ru: 'О нас', en: 'About', path: '/about' },
  ];

  const socials = [
    { name: 'ВКонтакте', icon: 'Share2', url: '#' },
    { name: 'Телеграм', icon: 'Send', url: '#' },
    { name: 'MAX', icon: 'MessageCircle', url: '#' },
  ];

  const handleCartOpen = () => {
    if (!user) {
      navigate('/auth?redirect=/');
      return;
    }
    setCartOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="bg-sky text-white text-center py-2 text-sm">
        <Link to="/payment" className="story-link hover:opacity-80 transition-opacity">
          {t('Как оплатить иностранной картой', 'How to pay with a foreign card')}
        </Link>
      </div>

      <div className="container flex items-center py-4 gap-4">
        {/* Левая часть: логотип + соцсети */}
        <div className="flex items-center gap-5 shrink-0">
          <Link to="/" className="flex items-baseline">
            <span className="font-semibold tracking-tight mx-0 text-2xl">Miroviria</span>
            <span className="font-medium tracking-tight text-base">  studio</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {socials.map((s) => (
              <a key={s.name} href={s.url} aria-label={s.name}
                 className="flex flex-col items-center gap-1 group">
                <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:bg-beige-soft transition-colors">
                  <Icon name={s.icon} size={13} />
                </span>
                <span className="text-[10px] text-muted-foreground leading-none">{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Центральная навигация */}
        <nav className="hidden md:flex items-center gap-8 text-sm flex-1 justify-center">
          {nav.map((item) => (
            <Link key={item.en} to={item.path} className="story-link hover:opacity-60 transition-opacity">
              {t(item.ru, item.en)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          {/* Поиск */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon"><Icon name="Search" size={20} /></Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{t('Поиск выкроек', 'Search patterns')}</DialogTitle>
              </DialogHeader>
              <Input
                autoFocus
                placeholder={t('Например: футболка, платье...', 'e.g. t-shirt, dress...')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="max-h-72 overflow-y-auto divide-y divide-border">
                {results.map((p) => (
                  <div key={p.id} className="flex justify-between py-3 text-sm">
                    <span>{t(p.name, p.nameEn)}</span>
                    <span className="text-muted-foreground">{p.price} ₽</span>
                  </div>
                ))}
                {search.trim() && results.length === 0 && (
                  <p className="py-4 text-sm text-muted-foreground">{t('Ничего не найдено', 'Nothing found')}</p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Язык */}
          <Button variant="ghost" size="sm" onClick={toggleLang} className="font-medium">
            {lang === 'ru' ? 'EN' : 'RU'}
          </Button>

          {/* Личный кабинет */}
          {authLoading ? (
            <Button variant="ghost" size="icon" disabled>
              <Icon name="Loader2" size={18} className="animate-spin" />
            </Button>
          ) : user ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-semibold">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">{t('Личный кабинет', 'Account')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-beige-soft rounded-lg">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={logout}>
                    <Icon name="LogOut" size={16} className="mr-2" />
                    {t('Выйти', 'Sign out')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => navigate('/auth')}>
              <Icon name="User" size={20} />
            </Button>
          )}

          {/* Корзина */}
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" onClick={handleCartOpen}>
                <Icon name="ShoppingBag" size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">{t('Корзина', 'Cart')}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t('Корзина пуста', 'Cart is empty')}</p>
                )}
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{item.price} ₽</span>
                      <button onClick={() => removeFromCart(item.id)}>
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {cart.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between font-medium mb-4">
                      <span>{t('Итого', 'Total')}</span>
                      <span>{cart.reduce((s, i) => s + i.price, 0)} ₽</span>
                    </div>
                    <Button className="w-full">{t('Оформить заказ', 'Checkout')}</Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Мобильное меню */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="mt-10 flex flex-col gap-5 text-lg">
                {nav.map((item) => (
                  <button key={item.en} className="text-left" onClick={() => navigate(item.path)}>
                    {t(item.ru, item.en)}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;