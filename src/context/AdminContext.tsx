import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ADMIN_AUTH_URL = 'https://functions.poehali.dev/d67fbe29-54d4-4dfe-83eb-f8b9361877bf';
const ADMIN_SESSION_KEY = 'mvs_admin_session';

interface AdminContextType {
  adminSession: string | null;
  adminLoading: boolean;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [adminSession, setAdminSession] = useState<string | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const sid = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!sid) { setAdminLoading(false); return; }
    fetch(`${ADMIN_AUTH_URL}?action=check`, { headers: { 'X-Admin-Session': sid } })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setAdminSession(sid);
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      })
      .catch(() => {})
      .finally(() => setAdminLoading(false));
  }, []);

  const loginAdmin = async (password: string) => {
    const res = await fetch(ADMIN_AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', password }),
    });
    const data = await res.json();
    if (!res.ok) return false;
    setAdminSession(data.session_id);
    localStorage.setItem(ADMIN_SESSION_KEY, data.session_id);
    return true;
  };

  const logoutAdmin = async () => {
    if (adminSession) {
      await fetch(ADMIN_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Session': adminSession },
        body: JSON.stringify({ action: 'logout' }),
      }).catch(() => {});
    }
    setAdminSession(null);
    localStorage.removeItem(ADMIN_SESSION_KEY);
  };

  return (
    <AdminContext.Provider value={{ adminSession, adminLoading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
