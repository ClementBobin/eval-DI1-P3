import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { NavActions } from '@/components/ui/nav-actions';
import './protected-route.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="protected-route-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <><NavActions/>{children}</>;
};