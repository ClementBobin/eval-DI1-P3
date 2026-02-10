import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ContractsAPI } from '@/lib/api/contracts';
import type { ContractForm } from '@/types/contracts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import '../contracts.css';

export const CreateContract = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContractForm>({
    title: '',
    description: '',
    reward: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.title.trim()) {
      toast.error('Le titre est requis');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('La description est requise');
      return;
    }
    
    if (!formData.reward.trim()) {
      toast.error('La récompense est requise');
      return;
    }

    try {
      setLoading(true);
      
      // Appel API pour créer le contrat
      await ContractsAPI.create(formData);
      
      // Redirection vers la liste des contrats
      toast.success('Contrat créé avec succès !');
      navigate('/contracts');
      
    } catch (error) {
      console.error('Error creating contract:', error);
      // Le toast d'erreur est déjà géré par l'API client
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/contracts');
  };

  return (
    <div className="create-contract-container">
      <div className="create-contract-header">
        <Link to="/contracts" className="back-link">
          <span className="back-arrow">←</span>
          Retour à la liste
        </Link>
        
        <div className="create-header-main">
          <h1 className="create-contract-title">Créer un nouveau contrat</h1>
          <p className="create-contract-subtitle">
            Remplissez le formulaire ci-dessous pour créer un nouveau contrat de chasse
          </p>
        </div>
      </div>

      <div className="create-contract-content">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="contract-form">
            {/* Champ Titre */}
            <div className="form-group">
              <Label htmlFor="title" className="form-label required">
                Titre du contrat
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Ex: Éliminer les Nekkers près du vieux moulin"
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
                required
                className="form-input"
              />
              <p className="form-hint">
                Donnez un titre clair et descriptif au contrat
              </p>
            </div>

            {/* Champ Description */}
            <div className="form-group">
              <Label htmlFor="description" className="form-label required">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Décrivez en détail la mission, les dangers potentiels, la localisation..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                required
                rows={6}
                className="form-textarea"
              />
              <p className="form-hint">
                Soyez précis sur les détails de la mission. Utilisez des retours à la ligne pour structurer votre texte.
              </p>
            </div>

            {/* Champ Récompense */}
            <div className="form-group">
              <Label htmlFor="reward" className="form-label required">
                Récompense
              </Label>
              <Input
                id="reward"
                name="reward"
                type="text"
                placeholder="Ex: 300 Crowns et une amélioration d'épée en argent"
                value={formData.reward}
                onChange={handleChange}
                disabled={loading}
                required
                className="form-input"
              />
              <p className="form-hint">
                Indiquez clairement la récompense pour le sorceleur
              </p>
            </div>

            {/* Informations additionnelles */}
            <div className="form-info-card">
              <h3 className="info-title">Informations supplémentaires</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Statut initial :</span>
                  <span className="info-value highlight">Disponible</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Assignation :</span>
                  <span className="info-value">Aucun sorceleur assigné</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Identifiant :</span>
                  <span className="info-value">Généré automatiquement</span>
                </div>
              </div>
              <p className="info-note">
                Note : Le contrat sera créé avec le statut "Disponible". Un sorceleur pourra ensuite le prendre en charge.
              </p>
            </div>

            {/* Actions du formulaire */}
            <div className="form-actions">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
                className="action-button cancel-button"
              >
                Annuler
              </Button>
              
              <Button
                type="submit"
                disabled={loading}
                className="action-button submit-button"
              >
                {loading ? (
                  <>
                    <Spinner size="small" />
                    <span>Création en cours...</span>
                  </>
                ) : (
                  'Créer le contrat'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};