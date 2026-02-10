import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Witcher } from '@/types/witchers';
import { WitchersAPI } from '@/lib/api/witchers';

/**
 * Authentication context for managing witcher login state
 * Provides methods for logging in and out, and stores the current witcher information
 * Uses localStorage to persist login state across page refreshes
 * @example
 * // To use the authentication context in a component:
 * const { witcher, isAuthenticated, login, logout } = useAuth();
 */
interface AuthContextType {
  witcher: Witcher | null;
  isAuthenticated: boolean;
  login: (witcherId: number) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Create the authentication context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component that wraps the application and provides authentication state and methods
 * Manages the current witcher information and login/logout functionality
 * Loads the saved witcher from localStorage on mount to maintain login state across page refreshes
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [witcher, setWitcher] = useState<Witcher | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger le sorceleur connecté depuis localStorage au démarrage
  useEffect(() => {
    const loadSavedWitcher = async () => {
      try {
        const savedWitcherId = localStorage.getItem('current_witcher_id');
        if (savedWitcherId) {
          const witcherData = await WitchersAPI.getById(savedWitcherId);
          setWitcher(witcherData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du sorceleur:', error);
        localStorage.removeItem('current_witcher_id');
      } finally {
        setLoading(false);
      }
    };

    loadSavedWitcher();
  }, []);

  /**
   * Log in a witcher by their ID
   * Fetches the witcher data from the API and updates the context state
   * Saves the witcher ID in localStorage to persist login state across page refreshes
   * @throws An error if the login fails (e.g., invalid witcher ID, network issues)
   * @param witcherId
   */
  const login = async (witcherId: number) => {
    try {
      setLoading(true);
      const witcherData = await WitchersAPI.getById(witcherId);
      setWitcher(witcherData);
      localStorage.setItem('current_witcher_id', witcherId.toString());
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out the current witcher
   * Clears the witcher data from the context state and removes the saved witcher ID from localStorage
   */
  const logout = () => {
    setWitcher(null);
    localStorage.removeItem('current_witcher_id');
  };

  return (
    <AuthContext.Provider value={{
      witcher,
      isAuthenticated: !!witcher,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};