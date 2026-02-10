import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { WitchersAPI } from '@/lib/api/witchers';
import type { Witcher } from '@/types/witchers';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import './login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [witchers, setWitchers] = useState<Witcher[]>([]);
  const [selectedWitcherId, setSelectedWitcherId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Charger la liste des sorceleurs
  useEffect(() => {
    const loadWitchers = async () => {
      try {
        setLoading(true);
        const data = await WitchersAPI.getAll();
        setWitchers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des sorceleurs:', error);
        toast.error('Impossible de charger la liste des sorceleurs');
      } finally {
        setLoading(false);
      }
    };

    loadWitchers();
  }, []);

  const handleLogin = async () => {
    if (!selectedWitcherId) {
      toast.error('Veuillez sélectionner un sorceleur');
      return;
    }

    try {
      setLoading(true);
      await login(parseInt(selectedWitcherId));
      toast.success('Connexion réussie !');
      navigate('/contracts');
    } catch (error) {
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  // Si déjà connecté, rediriger vers la liste des contrats
  if (isAuthenticated) {
    return (
      <div className="witcher-login-container">
        <div className="already-logged-in">
          <h2>Vous êtes déjà connecté</h2>
          <p>Retournez à la liste des contrats pour commencer à chasser.</p>
          <Button onClick={() => navigate('/contracts')}>
            Voir les contrats
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="witcher-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Connexion Sorceleur</h1>
          <p className="login-subtitle">
            Sélectionnez votre identité pour accéder aux contrats
          </p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <Label htmlFor="witcher-select" className="form-label required">
              Choisissez votre sorceleur
            </Label>
            <Select
              id="witcher-select"
              value={selectedWitcherId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedWitcherId(e.target.value)}
              disabled={loading || witchers.length === 0}
              className="select-base"
            >
              <SelectItem value="">Sélectionnez un sorceleur</SelectItem>
              {witchers.map((witcher) => (
                <SelectItem key={witcher.id} value={witcher.id.toString()}>
                  {witcher.name} {witcher.school ? `- ${witcher.school}` : ''}
                </SelectItem>
              ))}
            </Select>
            {witchers.length === 0 && !loading && (
              <p className="form-hint error">Aucun sorceleur disponible</p>
            )}
            {witchers.length > 0 && (
              <p className="form-hint">
                Sélectionnez un sorceleur pour vous connecter (aucun mot de passe requis)
              </p>
            )}
          </div>

          {loading && witchers.length === 0 && (
            <div className="loading-state">
              <Spinner size="small" />
              <span>Chargement des sorceleurs...</span>
            </div>
          )}

          <div className="login-info-card">
            <h3 className="info-title">Comment ça marche ?</h3>
            <ul className="info-list">
              <li>Connectez-vous en tant que sorceleur</li>
              <li>Consultez les contrats disponibles</li>
              <li>Assignez-vous à un contrat</li>
              <li>Marquez les contrats comme terminés</li>
            </ul>
          </div>

          <div className="login-actions">
            <Button
              onClick={() => navigate('/contracts')}
              variant="outline"
              className="back-button"
            >
              Retour aux contrats
            </Button>
            
            <Button
              onClick={handleLogin}
              disabled={loading || !selectedWitcherId || witchers.length === 0}
              className="login-button"
            >
              {loading ? (
                <>
                  <Spinner size="small" />
                  <span>Connexion...</span>
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};