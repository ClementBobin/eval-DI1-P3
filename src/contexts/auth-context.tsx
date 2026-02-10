import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Witcher } from '@/types/witchers';
import { WitchersAPI } from '@/lib/api/witchers';

interface AuthContextType {
  witcher: Witcher | null;
  isAuthenticated: boolean;
  login: (witcherId: number) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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