import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Каталог', icon: 'ShoppingBag', end: true },
  { to: '/admin/reviews', label: 'Отзывы', icon: 'Star' },
  { to: '/admin/blog', label: 'Блог', icon: 'Newspaper' },
  { to: '/admin/texts', label: 'Тексты сайта', icon: 'FileText' },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="font-display text-xl">Админ-панель</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-foreground text-background' : 'hover:bg-beige-soft'
                }`
              }
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <Icon name="LogOut" size={16} className="mr-2" /> Выйти
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
