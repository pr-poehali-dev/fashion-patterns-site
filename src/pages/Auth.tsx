import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const AUTH_URL = 'https://functions.poehali.dev/a22a76d8-e1fd-4623-81eb-b414fab3e003';

const Auth = () => {
  const { t, loginWithSession } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultTab = params.get('mode') === 'register' ? 'register' : 'login';
  const redirectTo = params.get('redirect') || '/';

  const [tab, setTab] = useState<'login' | 'register'>(defaultTab as 'login' | 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body = tab === 'register'
        ? { action: 'register', email, password, name }
        : { action: 'login', email, password };

      const res = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError(t('Пользователь с таким email уже существует', 'User with this email already exists'));
        } else if (res.status === 401) {
          setError(t('Неверный email или пароль', 'Invalid email or password'));
        } else {
          setError(data.error || t('Что-то пошло не так', 'Something went wrong'));
        }
        return;
      }

      loginWithSession(data.session_id, data.user);
      navigate(redirectTo);
    } catch {
      setError(t('Ошибка соединения. Попробуйте ещё раз.', 'Connection error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="container max-w-md py-20">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground mb-10 hover:opacity-70">
          <Icon name="ArrowLeft" size={16} /> {t('На главную', 'Back to home')}
        </Link>

        <div className="flex rounded-lg border border-border overflow-hidden mb-8">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'login' ? 'bg-foreground text-background' : 'hover:bg-beige-soft'}`}>
            {t('Войти', 'Sign in')}
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'register' ? 'bg-foreground text-background' : 'hover:bg-beige-soft'}`}>
            {t('Зарегистрироваться', 'Register')}
          </button>
        </div>

        <h1 className="font-display text-4xl mb-2">
          {tab === 'login' ? t('Вход в аккаунт', 'Sign in') : t('Создать аккаунт', 'Create account')}
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          {tab === 'login'
            ? t('Войдите, чтобы добавлять выкройки в корзину и оформлять заказы.', 'Sign in to add patterns to cart and place orders.')
            : t('Зарегистрируйтесь для доступа к покупкам и личному кабинету.', 'Register to access purchases and your account.')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('Имя', 'Name')}</label>
              <Input
                placeholder={t('Ваше имя', 'Your name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">{t('Пароль', 'Password')}</label>
            <Input
              type="password"
              placeholder={tab === 'register' ? t('Минимум 6 символов', 'At least 6 characters') : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading
              ? <><Icon name="Loader2" size={16} className="mr-2 animate-spin" />{t('Загрузка...', 'Loading...')}</>
              : tab === 'login' ? t('Войти', 'Sign in') : t('Создать аккаунт', 'Create account')}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {tab === 'login' ? (
            <>{t('Нет аккаунта?', 'No account?')}{' '}
              <button onClick={() => setTab('register')} className="underline">{t('Зарегистрироваться', 'Register')}</button>
            </>
          ) : (
            <>{t('Уже есть аккаунт?', 'Already have an account?')}{' '}
              <button onClick={() => setTab('login')} className="underline">{t('Войти', 'Sign in')}</button>
            </>
          )}
        </p>
      </section>
    </Layout>
  );
};

export default Auth;