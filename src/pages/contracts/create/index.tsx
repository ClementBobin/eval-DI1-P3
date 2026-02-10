import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ContractsAPI } from '@/lib/api/contracts';
import type { ContractForm } from '@/types/contracts';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { ContractFormFields } from '@/components/contracts/ContractFormFields';
import './create.css';

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
    setFormData((prev: ContractForm) => ({
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
            <ContractFormFields
              formData={formData}
              onChange={handleChange}
              disabled={loading}
            />

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