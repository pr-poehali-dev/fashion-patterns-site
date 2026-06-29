import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ru' | 'en';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface User {
  email: string;
}

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (ru: string, en: string) => string;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ru');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const toggleLang = () => setLang((p) => (p === 'ru' ? 'en' : 'ru'));
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en);

  const addToCart = (item: CartItem) =>
    setCart((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const login = (email: string) => setUser({ email });
  const logout = () => setUser(null);

  return (
    <AppContext.Provider
      value={{ lang, toggleLang, t, cart, addToCart, removeFromCart, clearCart, user, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
