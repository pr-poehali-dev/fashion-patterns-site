import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import Icon from '@/components/ui/icon';

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { adminSession, adminLoading } = useAdmin();

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icon name="Loader2" size={24} className="animate-spin" />
      </div>
    );
  }

  if (!adminSession) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
