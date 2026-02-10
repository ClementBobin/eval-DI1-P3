import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import './header.css';
import '@/styles/contracts-global.css'

/**
 * Header Component
 *
 * This component renders the application header, which includes the logo, navigation links, and user authentication actions. It dynamically adjusts the displayed options based on the user's authentication status and the current page.
 * - If the user is authenticated, it shows their name and school, along with a logout button.
 * - If the user is not authenticated and is not on the login page, it shows a login button.
 * - If the user is on the login page, it provides a link back to the contracts page.
 */
export const Header = () => {
  const location = useLocation();
  const { witcher, isAuthenticated, logout } = useAuth();

  const isLoginPage = location.pathname === '/witchers/login';

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/contracts" className="logo">
            🐺 Contrats de Sorceleur
          </Link>
          <nav className="nav-links">
            <Link to="/contracts">
              <Button variant="ghost" size="sm">
                Contrats
              </Button>
            </Link>
            {isAuthenticated && (
              <Link to="/contracts/create">
                <Button variant="outline" size="sm">
                  <PlusCircleIcon /> contract
                </Button>
              </Link>
            )}
          </nav>
        </div>
        
        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-section">
              <div className="user-info">
                <span className="user-name">{witcher?.name}</span>
                {witcher?.school && (
                  <span className="user-school"> - {witcher.school}</span>
                )}
              </div>
              <Button
                onClick={logout}
                variant="destructive"
                size="sm"
                className="logout-button"
              >
                Déconnexion
              </Button>
            </div>
          ) : !isLoginPage ? (
            <Link to="/witchers/login">
              <Button variant="default" size="sm">
                Connexion Sorceleur
              </Button>
            </Link>
          ) : (
            <Link to="/contracts">
              <Button variant="outline" size="sm">
                Retour aux contrats
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};