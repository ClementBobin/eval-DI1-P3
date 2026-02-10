import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ContractsAPI } from '@/lib/api/contracts';
import type { Contract, ContractForm } from '@/types/contracts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import '../../contracts.css';

export const EditContract = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<Contract | null>(null);
  const [formData, setFormData] = useState<ContractForm>({
    title: '',
    description: '',
    reward: ''
  });

  // Charger le contrat à éditer
  useEffect(() => {
    if (id) {
      fetchContract();
    }
  }, [id]);

  const fetchContract = async () => {
    try {
      setLoading(true);
      const contractData = await ContractsAPI.getById(id!);
      setContract(contractData);
      
      // Pré-remplir le formulaire avec les données du contrat
      setFormData({
        title: contractData.title,
        description: contractData.description,
        reward: contractData.reward
      });
      
    } catch (error) {
      console.error('Error fetching contract:', error);
      toast.error('Erreur lors du chargement du contrat');
      navigate('/contracts');
    } finally {
      setLoading(false);
    }
  };

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
      
      // Appel API pour modifier le contrat
      await ContractsAPI.update(id!, formData);
      
      // Redirection vers la page de détail
      toast.success('Contrat modifié avec succès !');
      navigate(`/contracts/${id}`);
      
    } catch (error) {
      console.error('Error updating contract:', error);
      // Le toast d'erreur est déjà géré par l'API client
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/contracts/${id}`);
  };

  if (loading && !contract) {
    return (
      <div className="edit-contract-container">
        <div className="loading-container">
          <Spinner size="large" />
          <p>Chargement du contrat...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="edit-contract-container">
        <div className="error-container">
          <h2>Contrat non trouvé</h2>
          <p>Le contrat que vous essayez de modifier n'existe pas.</p>
          <Link to="/contracts">
            <Button variant="outline">
              Retour à la liste des contrats
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-contract-container">
      <div className="edit-contract-header">
        <Link to={`/contracts/${id}`} className="back-link">
          <span className="back-arrow">←</span>
          Retour au détail
        </Link>
        
        <div className="edit-header-main">
          <h1 className="edit-contract-title">Modifier le contrat</h1>
          <p className="edit-contract-subtitle">
            Modifiez les informations du contrat : {contract.title}
          </p>
        </div>
      </div>

      <div className="edit-contract-content">
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
            </div>

            {/* Informations non modifiables */}
            <div className="form-info-card">
              <h3 className="info-title">Informations non modifiables</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Statut :</span>
                  <span className={`info-value status-${contract.status.toLowerCase()}`}>
                    {contract.status === 'Available' ? 'Disponible' : 
                     contract.status === 'Assigned' ? 'Assigné' : 'Terminé'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">ID du contrat :</span>
                  <span className="info-value">#{contract.id}</span>
                </div>
                {contract.assignedTo && (
                  <div className="info-item">
                    <span className="info-label">Sorceleur assigné :</span>
                    <span className="info-value">Witcher #{contract.assignedTo}</span>
                  </div>
                )}
              </div>
              <p className="info-note">
                Note : Le statut et l'assignation du sorceleur ne peuvent pas être modifiés via ce formulaire.
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
                    <span>Modification en cours...</span>
                  </>
                ) : (
                  'Enregistrer les modifications'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};