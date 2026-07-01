import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'ru' | 'en';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

const AUTH_URL = 'https://functions.poehali.dev/a22a76d8-e1fd-4623-81eb-b414fab3e003';
const SESSION_KEY = 'mvs_session';

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (ru: string, en: string) => string;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  user: User | null;
  sessionId: string | null;
  loginWithSession: (sessionId: string, user: User) => void;
  logout: () => void;
  authLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ru');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const sid = localStorage.getItem(SESSION_KEY);
    if (!sid) { setAuthLoading(false); return; }
    fetch(`${AUTH_URL}/me`, { headers: { 'X-Session-Id': sid } })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setSessionId(sid);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      })
      .catch(() => {})
      .finally(() => setAuthLoading(false));
  }, []);

  const toggleLang = () => setLang((p) => (p === 'ru' ? 'en' : 'ru'));
  const t = (ru: string, en: string) => (lang === 'ru' ? ru : en);

  const addToCart = (item: CartItem) =>
    setCart((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const loginWithSession = (sid: string, u: User) => {
    setSessionId(sid);
    setUser(u);
    localStorage.setItem(SESSION_KEY, sid);
  };

  const logout = async () => {
    if (sessionId) {
      await fetch(`${AUTH_URL}/logout`, {
        method: 'POST',
        headers: { 'X-Session-Id': sessionId },
      }).catch(() => {});
    }
    setUser(null);
    setSessionId(null);
    localStorage.removeItem(SESSION_KEY);
    clearCart();
  };

  return (
    <AppContext.Provider
      value={{ lang, toggleLang, t, cart, addToCart, removeFromCart, clearCart, user, sessionId, loginWithSession, logout, authLoading }}
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
