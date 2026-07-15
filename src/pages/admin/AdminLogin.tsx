import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useAdmin } from '@/context/AdminContext';

const AdminLogin = () => {
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await loginAdmin(password);
      if (ok) {
        navigate('/admin');
      } else {
        setError('Неверный пароль');
      }
    } catch {
      setError('Ошибка соединения. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-soft px-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-lg p-8">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="ShieldCheck" size={24} />
          <h1 className="font-display text-2xl">Админ-панель</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Пароль</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
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
              ? <><Icon name="Loader2" size={16} className="mr-2 animate-spin" />Вход...</>
              : 'Войти'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
