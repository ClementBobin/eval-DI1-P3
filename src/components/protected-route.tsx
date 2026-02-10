import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Header } from './layout/header';
import './protected-route.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
 *
 * This component is used to wrap any route that requires authentication. It checks if the user is authenticated and either renders the child components or redirects to a specified login page.
 * @param {React.ReactNode} children - The components to render if the user is authenticated
 * @param {string} [redirectTo='/login'] - The path to redirect to if the user is not authenticated (default is '/login')
 * @returns {JSX.Element} - The rendered component or a redirect
 * @example
 * <Route path="/contracts" element={
 *   <ProtectedRoute>
 *     <ContractsPage />
 *   </ProtectedRoute>
 * } />
 */
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

  return <><Header />{children}</>;
};