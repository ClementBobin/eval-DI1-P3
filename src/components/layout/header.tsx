import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import './header.css';

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
            <Link to="/contracts" className="nav-link">
              Contrats
            </Link>
            {isAuthenticated && (
              <Link to="/contracts/create" className="nav-link">
                Nouveau contrat
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
                variant="outline" 
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